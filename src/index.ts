import {dirname} from 'path';
import {createIndex} from "./createIndex";
import {findExport} from "./findExport";
import {findIndex} from "./findIndex";

const cache: any = {};

export const indexer = (cwd: string = process.cwd(), {watch, ext}: Option) => {
  return findIndex(cwd)
    .then(matches => Promise.all(matches.map(async path => {
      const exports = await findExport(path);
      if (watch) {
        if (Object.is(cache[path], exports)) {
          return Promise.resolve();
        }
        cache[path] = exports;
      }
      return createIndex(dirname(path), exports, {watch, ext});
    })))
    .then(() => !watch && console.log('generated'))
    .catch(e => console.error(e));
}
