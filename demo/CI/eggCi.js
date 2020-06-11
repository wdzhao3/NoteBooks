#! /usr/bin/env node

const { Command } = require('commander')
const chalk = require('chalk')
const which = require('which')
const childProcess = require('child_process')
const fs = require('fs')
const program = new Command()
// 版本命令
program.version('0.0.1')
program.helpOption('-h, HELP')
program.version('0.0.1', '-v, --version')
program
  .command('pkg [dir]')
  .description('node打包二进制')
  .action(async (dir, type) => {
    // console.log(type);
    const npm = findNpm()
    console.log('----')
    // console.log(__dirname + '\\egg')
    childProcess.spawnSync('cd', ['egg'])
    console.log(__dirname)
    // runCmd(which.sync(npm), ['install'], dir).then(() => {
    //   console.log('1')
    // })
  });
function findNpm() {
  const npms = ['npm']
  for (let i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i])
      return npms[i]
    } catch (e) {
      console.log(chalk.red(e))
    }
  }
}
async function runCmd(cmd, args, dir) {
  args = args || []
  let runner = await childProcess.spawn(cmd, args, {
    stdio: 'inherit'
  })
  runner.on('close', (code) => {
    if (code !== 0) {
      console.log(chalk.red(`子进程退出，退出码 ${code}`))
      return
    } else {
      console.log(chalk.green(`npm ${args} success!`))
      return
    }
  });
}
program.parse(process.argv)