import { prompt } from "enquirer";
import template, { ReactMedusaMicrofrontendTemplateVars } from "./medusa-main-microfrontend.template";
import fs from "fs";

/**
 * Tasks
 * 1. Add new entry file which exposes apis used by medusa
 *    to bootstrap the microfrontend
 */
async function medusaSetup() {

  const answers:any = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: 'Microfrontend application name?',
      initial: 'My App',
    },
    {
      type: 'input',
      name: 'rootComponentPath',
      message: 'Root component path?',
      required: true
    },
    {
      type: 'input',
      name: 'hostPath',
      message: 'Path where the app will be host in Medusa',
      initial: '/my-app',
      required: true
    },
  ])

  const entryFileName = 'main-microfrontend.ts'

  console.log(`Creating ${entryFileName} for new microfrontend \"${answers.appName}\".`)

  return MedusaAddEntryFile(entryFileName, {
    appName: answers.appName,
    rootComponentPath: answers.rootComponentPath,
    hostPath: answers.hostPath
  })
}

function MedusaAddEntryFile(
  outFilePath: string,
  entryTemplateVars: ReactMedusaMicrofrontendTemplateVars
) {

  const templateString = template(entryTemplateVars);

  return fs.promises.writeFile(outFilePath, templateString);
}


export default medusaSetup
