#!/usr/bin/env node
/* eslint-disable no-console */

const pkg = require('../package.json');
const program = require('commander');
const logger = require('../src/logger');

program.version(pkg.version);

program
  .command('serve')
  .option('-p, --port <n>', 'Port to host', parseInt)
  .action(serve);

program
  .command('dev')
  .option('-p, --port <n>', 'Port to host', parseInt)
  .action(function(options) {
    serve(options, true);
  });

program.command('init').action(function(options) {
  require('./commands/init')(options);
});

program
  .command('build')
  .option('-o, --output <dir>', 'Output directory')
  .option('-i, --input <dir>', 'Input directory')
  .action(function(options) {
    require('./commands/build')(options);
  });

program.command('build').action(function() {});

// make "dev" the default command
let args = process.argv;
if (!args[2] || !program.commands.some(c => c.name() === args[2])) {
  args.splice(2, 0, 'dev');
}

program.parse(args);

function serve(options, _dev = false) {
  try {
    if (!_dev) {
      process.env.NODE_ENV = 'production';
      logger('Starting server in production mode');
    } else {
      logger(
        'Starting server in dev mode with hot module replace on controllers'
      );
    }

    const { port = 3000 } = options;
    const server = require('./server');

    server({ port, dev: _dev });
  } catch (e) {
    throw e;
  }
}
