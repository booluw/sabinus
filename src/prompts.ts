import prompts from 'prompts'
import type { PromptObject } from 'prompts'
import { say } from './messages'
import { getUserPkgManager } from './utils/getUserPkgManager'
import { getRandomProjectNoun } from './utils/getRandomProjectNoun'
import type { Branches, Preferences } from './types'
import { cssModules, /* modules, */ ormModules, uiModules } from './configs'

const PROMPT_QUESTIONS: PromptObject[] = [
  {
    type: 'text',
    name: 'projectName',
    message: 'What will your project be called?',
    initial: `sabinus-${getRandomProjectNoun()}`
  },
  {
    type: 'select',
    name: 'version',
    message: 'What version of Nuxt do you want? More information: https://github.com/booluw/sabinus-templates/blob/main/nuxt-versions',
    choices: [],
    initial: 0
  },
  {
    type: 'select',
    name: 'ui',
    message: 'what UI Library would you want?',
    choices: [
      {
        title: 'None',
        value: null
      },
      ...Object.entries(uiModules).map((
      [key, { humanReadableName, description }]) => ({ title: humanReadableName, description, value: key }))
      // {
      //   title: 'NuxtUI',
      //   description: 'A UI Library for modern web apps. See more: https://ui.nuxt.com/',
      //   value: 'nuxtui'
      // },
      // {
      //   title: 'NaiveUI',
      //   description: 'A Vue 3 Component library fairly Complete, theme customizable, uses typeScript, fast kinda interesting. See more: https://www.naiveui.com',
      //   value: 'naiveui'
      // },
      // {
      //   title: 'ElementPlus',
      //   description: 'A Vue 3 based component library for designers and developers. See more: https://element-plus.org',
      //   value: 'element'
      // }
    ],
    initial: 0
  },
  {
    type: prev => prev === 'nuxtui' ? false : 'select',
    name: 'css',
    message: 'Which css library would you like to use?',
    choices: [
      {
        title: 'None',
        value: null
      },
      ...Object.entries(cssModules).map((
        [key, { humanReadableName, description }]) => ({ title: humanReadableName, description, value: key }))
    ]
  },
  {
    type: 'select',
    name: 'orm',
    message: 'Which orm would you like to use?',
    choices: [
      {
        title: 'None',
        value: null
      },
      ...Object.entries(ormModules).map((
        [key, { humanReadableName, description }]) => ({ title: humanReadableName, description, value: key }))
      ]
  },
  {
    type: 'confirm',
    name: 'runGitInit',
    message: 'Initialize a new git repository?',
    initial: true,
  },
  {
    type: 'select',
    name: 'addCi',
    message: 'Initialize a default CI pipeline?',
    choices: [
      { title: 'No CI', description: 'Scaffold a project without any CI pipeline', value: 'none' },
      { title: 'GitHub Actions', description: 'Run your CI with GitHub actions', value: 'github' },
      { title: 'DroneCI', description: 'Run your CI with Drone', value: 'drone' },
    ],
    initial: 0,
  },
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
