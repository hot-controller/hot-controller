<p align="center">
  <img src="./logo.png" alt="Hot Controller" title="Hot Controller" width="600" />
</p>

[![Travis CI Build Status](https://travis-ci.org/hot-controller/hot-controller.svg?branch=master)](https://travis-ci.org/hot-controller/hot-controller)
[![npm](https://img.shields.io/npm/v/hot-controller.svg)](https://www.npmjs.com/package/hot-controller)
[![David Dependancy Status](https://david-dm.org/hot-controller/hot-controller.svg)](https://david-dm.org/hot-controller/hot-controller)
[![npm](https://img.shields.io/npm/l/hot-controller.svg)](https://github.com/hot-controller/hot-controller/blob/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/hot-controller/hot-controller.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hot-controller/hot-controller/blob/master/CONTRIBUTING.md)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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
  * [Configuration](#configuration) (optional)
    * [Options](#options)
    * [Config examples](#examples)
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

    app.use(hotControllers());
    ```

# Controllers

Create a directory in the root of your project called `controllers`

All files in this directory will be parsed as a controller with `hot-controller`.

### Example

`/controllers/home.js`

```js
const { Controller, Route } = require('hot-controller');

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

# Configuration

There are many ways to configure hot-controller:

* Create a `.controllersrc`

  * Support for `.json`, `.js`, `.yaml/.yml` (just append extension to `.controllersrc`, ex: `.controllersrc.yml`)

* Add `controllers` section to your `package.json` file.

## Options

```js
{
  /**
   * tell us where we should look for your controllers
   * type: string
   * default: ./controllers
   */
  "dir": ""

  /**
   * output directory of production compiled controllers
   * type: string
   * default: ./dist/controllers
   */
  "distDir": ""
}
```

## Examples

1.  via `.controllersrc`

    ```json
    {
      "dir": "./api",
      "distDir": "/dist/api-controllers"
    }
    ```

2.  in `package.json`

    ```js
    {
      ...

      "controllers": {
        "dir": "./api",
        "distDir": "/dist/api-controllers"
      },

      ...
      "dependencies": {
        ...
      }
    }
    ```

# Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/28024000?v=4" width="100px;"/><br /><sub><b>Philip Oliver</b></sub>](https://twitter.com/philipodev)<br />[💻](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Code") [📖](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Documentation") [🤔](#ideas-philipodev "Ideas, Planning, & Feedback") [👀](#review-philipodev "Reviewed Pull Requests") [⚠️](https://github.com/hot-controller/hot-controller/commits?author=philipodev "Tests") [🔧](#tool-philipodev "Tools") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
