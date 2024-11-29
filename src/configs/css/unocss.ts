import { generateModuleHTMLComponent, generateModuleHTMLSnippet } from '../../generators/generateModuleComponents'
import type { ModuleConfig } from '../../types'

const UnocssDemoComponent = `<template>
  ${generateModuleHTMLComponent(
  'UnoCSS',
  'Instant On-demand Atomic CSS Engine',
  'https://unocss.dev/integrations/nuxt',
  '',
  `<WelcomeButtonLink href="https://unocss.dev/" :blank="true">
      UnoCSS docs
    </WelcomeButtonLink>
  `,
).html}
</template>
`

const UnocssConfig = `
  import { defineConfig } from 'unocss'

  export default defineConfig({
    // ...UnoCSS options
  })
`

const Unocss: ModuleConfig = {
  humanReadableName: 'UnoCSS',
  description: 'Instant On-demand Atomic CSS Engine. See more: https://unocss.dev/',
  scripts: [],
  dependencies: [
    {
      name: 'unocss',
      version: '^0.63.4',
      isDev: true
    },
    {
      name: '@unocss/nuxt',
      version: '^0.63.4',
      isDev: true
    }
  ],
  nuxtConfig: {
    modules: ['@unocss/nuxt']
  },
  files: [
    {
      path: 'components/Welcome/UnocssDemo.vue',
      content: UnocssDemoComponent,
    },
    {
      path: 'uno.config.ts',
      content: UnocssConfig
    }
  ],
  tasksPostInstall: [],
  indexVue: generateModuleHTMLSnippet('WelcomeUnocssDemo'),
}

export default Unocss
