import path from "path";
import {findExport} from "../findExport";

describe('findExport', () => {
  test('find', () =>
    expect(findExport(path.join(process.cwd(), 'test/.index')))
      .resolves
      .toEqual([
        'index.ts',
        'jsx.jsx',
        'normal.js',
        'one.ts',
        'three.ts',
        'tsx.tsx',
        'two.ts'
      ]))
});
