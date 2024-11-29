import { generateModuleHTMLComponent, generateModuleHTMLSnippet } from '../../generators/generateModuleComponents'
import type { ModuleConfig } from '../../types'

const drizzleConfig = `
  import 'dotenv/config'
  import { defineConfig } from 'drizzle-kit';

  export default defineConfig({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: 'drizzle/schema.ts',
    dbCredentials: {
      url: process.env.DB_FILE_NAME!
    }
  })
`

const drizzleRootSchema = `// This is your Drizzle schema file,
  import { drizzle } from "drizzle-orm/connect";
  import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
  export const users = pgTable('users', {
    id: integer(),
    first_name: varchar()
  })
`

const drizzleEnvFile = `# Drizzle
  DB_FILE_NAME=file:./local.db
`

const drizzleExampleEndpoint = `
  import { users } from 'drizzle/schema.ts'
  export default defineEventHandler(async (event) => {
    const { db } = event.context
    return await db.select().from(users)
  })
`

const drizzleServerMiddleware = `
  import { drizzle } from "drizzle-orm/connect";

  let db

  export default eventHandler(async (event) => {
    if (!db) {
      db = await drizzle('postgres-js', { connection: process.env.DB_FILE_NAME})
    }
    event.context.db = db
})
`

const drizzleDemoComponent = `<script lang="ts" setup>
const { data } = useFetch('/api/examples')
</script>

<template>
  ${generateModuleHTMLComponent(
  'Drizzle ORM',
  'Drizzle unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.',
  // TODO: Change to Drizzle docs on Sabinus
  'https://orm.drizzle.team/docs/get-started-postgresql',
  `
    <p>
      Drizzle ORM Data from the database, received {{ data?.length || 0 }} records!
    </p>
  `,
  '',
).html}
</template>
`

const drizzle: ModuleConfig = {
  humanReadableName: 'Drizzle ORM',
  description: 'ORM for you to ship ship ship. See more: https://www.orm.drizzle.team/',
  scripts: [],
  dependencies: [
    {
      name: 'drizzle-kit',
      version: '^0.25.0',
      isDev: true
    },
    {
      name: 'postgres',
      version: '^3.4.4',
      isDev: true
    },
    {
      name: 'drizzle-orm',
      version: '^0.34.1',
      isDev: false
    }
  ],
  nuxtConfig: {},
  files: [{
    path: '.env',
    content: drizzleEnvFile
  }, {
    path: 'drizzle/schema.ts',
    content: drizzleRootSchema
  }, {
    path: 'drizzle.config.ts',
    content: drizzleConfig
  }, {
    path: 'server/api/examples.get.ts',
    content: drizzleExampleEndpoint
  }, {
    path: 'server/middleware/0.drizzle.ts',
    content: drizzleServerMiddleware
  }, {
    path: 'components/Welcome/drizzleDemo.vue',
    content: drizzleDemoComponent,
  }],
  tasksPostInstall: [
    // TODO: write this accordingly
    '- [ ] Drizzle: Edit your `drizzle/schema.schema` to your liking',
    '- [ ] Drizzle: Run `npx drizzle-kit generate` to sync the schema to your database & generate the Drizzle Client',
  ],
  indexVue: generateModuleHTMLSnippet('WelcomeDrizzleDemo'),
}

export default drizzle
