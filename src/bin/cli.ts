#!/usr/bin/env node
import * as fs from "fs";
import {indexer} from "../index";

const watch = process.argv.includes('--watch');
const extArg = process.argv.find(arg => arg.startsWith('--ext'));
const ext = ((extArg && extArg.match(/--ext=(.+)/)?.[1]) ?? 'ts') as 'js' | 'ts';

const exec = () => indexer(process.cwd(), {watch, ext});

watch && fs.watch(process.cwd(), {recursive: true}, (eventType, filename) => {
  switch (eventType) {
    case 'rename':
      return exec();
    case 'change':
      if (filename !== '.index') return;
      return exec();
  }
})

