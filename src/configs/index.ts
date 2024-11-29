import type { Config, ModuleConfig } from '../types'
import trpc from './modules/trpc'
import sidebaseAuth from './modules/sidebase-auth'
import eslint from './modules/eslint'
import githubActions from './modules/github-actions'
import typescript from './modules/typescript'
import vscode from './modules/vscode'
import droneCI from './modules/droneCI'

import elementui from './ui/element'
import naiveui from './ui/naiveui'
import nuxtui from './ui/nuxtui'

import Unocss from './css/unocss'
import tailwind from './css/tailwind'

import drizzle from './orm/drizzle'
import prisma from './orm/prisma'

import i18n from './modules/i18n'
import pnpm from './modules/pnpm'

export type Configs = 'eslint' | 'github-actions' | 'typescript' | 'pnpm' | 'vscode' | 'droneCI'
export const configs: Record<Configs, Config> = {
  'eslint': eslint,
  'github-actions': githubActions,
  'typescript': typescript,
  'pnpm': pnpm,
  'vscode': vscode,
  'droneCI': droneCI
}

export type Modules = 'sidebase-auth' | 'trpc' | 'i18n'
export const modules: Record<Modules, ModuleConfig> = {
  'trpc': trpc,
  'sidebase-auth': sidebaseAuth,
  'i18n': i18n
}

export type ui = 'nuxtui' | 'naiveui' | 'element'
export const uiModules: Record<ui, ModuleConfig> = {
  nuxtui,
  element: elementui,
  naiveui,
}

export type css = 'tailwind' | 'unocss'
export const cssModules: Record<css, ModuleConfig> = {
  unocss: Unocss,
  tailwind
}

export type orm = 'prisma' | 'drizzle'
export const ormModules: Record<orm, ModuleConfig> = {
  drizzle,
  prisma
}
