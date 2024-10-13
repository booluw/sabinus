import type { Config, ModuleConfig } from '../types'
import tailwind from './tailwind'
import prisma from './prisma'
import trpc from './trpc'
import sidebaseAuth from './sidebase-auth'
import eslint from './eslint'
import githubActions from './github-actions'
import typescript from './typescript'
import pnpm from './pnpm'
import vscode from './vscode'
import droneCI from './droneCI'
import i18n from './i18n'

import elementui from './UI/element'
import naiveui from './UI/naiveui'
import nuxtui from './UI/nuxtui'

export type Modules = 'prisma' | 'sidebase-auth' | 'trpc' | 'tailwind' | 'i18n'
export const modules: Record<Modules, ModuleConfig> = {
  'tailwind': tailwind,
  'prisma': prisma,
  'trpc': trpc,
  'sidebase-auth': sidebaseAuth,
  'i18n': i18n
}

export type Configs = 'eslint' | 'github-actions' | 'typescript' | 'pnpm' | 'vscode' | 'droneCI'
export const configs: Record<Configs, Config> = {
  'eslint': eslint,
  'github-actions': githubActions,
  'typescript': typescript,
  'pnpm': pnpm,
  'vscode': vscode,
  'droneCI': droneCI
}

export type UILibs = 'nuxtui' | 'naiveui' | 'element'
export const uiLib: Record<UILibs, ModuleConfig> = {
  'nuxtui': nuxtui,
  'element': elementui,
  'naiveui': naiveui,
}
