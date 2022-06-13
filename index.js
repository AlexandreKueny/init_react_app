#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { spawnSync } = require('child_process');
const { join } = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const cheerio = require('cheerio');

const additionalLibraries = [
    'react-query',
    'axios',
    'node-sass',
    'classnames',
    'react-animate-height',
];

const additionalDevLibraries = [
    'env-cmd',
];

const additionalFiles = [
    '/templates/generate-react-cli.json',
    '/templates/.env.development',
    '/templates/.env.staging',
    '/templates/.env.production',
    '/templates/templates',
];

const additionalScripts = {
    'generate-component': 'npx generate-react-cli component',
    'start:staging': 'env-cmd -f .env.staging react-scripts start',
    'start:prod': 'env-cmd -f .env.production react-scripts start',
};

const additionalHeadTags = [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">',
];

console.log(chalk.yellow(`Welcome to init-react-app`));

// program.version(version).description(description);

const onDone = () => {
    console.log(chalk.yellow(`Done`));
}

const spawnCreateReactApp = (appName, _options) => {
    console.log(chalk.yellow(`Creating standard React app`));
    return spawnSync('npx', [
        'create-react-app',
        '--template',
        'typescript',
        appName,
    ], {
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit']
    });
}

const spawnNpmInstall = (appName) => {
    console.log(chalk.yellow(`Installing additional packages`));
    return spawnSync('npm', [
        'i',
        ...additionalLibraries
    ], {
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit'],
        cwd: join(process.cwd(), appName)
    })
}

const spawnNpmInstallDev = (appName) => {
    console.log(chalk.yellow(`Installing additional dev packages`));
    return spawnSync('npm', [
        'i',
        '--save-dev',
        ...additionalDevLibraries
    ], {
        shell: true,
        stdio: ['inherit', 'inherit', 'inherit'],
        cwd: join(process.cwd(), appName)
    })
}

const copyAdditionalFiles = (appName) => {
    console.log(chalk.yellow(`Copying additional files`));
    for (let file of additionalFiles) {
        fse.copySync(join(__dirname, file), join(process.cwd(), appName, file.split('/').slice(-1)[0]))
    }
}

const setAdditionalScripts = (appName) => {
    console.log(chalk.yellow(`Adding custom npm scripts`));
    const packageObj = fse.readJsonSync(join(process.cwd(), appName, 'package.json'))
    packageObj['scripts'] = {
        ...packageObj['scripts'],
        ...additionalScripts
    }
    fse.writeJsonSync(join(process.cwd(), appName, 'package.json'), packageObj, { spaces: 2 });
}

const copyAdditionalComponents = (appName) => {
    console.log(chalk.yellow(`Adding basic components`));
    fse.copySync(join(__dirname, '/templates/src'), join(process.cwd(), appName, 'src'))
}

const setAdditionalHeadTags = (appName) => {
    console.log(chalk.yellow(`Adding custom lines to index.html`));
    fs.readFile(join(process.cwd(), appName, 'public', 'index.html'), 'utf-8', (_readErr, data) => {
        const $ = cheerio.load(data);
        for (let tag of additionalHeadTags) {
            $('head').append(`    ${tag}\n`);
        }
        fs.writeFile(join(process.cwd(), appName, 'public', 'index.html'), $.html(), (_writeErr) => null);
    })
}

const execCommands = (appName, commands) => {
    for (let command of commands) {
        const result = command(appName);
        if (result.status !== 0) {
            console.log(chalk.yellow(`Something wrong happened`));
            break;
        }
    }
}

const exec = (appName, options) => {
    const commands = [spawnCreateReactApp];

    if (options.custom) {
        commands.push(spawnNpmInstall);
        commands.push(spawnNpmInstallDev);
    }

    execCommands(appName, commands);

    if (options.custom) {
        copyAdditionalFiles(appName);
        setAdditionalScripts(appName);
        setAdditionalHeadTags(appName);
        if (options.components) {
            copyAdditionalComponents(appName);
        }
    }
    onDone();
}

program
    .description('Generate a new React project')
    .argument('<appName>')
    .option('--no-custom', 'Create a standard React app')
    .option('--no-components', 'Disable basic components generation')
    .action((appName, options) => {
        exec(appName, options);
    });

program.parse(process.argv);
