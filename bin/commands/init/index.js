/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const logger = require('../../../src/logger');
const chalk = require('chalk').default;

const template = `import { Controller, Route } from 'hot-controller';

@Controller('/home')
export default class HomeController {
  @Route.GET('/')
  index(req, res) {
    // index
    res.send('Welcome');
  }
}
`;

module.exports = function() {
  const dir = path.resolve(process.cwd(), 'controllers');
  if (!fs.existsSync(dir)) {
    mkdirp(dir, err => {
      if (err) {
        console.error(err);
      } else {
        createControllerFile(dir, function(err) {
          if (err) {
            console.error(err);
          } else {
            logger(
              `${chalk.red('./controllers/home.js')} created. happy hacking!`
            );
          }
        });
      }
    });
  }
};

function createControllerFile(dir, cb) {
  fs.writeFile(path.resolve(dir, 'home.js'), template, cb);
}
