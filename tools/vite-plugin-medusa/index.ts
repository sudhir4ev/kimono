import fs from 'fs'
import type { Plugin, Manifest } from 'vite'
import buildMedusaStandaloneHtml from "./src/buildMedusaStandalone";

function pluginMedusa(options: MedusaPluginOptions = {}): Plugin {
  return {
    name: 'medusa-manifest',
    apply: 'build',
    enforce: 'post',
    config(config) {
      assert(
        config.build?.manifest,
        '[@evooq/vite-plugin-medusa] This plugin needs the vite build option "manifest" set to true.',
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
    transformIndexHtml(html, {chunk}) {
      const { fileName, isEntry } = chunk
      if(isEntry) {
        const entryChunkFileName = fileName;
        const { html: newHtml } = buildMedusaStandaloneHtml(html, {
          entryChunkFileName
        });
        return newHtml
      }
      else return html;
    }
  }
}

function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

export default pluginMedusa

type MedusaPluginOptions  = Partial<MedusaOptions>

type MedusaOptions = {
  manifest: boolean
}
