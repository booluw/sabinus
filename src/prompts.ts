import prompts from 'prompts'
import type { PromptObject } from 'prompts'
import { say } from './messages'
import { getUserPkgManager } from './utils/getUserPkgManager'
import { getRandomProjectNoun } from './utils/getRandomProjectNoun'
import type { Branches, Preferences } from './types'
import { allUiLibraries } from './utils/allUiLibs'
import { modules } from './configs'

const PROMPT_QUESTIONS: PromptObject[] = [
  {
    type: 'text',
    name: 'setProjectName',
    message: 'What will your project be called?',
    initial: `sabinus-${getRandomProjectNoun()}`
  },
  {
    type: 'select',
    name: 'setNuxtVersion',
    message: 'What version of Nuxt do you want? More information: https://github.com/booluw/sabinus-templates/blob/main/nuxt-versions',
    choices: [],
    initial: 0
  },
  {
    type: 'select',
    name: 'setUILibrary',
    message: 'what UI Library would you want?',
    choices: [...allUiLibraries],
    initial: 0
  },
  {
    type: prev => prev === 'nuxtui' ? false : 'multiselect',
    name: 'addModules',
    message: 'Which modules would you like to use?',
    choices: Object.entries(modules).map((
      [key, { humanReadableName, description }]) => ({ title: humanReadableName, description, value: key }))
  },
  {
    type: 'confirm',
    name: 'runGitInit',
    message: 'Initialize a new git repository?',
    initial: true,
  },
  // {
  //   type: skipIf(['cheviot'], 'select'),
  //   name: 'addCi',
  //   message: 'Initialize a default CI pipeline?',
  //   choices: [
  //     { title: 'No CI', description: 'Scaffold a project without any CI pipeline', value: 'none' },
  //     { title: 'GitHub Actions', description: 'Run your CI with GitHub actions', value: 'github' },
  //     { title: 'DroneCI', description: 'Run your CI with Drone', value: 'drone' },
  //   ],
  //   initial: 0,
  // },
  {
    type: 'confirm',
    name: 'runInstall',
    message: () => {
      const packageManager = getUserPkgManager()
      return `Would you like to run \`${packageManager} install\` after finishing up?`
    },
    initial: true,
  }
]

function onCancel() {
  say('Aborting mission - have a pleasent day 👋')
  process.exit()
}

export function addTemplateVersionsToPrompts(templateVersions: Branches[]) {
  PROMPT_QUESTIONS[1].choices = templateVersions.map((branch: Branches) => {
    return { title: branch.name, value: branch.name, description: `Use version '${branch.name}' of Sabinus Nuxt template` }
  })
}
export const getUserPreferences = () => prompts(PROMPT_QUESTIONS, { onCancel }) as Promise<Preferences>
