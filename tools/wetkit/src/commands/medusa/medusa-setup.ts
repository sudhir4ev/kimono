import { prompt } from "enquirer";
import template, { ReactMedusaMicrofrontendTemplateVars } from "./medusa-main-microfrontend.template";
import fs from "fs";

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
      message: 'Root component path? (e.g.)',
      required: true
    },
    {
      type: 'input',
      name: 'hostPath',
      message: 'Path where the app will be host in Medusa',
      initial: '/my-app',
      required: true
    },
    {
      type: 'input',
      name: 'entryFileName',
      message: 'Name of medusa entry file',
      initial: 'main-microfrontend.ts',
      required: true
    },
  ])

  console.log(`Creating ${answers.entryFileName} for new microfrontend \"${answers.appName}\".`)

  return MedusaAddEntryFile('main-microfrontend.ts', {
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
