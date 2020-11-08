#!/usr/bin/env node
import {indexer} from "../index";

indexer(process.cwd(), {watch: process.argv.includes('--watch')});
