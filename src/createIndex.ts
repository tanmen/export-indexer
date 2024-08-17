import {writeFile} from "fs/promises";
import {join, basename, extname} from "path";

export const createIndex = (dir: string, paths: string[], {ext}: Option) => {
  const path = paths.find(file => file.startsWith('index.')) ?? `index.${ext}`;
  if (!path) return Promise.resolve();
  const exportFiles = paths.filter(file => !file.startsWith('index.'));
  return writeFile(join(dir, path), exportFiles.map(file => `export * from './${basename(file, extname(file))}';\n`).join(''),
    {encoding: 'utf-8'})
}

