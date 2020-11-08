#!/usr/bin/env node
import * as fs from "fs";
import {indexer} from "../index";

const watch = process.argv.includes('--watch');
watch
  ? fs.watch(process.cwd(), {recursive: true},() => indexer(process.cwd(), {watch}))
  : indexer(process.cwd())

