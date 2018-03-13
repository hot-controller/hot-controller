# Contributing

We're very happy to receive any kind of contribution and below is a quick guide to get started.

## Issues
If you find any bugs or incompability, first search if there is any [open or closed issue](https://github.com/hot-controller/hot-controller/issues?utf8=%E2%9C%93&q=is%3Aissue). If not, please submit your issue with any logs and config.

## Setup

When forked and cloned.
1) `npm install -g yarn`
2) `yarn install` (we recommend using yarn)
3) Make your changes or additions
4) `yarn link`
<!-- 5) `yarn link hot-controller`-->

### Run tests
* `yarn test`

### (optional) Try your local changes on a project using npm link

1) Create a new folder (with any name, ex: `test-controllers`) anywhere on your computer. 
2) Create a folder called `controllers` inside it and add a controller to it (ex: `controllers/home.js`)
3) In the root of `test-controllers` now run `hot-controller`
4) A server with the controllers in your `controllers` folder will start up using your local hot-controller.

## Before submitting a PR.
1) Make sure the test passes in your local project `yarn test`
2) If you made additions that needs to be tested please write a test if possible.
3) Follow the existing coding style
