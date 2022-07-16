#!/usr/bin/env node
import {indexer} from "../index";

const extArg = process.argv.find(arg => arg.startsWith('--ext'));
const ext = ((extArg && extArg.match(/--ext=(.+)/)?.[1]) ?? 'ts') as 'js' | 'ts';

indexer(process.cwd(), {ext});
