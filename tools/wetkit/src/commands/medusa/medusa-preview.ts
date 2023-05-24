import path from "path";
import { preview } from "vite";

async function medusaPreview() {
  const configFile = path.resolve(__dirname, "../../../config/vite.config.ts");

  const { config } = await preview({
    // any valid user config options, plus `mode` and `configFile`
    configFile,
    root: process.cwd()
  });

  const { port } = config.preview;
  console.log(`Preview:${port}`);
  console.log(`  ➜  Local:\thttp://localhost:${port}/`);
}

export default medusaPreview;
