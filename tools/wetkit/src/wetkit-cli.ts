#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import sade from 'sade'
import { prompt } from 'enquirer'
import medusaPreview from "./commands/medusa/medusa-preview";
import medusaBuild from "./commands/medusa/medusa-build";
import start from "./commands/start";
import build from "./commands/build";
import MedusaAddEntryFile from "./commands/medusa/medusa-add-entry-file";
import medusaSetup from "./commands/medusa/medusa-setup";

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
      return start()
    })

  /**
   * build
   */
  prog
    .command('build')
    .describe('build')
    .action(async () => {
      return build()
    })


  prog
    .command('medusa build')
    .describe('Build medusa package')
    .action(async () => {
      return medusaBuild()
    })

  prog
    .command('medusa preview')
    .describe('Preview medusa build')
    .action(async () => {
      return medusaPreview()
    })

  prog
    .command('medusa setup')
    .describe('Bootstrap a medusa microfrontend app')
    .action(async () => {
      return medusaSetup()
    })

  prog.parse(process.argv)
})()
