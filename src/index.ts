import {dirname} from 'path';
import {createIndex} from "./createIndex";
import {findExport} from "./findExport";
import {findIndex} from "./findIndex";

const cache: any = {};

export const indexer = (cwd: string = process.cwd(), {ext}: Option) => {
  return findIndex(cwd)
    .then(matches => Promise.all(matches.map(async path => {
      const exports = await findExport(path);
      return createIndex(dirname(path), exports, {ext});
    })))
    .then(() => console.log('generated'))
    .catch(e => console.error(e));
}
