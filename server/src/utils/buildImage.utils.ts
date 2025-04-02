import { Languages } from "@prisma/client";
import Dockerode from "dockerode";
import path from "path";

const dockerode: Dockerode = new Dockerode();

interface languageConfig {
  imageName: string;
}

// const LANGUAGE_CONFIG: Record<Languages, languageConfig> = {
//   python: {
//     imageName: "python",
//   },
//   cpp: {
//     imageName: "code-runner-cpp",
//   },
//   javaScript: {
//     imageName: "code-runner-javaScript",
//   },
//   java: {
//     imageName: "code-runner-java",
//   },
//   c: {
//     imageName: "code-runner-c",
//   },
//   sql: {
//     imageName: "code-runner-sql",
//   },
// };

const LANGUAGE_CONFIG = {
  python: {
    imageName: "python:3.9-slim", // Explicit version
  },
  cpp: {
    imageName: "gcc:latest", // Official GCC image
  },
  javaScript: {
    imageName: "node:18-alpine", // Official Node.js
  },
  java: {
    imageName: "openjdk:17-jdk", // Official OpenJDK
  },
  c: {
    imageName: "gcc:latest", // Same as C++
  },
  sql: {
    imageName: "mysql:8.0", // Or postgres:alpine
  },
};

//build image if missing
export async function buildDockerImage(language: Languages) {
  const dockerFilePath = path.join(`./containers/${language}/Dockerfile`); //gettig dockerfile path

  const imageName = LANGUAGE_CONFIG[language].imageName;

  const stream = await dockerode.buildImage(
    {
      context: path.dirname(dockerFilePath),
      src: ["Dockerfile"],
    },
    {
      t: imageName,
    }
  );

  await new Promise((resolve, reject) => {
    dockerode.modem.followProgress(stream, (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
}
