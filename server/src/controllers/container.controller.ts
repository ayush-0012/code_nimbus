import { Request, Response } from "express";
import Docker from "dockerode";
import { Languages } from "@prisma/client";
import { buildDockerImage } from "../utils/buildImage.utils";

const docker: Docker = new Docker();

const MAX_CONTAINERS: string[] = [];
const MAX_POOL_SIZE: number = 2;

export async function createContainer(
  req: Request<{}, {}, { language: Languages; userId: string }>,
  res: Response
): Promise<any> {
  const { userId } = req.body;

  const dockerImage: string = "multilang-code-runner:latest";

  if (MAX_CONTAINERS.length >= MAX_POOL_SIZE) {
    return res.status(429).json({
      clientMsg: "Server is busy please try again later ",
      message: "All contaienrs are busy",
    });
  }

  try {
    await docker.getImage(dockerImage).inspect();
    console.log(`docker image exists: ${dockerImage}`); //checks if image is available
  } catch (error) {
    console.log(`building image: ${dockerImage}`);
    await buildDockerImage(dockerImage); //if not available, then build image
  }

  try {
    const container = await docker.createContainer({
      Image: dockerImage,
      Cmd: ["tail", "-f", "/dev/null"],
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      HostConfig: {
        AutoRemove: false, // cleanup after exit
        Memory: 512 * 1024 * 1024, // limiting RAM
      },
    });

    if (container) {
      MAX_CONTAINERS.push(container.id);
    }

    console.log(MAX_CONTAINERS.length);

    await container.start();

    //container logs
    const logs = await container.logs({
      stdout: true,
      stderr: true,
      follow: false,
    });
    console.log("Container Logs:", logs.toString());

    //checking container status
    const containerInfo = await container.inspect();
    console.log("Container Status:", containerInfo.State.Status);

    return res.status(201).json({
      containerId: container.id,
      message: "container created successfully",
      container: containerInfo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error occurred creating container", error });
  }
}

//controller to execute code
export async function executeCode(
  req: Request<
    {},
    {},
    { containerId: string; language: string; code: string; userId: string }
  >,
  res: Response
): Promise<any> {
  const { containerId, language, code, userId } = req.body;

  try {
    const container = docker.getContainer(containerId);

    let command: string;

    switch (language) {
      case "python":
        command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
        break;
      case "javascript":
        command = `node -e "${code.replace(/"/g, '\\"')}"`;
        break;
      case "java":
        command = `echo "${code.replace(/"/g, '\\"')}" > Main.java && javac Main.java && java Main`;
        break;
      case "c":
        command = `echo "${code.replace(/"/g, '\\"')}" > main.c && gcc main.c -o main && ./main`;
        break;
      case "cpp":
        command = `echo "${code.replace(/"/g, '\\"')}" > main.cpp && g++ main.cpp -o main && ./main`;
        break;
      case "sql":
        command = `sqlite3 :memory: "${code.replace(/"/g, '\\"')}"`;
        break;
      default:
        return res.status(400).json({ error: "Unsupported language" });
    }

    const exec = await container.exec({
      Cmd: ["/bin/sh", "-c", command],
      AttachStdout: true,
      AttachStderr: true,
    });

    const stream = await exec.start({ hijack: true, stdin: false });

    let output = "";

    stream.on("data", (chunk: Buffer) => {
      output += chunk.toString("utf8");
    });

    stream.on("end", () => {
      const cleanedOutput = output.replace(/[\x00-\x1F\x7F-\x9F]+/g, "").trim();
      res.json({ output: cleanedOutput });
    });
  } catch (error) {
    console.error("Execution error:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
}
