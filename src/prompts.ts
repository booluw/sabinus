import prompts, { type PromptObject } from "prompts"
import { say } from "./messages"
import { Dependency } from "./utils/addPackageDependency"
import { getUserPkgManager } from "./utils/getUserPkgManager"

export type SupportedDependencies = "tailwind" | "naiveui" | "prisma"

declare interface ModuleConfig {
  dependencies: Dependency[]
  nuxtModuleNames: string[]
  nuxtExtendsNames: string[]
}
export const moduleConfigs: Record<SupportedDependencies, ModuleConfig> = {
  "tailwind": {
    dependencies: [{
      name: "@nuxtjs/tailwindcss",
      version: "^6.1.3",
      isDev: true
    }],
    nuxtModuleNames: ["@nuxtjs/tailwindcss"],
    nuxtExtendsNames: []
  },
  "naiveui": {
    dependencies: [{
      name: "@huntersofbook/naive-ui-nuxt",
      version: "^0.5.1",
      isDev: true
    }],
    nuxtModuleNames: ["@huntersofbook/naive-ui-nuxt"],
    nuxtExtendsNames: []
  },
  "prisma": {
    dependencies: [
      {
        name: "prisma",
        version: "^4.7.1",
        isDev: true
      },
      {
        name: "@prisma/client",
        version: "^4.7.1",
        isDev: false
      },
      {
        name: "@sidebase/nuxt-prisma",
        version: "^0.1.0",
        isDev: false
      }
    ],
    nuxtModuleNames: [],
    nuxtExtendsNames: ["@sidebase/nuxt-prisma"]
  }
}

// In the future we may add more like:
// - docker
const PROMPT_QUESTIONS: PromptObject[] = [
  {
    type: "text",
    name: "setProjectName",
    message: "What will your project be called?",
    initial: "my-sidebase-app"
  },
  {
    type: "multiselect",
    "name": "addModules",
    message: "Which modules would you like to use?",
    choices: [
      { title: "Tailwind CSS", description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. See more: https://tailwindcss.com/", value: "tailwind" },
      { title: "Naive UI", description: "A Vue 3 Component Library.Fairly Complete, Theme Customizable, Uses TypeScript, Fast. Kinda Interesting. See more: https://www.naiveui.com/", value: "naiveui" },
      { title: "PrismaORM", description: "Next-generation Node.js and TypeScript ORM. See more: https://www.prisma.io/", value: "prisma"},
    ] as { title: string; description: string; value: SupportedDependencies }[],
  },
  {
    type: "confirm",
    name: "runGitInit",
    message: "Initialize a new git repository?",
    initial: true,
  },
  {
    type: "select",
    name: "addCi",
    message: "Initialize a default CI pipeline?",
    choices: [
      { title: "No CI", description: "Scaffold a project without any CI pipeline", value: "none" },
      { title: "GitHub Actions", description: "Run your CI with GitHub actions.", value: "github" },
    ],
    initial: 0,
  },
  {
    type: "confirm",
    name: "runInstall",
    message: () => {
      const packageManager = getUserPkgManager()
      return `Would you like to run \`${packageManager} install\` after finishing up?`
    },
    initial: true,
  },
]

const onCancel = () => {
  say("Aborting mission - have a pleasent day 👋")
  process.exit()
}

export const getUserPreferences = () => prompts(PROMPT_QUESTIONS, { onCancel })
export type Preferences = Awaited<ReturnType<typeof getUserPreferences>>