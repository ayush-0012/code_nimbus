import { Request, Response } from "express";
import Docker from "dockerode";
import { Languages } from "@prisma/client";
import { buildDockerImage } from "../utils/buildImage.utils";

const docker: Docker = new Docker();

const LANGUAGE_CONFIG = {
  python: {
    imageName: "python:3.9-slim",
  },
  cpp: {
    imageName: "gcc:latest",
  },
  javaScript: {
    imageName: "node:18-alpine",
  },
  java: {
    imageName: "openjdk:17-jdk",
  },
  c: {
    imageName: "gcc:latest",
  },
  sql: {
    imageName: "mysql:8.0",
  },
};

export async function runPythonContainer(
  req: Request<{}, {}, { language: Languages; userId: string }>,
  res: Response
): Promise<any> {
  const { language, userId } = req.body;

  const dockerImage = LANGUAGE_CONFIG[language].imageName;

  try {
    await docker.getImage(dockerImage).inspect();
    console.log(`docker image exists: ${dockerImage}`); //checks if image is available
  } catch (error) {
    console.log(`building image: ${dockerImage}`);
    await buildDockerImage(language); //if not available, then build image
  }

  try {
    const container = await docker.createContainer({
      Image: LANGUAGE_CONFIG[language].imageName,
      Cmd: [
        "sh",
        "-c",
        "echo 'Container started successfully' && sleep infinity",
      ],
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      HostConfig: {
        AutoRemove: false, // cleanup after exit
        Memory: 512 * 1024 * 1024, // limiting RAM
      },
    });

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
