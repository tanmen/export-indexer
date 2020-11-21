import {writeFile} from "fs/promises";
import {join, basename, extname} from "path";

const findIndexPath = (paths: string[]) => {
  const indexPath = paths.find(file => file.startsWith('index.'));
  if (!indexPath) {
    const path = paths[0]
    return path ? `index${extname(path) || '.ts'}` : undefined;
  }
  return indexPath;
}

export const createIndex = (dir: string, paths: string[]) => {
  const path = findIndexPath(paths);
  if (!path) return Promise.resolve();
  const exportFiles = paths.filter(file => !file.startsWith('index.'));
  return writeFile(join(dir, path), exportFiles.map(file => `export * from './${basename(file, extname(file))}';`).join('\n'),
    {encoding: 'utf-8'})
}

