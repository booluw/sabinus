import { generateModuleHTMLComponent, generateModuleHTMLSnippet } from '../../generators/generateModuleComponents'
import type { ModuleConfig } from '../../types'

const NuxtUIDemoComponent = `<script setup lang="ts">
const showModal = ref(false)
</script>

<template>
  ${generateModuleHTMLComponent(
  'NuxtUI',
    'A UI Library for Modern Web Apps',
  'https://ui.nuxt.com/getting-started/theming',
  `
      <UModal v-model="showModal">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              NuxtUI Modal
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showModal = false" />
          </div>
        </template>
        <div class="p-4">
          <Placeholder class="h-48" />
        </div>
      </UModal>
    `,
  `
      <WelcomeButtonLink @click="showModal = true">
        Open modal
      </WelcomeButtonLink>
    `,
).html}
</template>
`

const nuxtAppVueWithNuxtUIConfig = `<template>
  <UContainer>
    <NuxtPage />
  </UContainer>
</template>
`

const nuxtui: ModuleConfig = {
  humanReadableName: 'Nuxt UI',
  description: 'A UI Library for Modern Web Apps. See more: https://www.ui.nuxt.com/',
  scripts: [],
  dependencies: [
    {
      name: '@nuxt/ui',
      version: '2.18.7',
      isDev: true
    }
  ],
  nuxtConfig: {
    modules: ['@nuxt/ui'],
  },
  files: [{
    path: 'components/Welcome/NuxtUIDemo.vue',
    content: NuxtUIDemoComponent
  }, {
    path: 'app.vue',
    content: nuxtAppVueWithNuxtUIConfig
  }],
  tasksPostInstall: [],
  indexVue: generateModuleHTMLSnippet('WelcomeNuxtUIDemo'),
}

export default nuxtui
