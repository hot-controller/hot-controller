<p align="center">
  <img src="./logo.png" alt="Hot Controller" title="Hot Controller" width="600" />
</p>

[![Travis CI Build Status](https://travis-ci.org/hot-controller/hot-controller.svg?branch=master)](https://travis-ci.org/hot-controller/hot-controller)
[![Build status](https://ci.appveyor.com/api/projects/status/nu04v0v3vo4tgj0u?svg=true)](https://ci.appveyor.com/project/philipodev/hot-controller)
[![codecov](https://codecov.io/gh/hot-controller/hot-controller/branch/master/graph/badge.svg)](https://codecov.io/gh/hot-controller/hot-controller)
[![npm](https://img.shields.io/npm/v/hot-controller.svg)](https://www.npmjs.com/package/hot-controller)
[![David Dependancy Status](https://david-dm.org/hot-controller/hot-controller.svg)](https://david-dm.org/hot-controller/hot-controller)
[![npm](https://img.shields.io/npm/l/hot-controller.svg)](https://github.com/hot-controller/hot-controller/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hot-controller/hot-controller/blob/master/CONTRIBUTING.md)

# Features [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?text=&url=https://github.com/hot-controller/hot-controller&hashtags=nodejs,express,controller)

* 🔧 Zero configuration needed to get started.
* 🔥 **hot module replacement** on your controllers
* 🍾 `async`/`await` support
* ⚙️ Use as middleware with `express` or standalone.

### TOC

* [How to use](#hot-to-use)
  * [Setup](#setup)
    * [CLI](#cli)
    * [Locally in project](#locally-in-project)
    * [With existing `express` application](#with-existing-express-application)
  * [Controllers](#controllers)
    * [Example](#example)
  * [Plugins](#plugins)
    * [Typescript](#typescript)
    * [Write your own plugin](#write-your-own-plugin)
  * [Hooks](#hooks)
    * [Before](#before)
    * [After](#after)
  * [Configuration](#configuration) (optional)
    * [Options](#options)
    * [Config examples](#examples)
    * [Custom Babel Config](#custom-babel-config)
  * [Contributors](#contributors)

# Setup

## Installation

### CLI

`npm install -g hot-controller`

or

`yarn global add hot-controller`

### Locally in project

1.  `npm install hot-controller --save` or `yarn add hot-controller`
2.  in your `package.json` add the following:
    ```js
    "scripts": {
      ...
      "start": "hot-controller serve",
      "dev": "hot-controller"
    }
    ```

### With existing `express` application

1.  `npm install hot-controller --save` or `yarn add hot-controller`
2.  Add the middleware to existing `express`:

    ```javascript
    const hotControllers = require('hot-controller/middleware');

    ...

    app.use(hotControllers(/* (optional) options */));
    ```

# Controllers

Create a directory in the root of your project called `controllers`

All files in this directory will be parsed as a controller with `hot-controller`.

### Example

`/controllers/home.js`

```js
import { Controller, Route } from 'hot-controller';

// which path it should reside on
@Controller('/api')
export default class HomeController {
  // declare your methods below

  @Route.GET('/') // matches /api
  index(req, res) {
    //
    res.send('Welcome');
  }

  @Route.GET('/about')
  users(req, res) {
    // redirect user to somewhere else
    res.redirect('/somewhere-else');
  }

  @Route.GET('/users/:id') // matches /api/users/:id
  async user(req, res) {
    // this is a async method
    const user = await getUserById(req.params.id); // get the user data
    // send it as json
    res.json({
      user
    });
  }
}
```

Get more examples in our [examples](https://github.com/hot-controller/examples) repo

# Plugins

`hot-controller` fully supports plugins and is easily activatable in your config.

We follow the "babel plugin naming scheme". (`hot-controller-plugin-[PLUGIN_NAME]`) and later in your `.controllersrc` (or what configuration method you're using) add `"plugins": [ "plugin-name" ]`

## Typescript

To write your controllers in `typescript` please checkout our very own plugin [hot-controller-plugin-typescript)(https://github.com/hot-controller/hot-controller-plugin-typescript)

## Write your own plugin

Writing a plugin for `hot-controller` is very simple. All it takes is a function.

```javascript
module.exports = function(events) {
  events.on('before-controller', router => {
    // before any controllers will be loaded
    // using "router" argument you can add plugin specific routes or add an express middleware.
  });

  events.on('after-controller', (router, controllers) => {
    // after all controllers has been added to the router
    // its now perfect time to add some error handlers or routes that will not conflict with controllers.
  });
};
```

# Hooks

Your controllers can be even more controlled via hooks. Read more below for `[before](#before)` and `[after](#after)`

## Before

```javascript
@Controller('/')
class Controller {
  async before(req, res, next) {
    // check acl, push to logs or whatever needed to do before we continue the request

    next(); // dont forget this if you want to continue the request.
  }
}
```

## After

```javascript
@Controller('/')
class Controller {
  after() {
    // nothing more to do,
    // request already sent to client. but maybe you want to log something.
  }
}
```

# Configuration

There are many ways to configure hot-controller:

* Create a `.controllersrc.json`

  * Support for `.json`, `.json5`, `.yaml/.yml` (just append extension to `.controllersrc`, ex: `.controllersrc.yml`)

* Add `controllers` section to your `package.json` file.

## Options

```js
{
  /**
   * where is your controllers?
   * type: string
   * default: ./controllers
   */
  "dir": "",

  /**
   * use plugins
   * type: string[], func[]
   */
  "plugins": []
}
```

## Examples

1.  via `.controllersrc.json`

    ```json
    {
      "dir": "./api"
    }
    ```

2.  in `package.json`

    ```js
    {
      ...

      "controllers": {
        "dir": "./api",
      },

      ...
    }
    ```

## Custom Babel Config

`hot-controller` allows for custom `.babelrc` for your controllers. _This file is optional._

In order to extend our usage of babel, you can simply define a `.babelrc` file at the root of your app or in your `controllers` directory.

# Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/28024000?v=4" width="100px;"/><br /><sub><b>Philip Oliver</b></sub>](https://twitter.com/philipodev)<br />[💻](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Code") [📖](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Documentation") [🤔](#ideas-philipodev "Ideas, Planning, & Feedback") [👀](#review-philipodev "Reviewed Pull Requests") [⚠️](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Tests") [🔧](#tool-philipodev "Tools") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
