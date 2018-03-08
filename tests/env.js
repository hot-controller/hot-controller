const NodeEnvironment = require('jest-environment-node');
const express = require('express');

class ControllerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    this.global.__APP__ = express();
    this.global.__COMPILERS__ = [];
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = ControllerEnvironment;
