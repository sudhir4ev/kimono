import path from 'path'
import { createServer } from 'vite'

async function start() {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: path.resolve(__dirname, '../../config/vite.config.ts'),
    root: process.cwd(),
    server: {
      port: 3001,
    },
  })
  await server.listen()

  server.printUrls()
}

export default start;
