import {readFile} from "fs/promises";
import {glob} from "glob";
import {dirname} from "path";
import ignore from "ignore";

const exts = [
  'ts',
  'js',
  'tsx',
  'jsx'
]

export const findExport = (path: string) =>
  Promise.all([
    new Promise<string[]>((resolve, reject) =>
      glob(`*.{${exts.join(',')}}`, {cwd: dirname(path)}, (err, matches) => err ? reject(err) : resolve(matches))),
    readFile(path, {encoding: 'utf-8'})
  ])
    .then(([paths, index]: [string[], string]) => {
      const rule = index.split(/\n/g)
        .reduce((pre, cur) => pre.add(cur), ignore());
      return rule.filter(paths);
    })
