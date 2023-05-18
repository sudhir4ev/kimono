#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import sade from 'sade'
import { fileURLToPath } from 'url'
import { build, start } from './commands'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const prog = sade('wetkit')

;(async () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json')).toString()
  )

  prog.version(pkg.version)

  /**
   * start
   */
  prog
    .command('start')
    .describe('Start dev server')
    .action(async () => {
      start()
    })

  /**
   * build
   */
  prog
    .command('build')
    .describe('build')
    .action(async () => {
      build()
    })

  prog.parse(process.argv)
})()
