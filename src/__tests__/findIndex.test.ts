import path from "path";
import {findIndex} from "../findIndex";

describe('findIndex', () => {
  test('find', () =>
    expect(findIndex(path.join(process.cwd(), 'test')))
      .resolves
      .toEqual([
        '.index'
      ]))
});
