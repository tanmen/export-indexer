#!/usr/bin/env node
import * as fs from "fs";
import {indexer} from "../index";

const watch = process.argv.includes('--watch');
indexer(process.cwd())
watch && fs.watch(process.cwd(), {recursive: true},(eventType) => eventType === 'rename' && indexer(process.cwd(),
  {watch}))

