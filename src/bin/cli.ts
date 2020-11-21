#!/usr/bin/env node
import * as fs from "fs";
import chokidar from "chokidar";
import {indexer} from "../index";
import {basename} from 'path';

const watch = process.argv.includes('--watch');
const extArg = process.argv.find(arg => arg.startsWith('--ext'));
const ext = ((extArg && extArg.match(/--ext=(.+)/)?.[1]) ?? 'ts') as 'js' | 'ts';

const exec = () => indexer(process.cwd(), {watch, ext});

indexer(process.cwd(), {watch: false, ext});

chokidar
  .watch(process.cwd(), {
    persistent: true,
    ignored: '**/node_modules/**/*',
    awaitWriteFinish: true,
    followSymlinks: true,
    atomic: true,
  })
  .on('add', () => exec())
  .on('change', path => basename(path) === '.index' && exec())
  .on('unlink', () => exec());
