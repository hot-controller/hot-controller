const NodeEnvironment = require('jest-environment-node');
const express = require('express');

class ControllerEnvironment extends NodeEnvironment {
  setup() {
    super.setup().then(() => {
      this.global.__APP__ = express();
      this.global.__COMPILERS__ = [];
    });
  }
}

module.exports = ControllerEnvironment;
