import fs from 'fs'
import type { Plugin, Manifest } from 'vite'

function medusaManifest(): Plugin {
  return {
    name: 'medusa-manifest',
    apply: 'build',
    enforce: 'post',
    config(config) {
      assert(
        config.build?.manifest,
        '[@evooq/vite-plugin-medusa-manifest] This plugin needs the vite build option "manifest" set to true.',
      )
    },
    async writeBundle({ dir }) {
      const manifestPath = `${dir}/manifest.json`
      const manifestMedusaPath = `${dir}/manifest-medusa.json`
      const manifestAsString = await fs.promises.readFile(manifestPath, 'utf8')
      const manifest: Manifest = JSON.parse(manifestAsString)
      const entry = Object.entries(manifest).find(([key, value]) => !key.endsWith('.html') && value.isEntry)?.[1]

      assert(entry, 'No entry file was found.')

      const manifestForMedusa = {
        entry: entry.file,
      }
      await fs.promises.writeFile(manifestMedusaPath, JSON.stringify(manifestForMedusa, null, 2))
    },
  }
}

function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

export default medusaManifest
