import path from "path";
import { build as viteBuild } from "vite";

function medusaBuild() {
  const configFile = path.resolve(__dirname, '../../../config/vite.config.ts')

  return viteBuild({
    // any valid user config options, plus `mode` and `configFile`
    configFile,
    root: process.cwd(),
    mode: 'medusa'
  })
}

export default medusaBuild;
