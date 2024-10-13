import { generateModuleHTMLComponent, generateModuleHTMLSnippet } from '../../generators/generateModuleComponents'
import type { ModuleConfig } from '../../types'

const ElementDemoComponent = `<script setup lang="ts">
const showModal = ref(false)
</script>

<template>
  ${generateModuleHTMLComponent(
    'ElementUI',
    'A Vue 3 based component library for designers and developers.',
    'https://element-plus.org/en-US/guide/theming.html',
    `
      <img src="https://element-plus.org/images/element-plus-logo.svg" />
      <el-dialog v-model="showModal" :show-close="false" width="500">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">
            <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
            <el-button type="danger" @click="close">
              <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
              Close
            </el-button>
          </div>
        </template>
        Adding ElementUI to your project is so simple, you won't even notice how long it took.
      </el-dialog>
    `,
    `
      <WelcomeButtonLink @click="showModal = true">
        Open modal
      </WelcomeButtonLink>
    `,
  ).html}
</template>
`

const nuxtAppVueWithElementConfig = `<template>
  <el-config-provider>
    <NuxtPage />
  </el-config-provider>
</template>
`

const elementui: ModuleConfig = {
  humanReadableName: 'Element UI',
  description: 'A Vue 3 based component library for designers and developers. See more: https://www.element-plus.org/',
  scripts: [],
  dependencies: [
    {
      name: 'element-plus',
      version: '2.8.5',
      isDev: false
    },
    {
      name: '@element-plus/nuxt',
      version: '1.0.10',
      isDev: true
    }
  ],
  nuxtConfig: {
    modules: ['@element-plus/nuxt'],
  },
  files: [{
    path: 'components/Welcome/ElementDemo.vue',
    content: ElementDemoComponent
  }, {
    path: 'app.vue',
    content: nuxtAppVueWithElementConfig
  }],
  tasksPostInstall: [],
  indexVue: generateModuleHTMLSnippet('WelcomeElementDemo'),
}

export default elementui
