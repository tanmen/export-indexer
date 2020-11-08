import {lstatSync} from "fs";
import {readdir, readFile} from "fs/promises";
import ignore from "ignore";
import {dirname, extname, join} from 'path';

const exts: string[] = [
  '.ts',
  '.js',
  '.tsx',
  '.jsx'
]

export const findExport = (path: string) => {
  const dir = dirname(path);
  return Promise.all([
    readdir(dir).then(files => files.filter(file =>
      exts.includes(extname(file)) || lstatSync(join(dir, file)).isDirectory())),
    readFile(path, {encoding: 'utf-8'})
  ])
    .then(([paths, index]: [string[], string]) => {
      const rule = index.split(/\n/g)
        .reduce((pre, cur) => pre.add(cur), ignore());
      return rule.filter(paths);
    });
}
