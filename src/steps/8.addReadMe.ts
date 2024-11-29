import { writeFile } from 'node:fs/promises'
import { getResolver } from '../getResolver'
import type { Preferences } from '../types'
import { getUserPkgManager } from '../utils/getUserPkgManager'
import { ormModules } from '../configs'

function makeReadme(preferences: Preferences) {
  const { projectName, orm, css } = preferences

  const selectedFeatures = []
  if (css) {
    selectedFeatures.push({ name: css, url: css === 'tailwind' ? 'https://tailwindcss.com/' : 'https://unocss.dev/' })
  }
  if (orm) {
    selectedFeatures.push({ name: css, url: orm === 'prisma' ? 'https://www.prisma.io/' : 'https://www.orm.drizzle.team/' })
  }

  const tasksPostInstall = orm ? ormModules[orm].tasksPostInstall : []
  const packageManager = getUserPkgManager()

  return `# ${projectName}-app

This is a [sabinus](https://github.com/booluw/sabinus) app created by running \`${packageManager} create sabinus\`. This project uses the following technologies for a great developer- and user-experience:

- [TypeScript](https://www.typescriptlang.org/)
- [Nuxt 3](https://nuxt.com)
${selectedFeatures.map((feat) => `- [${feat.name}](${feat.url})\n`).join('\n')}

## How to get going?

This is created as a boilerplate to build your incredible fullstack NuxtJS app on. You can contribute to this by visiting [the repo](https://github.com/booluw/sabinus) or create an [issue](https://github.com/booluw/sabinus/issues).
Also, you can find all versions of the template [here](https://github.com/booluw/sabinus).

Some tasks you should probably do in the beginning are:

- [ ] replace this generic README with a more specific one
- [ ] install the Vue Volar extension
- [ ] enable [Volar takeover mode](https://nuxt.com/docs/getting-started/installation#prerequisites) to ensure a smooth editor setup
- [ ] [install Nuxt 3 devtools](https://github.com/nuxt/devtools#installation) if you want to use them
${tasksPostInstall.join('\n')}

### Setup

Make sure to install the dependencies:

\`\`\`bash
${packageManager} install
\`\`\`

### Development Server

Start the development server on http://localhost:3000

\`\`\`bash
${packageManager} run dev
\`\`\`

### Production

Build the application for production:

\`\`\`bash
${packageManager} run build
\`\`\`

Locally preview production build:

\`\`\`bash
${packageManager} run preview
\`\`\`
`
}

export default async (preferences: Preferences, templateDir: string) => {
  const resolver = getResolver(templateDir)
  await writeFile(resolver('README.md'), makeReadme(preferences), { flag: 'w' })
}
