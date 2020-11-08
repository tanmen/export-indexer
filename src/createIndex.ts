import {writeFile} from "fs/promises";
import {join, basename, extname} from "path";

export const createIndex = (dir: string, paths: string[]) => {
  const path = paths.find(file => file.startsWith('index.'));
  if (!path) throw new Error('Not found index file. Please create index file.');
  const exportFiles = paths.filter(file => !file.startsWith('index.'))
  return writeFile(join(dir, path), exportFiles.map(file => `export * from './${basename(file, extname(file))}';`).join('\n'),
    {encoding: 'utf-8'})
}

