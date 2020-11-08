import glob from "glob";

export const findIndex = (cwd: string = process.cwd()): Promise<string[]> =>
  new Promise((resolve, reject) =>
    glob('**/.index', {cwd}, (err, matches) => err ? reject(err) : resolve(matches)))
