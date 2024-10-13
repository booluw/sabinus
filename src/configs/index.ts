import type { Config, ModuleConfig } from '../types'
import prisma from './orm/prisma'
import trpc from './modules/trpc'
import sidebaseAuth from './modules/sidebase-auth'
import eslint from './modules/eslint'
import githubActions from './modules/github-actions'
import typescript from './modules/typescript'
import pnpm from './modules/pnpm'
import vscode from './modules/vscode'
import droneCI from './modules/droneCI'
import i18n from './modules/i18n'

import elementui from './ui/element'
import naiveui from './ui/naiveui'
import nuxtui from './ui/nuxtui'

import Unocss from './css/unocss'
import tailwind from './css/tailwind'

export type Modules = 'prisma' | 'sidebase-auth' | 'trpc' | 'i18n'
export const modules: Record<Modules, ModuleConfig> = {
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

export type css = 'tailwind' | 'unocss'
export const cssModule: Record<css, ModuleConfig> = {
  'unocss': Unocss,
  'tailwind': tailwind
}

