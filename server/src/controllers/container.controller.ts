import { Request, Response } from "express";
import Docker from "dockerode";

const docker: Docker = new Docker();

export async function runPythonContainer(
  req: Request,
  res: Response
): Promise<any> {
  const container = await docker.createContainer({
    Image: "python-code-runner",
    HostConfig: {
      AutoRemove: true,
      Memory: 256 * 1024 * 1024, // 256MB memory limit
      CpuPeriod: 100000,
      CpuQuota: 20000, //cpu limit %
    },
  });
}
