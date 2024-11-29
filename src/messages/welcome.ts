import chalk from 'chalk'
import { consola } from 'consola'
import { getVersion } from '../utils/getVersion'
import { diamond, say } from '.'

// Text to ASCII from http://patorjk.com/software/taag/
function makeBanner(welcome: string) {
  return `



                                  bbbbbbbb
                                  b::::::b              iiii
                                  b::::::b             i::::i
                                  b::::::b              iiii
                                   b:::::b
    ssssssssss     aaaaaaaaaaaaa   b:::::bbbbbbbbb    iiiiiiinnnn  nnnnnnnn    uuuuuu    uuuuuu      ssssssssss
  ss::::::::::s    a::::::::::::a  b::::::::::::::bb  i:::::in:::nn::::::::nn  u::::u    u::::u    ss::::::::::s
ss:::::::::::::s   aaaaaaaaa:::::a b::::::::::::::::b  i::::in::::::::::::::nn u::::u    u::::u  ss:::::::::::::s
s::::::ssss:::::s           a::::a b:::::bbbbb:::::::b i::::inn:::::::::::::::nu::::u    u::::u  s::::::ssss:::::s
 s:::::s  ssssss     aaaaaaa:::::a b:::::b    b::::::b i::::i  n:::::nnnn:::::nu::::u    u::::u   s:::::s  ssssss
   s::::::s        aa::::::::::::a b:::::b     b:::::b i::::i  n::::n    n::::nu::::u    u::::u     s::::::s
      s::::::s    a::::aaaa::::::a b:::::b     b:::::b i::::i  n::::n    n::::nu::::u    u::::u        s::::::s
ssssss   s:::::s a::::a    a:::::a b:::::b     b:::::b i::::i  n::::n    n::::nu:::::uuuu:::::u  ssssss   s:::::s
s:::::ssss::::::sa::::a    a:::::a b:::::bbbbbb::::::bi::::::i n::::n    n::::nu:::::::::::::::uus:::::ssss::::::s
s::::::::::::::s a:::::aaaa::::::a b::::::::::::::::b i::::::i n::::n    n::::n u:::::::::::::::us::::::::::::::s
 s:::::::::::ss   a::::::::::aa:::ab:::::::::::::::b  i::::::i n::::n    n::::n  uu::::::::uu:::u s:::::::::::ss
  sssssssssss      aaaaaaaaaa  aaaabbbbbbbbbbbbbbbb   iiiiiiii nnnnnn    nnnnnn    uuuuuuuu  uuuu  sssssssssss



${diamond}
${welcome}
`
}
export async function sayWelcome() {
  const version = await getVersion()
  const welcome = `Welcome to ${chalk.green(`create-sabinus v${version}`)}!`
  const banner = makeBanner(welcome)

  console.log(banner)

  say(`Sabinus helps you bootstrap fullstack Nuxt apps: ${chalk.blueBright('https://github.com/booluw/sabinus')} \n`)

  say('Let\'s get started:')
}

export async function sayQuickWelcome() {
  const version = await getVersion()
  consola.info(`Welcome to ${chalk.green(`create-sabinus v${version}`)} (${chalk.blueBright('https://github.com/booluw/sabinus')})! Thanks for choosing the warp route:`)
}
