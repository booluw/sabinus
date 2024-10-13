import fetch from 'node-fetch'
import type { Branches } from '../types'

let templateVersions: Branches[] = []
export async function getTemplateVersions() {
  if (templateVersions.length !== 0) {
    return templateVersions
  }

  try {
    const response = await fetch('https://api.github.com/repos/booluw/sabinus-templates/branches').then(response => response.json() as unknown as Branches[])
    // Remove 'main' branch because it is not a template
    templateVersions = response.filter(branches => branches.name !== 'main')
  }
  catch (error) {
    // There will always be a 'latest' template in sabinus/templates
    templateVersions = [{ name: 'latest', commit: { sha: '', url: '' }, protected: false }]
    console.log(error)
  }

  return templateVersions
}
