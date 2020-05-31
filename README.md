# mongoose-monitor-fields-plugin

[![build status](https://img.shields.io/travis/com/Spence-s/mongoose-monitor-fields-plugin.svg)](https://travis-ci.com/Spence-s/mongoose-monitor-fields-plugin)
[![code coverage](https://img.shields.io/codecov/c/github/Spence-s/mongoose-monitor-fields-plugin.svg)](https://codecov.io/gh/Spence-s/mongoose-monitor-fields-plugin)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/Spence-s/mongoose-monitor-fields-plugin.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/mongoose-monitor-fields-plugin.svg)](https://npm.im/mongoose-monitor-fields-plugin)

> monitor and respond to changes in your documents!


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install mongoose-monitor-fields-plugin
```

[yarn][]:

```sh
yarn add mongoose-monitor-fields-plugin
```


## Usage

```js
const MongooseMonitorFieldsPlugin = require('mongoose-monitor-fields-plugin');

const mongooseMonitorFieldsPlugin = new MongooseMonitorFieldsPlugin();

console.log(mongooseMonitorFieldsPlugin.renderName());
// script
```


## Contributors

| Name               | Website                    |
| ------------------ | -------------------------- |
| **Spencer Snyder** | <https://spencersnyder.io> |


## License

[MIT](LICENSE) © [Spencer Snyder](https://spencersnyder.io)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
