#!/usr/bin/env node
import {indexer} from "../index";
import * as fs from "fs";
import ora from "ora";

const watch = process.argv.includes('--watch');
const extArg = process.argv.find(arg => arg.startsWith('--ext'));
const ext = ((extArg && extArg.match(/--ext=(.+)/)?.[1]) ?? 'ts') as 'js' | 'ts';
const spinner = ora('Indexing');
const loggable = (dirs: string[]) => dirs.reduce((res, dir) => `${res} - ${dir}/.index\n`, '');
// const loggable = (res: {dir: string, paths: string[]}[]) => res.reduce((res, {dir, paths}) => `${res}${dir}\n\n`, '');
const main = async () => {
  const results = await indexer(process.cwd(), {ext});

  if (watch) {
    let running = false;
    fs.watch(process.cwd(), {recursive: true}, async (eventType, filename) => {
      if (running || filename.endsWith(`index.${ext}`) || filename.endsWith('~') || filename.startsWith('.idea')) return;

      if (!filename.endsWith('.index') && eventType !== 'rename') return;

      running = true;
      try {
        console.clear();
        spinner.start();
        await indexer(process.cwd(), {ext})
          .then((res) => {
            spinner.stop();
            console.log('Generated:');
            console.log(loggable(res));
          })
      } finally {
        running = false;
      }
      // switch (eventType) {
      //   case 'rename':
      //     return console.log('rename')
      //   case 'change':
      //     if (filename !== '.index') return;
      //     return exec();
      // }
    })
  }
  return results;
}

spinner.start();
main()
  .then((res) => {
    spinner.stop();
    console.log('Generated:');
    console.log(loggable(res))
  })
