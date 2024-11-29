import type { NuxtConfig } from '@nuxt/schema'
import type { Modules, css, orm, ui } from './configs'

export interface Preferences {
  projectName: string
  version: string
  ui: ui
  orm: orm
  addModules?: Modules[]
  runGitInit: boolean
  css: css
  addCi?: 'github' | 'drone'
  runInstall: boolean
}

export declare interface File {
  path: string
  content: string
}

export interface Dependency {
  name: string
  version: string
  isDev: boolean
  isPeer?: boolean
}

export interface Script {
  name: string
  command: string
}

export interface Config {
  requiresOn?: string[]
  dependencies: Dependency[]
  scripts: Script[]
  files: File[]
  nuxtConfig: NuxtConfig
}

export interface ModuleConfig extends Config {
  humanReadableName: string
  description: string
  tasksPostInstall: string[]
  indexVue?: {
    html: string
    css?: string
    js?: string
  }
}

export interface Branches {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

export interface NameVal {
  title: string
  value: string
}
