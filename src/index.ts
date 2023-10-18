import {dirname} from 'path';
import {createIndex} from "./createIndex";
import {findExport} from "./findExport";
import {findIndex} from "./findIndex";

export const indexer = (cwd: string = process.cwd(), {ext}: Option) => findIndex(cwd)
  .then(matches => Promise.all(matches.map(async path => {
    const exports = await findExport(path);
    const dir = dirname(path);
    return createIndex(dir, exports, {ext})
      .then(() => dir);
  })))
