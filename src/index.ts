import {dirname} from 'path';
import {createIndex} from "./createIndex";
import {findExport} from "./findExport";
import {findIndex} from "./findIndex";
const cache: any = {};

export const indexer = (cwd: string = process.cwd(), {watch}: { watch?: boolean } = {}) => {
  watch && console.log('generate started...');
  return findIndex(cwd)
    .then(matches => Promise.all(matches.map(async path => {
      const exports = await findExport(path);
      if (watch && Object.is(cache[path], exports)) return Promise.resolve();
      watch && (cache[path] = exports);
      return createIndex(dirname(path), exports);
    })))
    .then(() => console.log('generated'))
    .catch(e => console.error(e));
}
