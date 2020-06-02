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

- [Install](#install)
- [Basic Example Usage](#basic-example-usage)
- [Special Credit](#special-credit)
- [Contributors](#contributors)
- [License](#license)

## Install

[npm][]:

```sh
npm install mongoose-monitor-fields-plugin
```

[yarn][]:

```sh
yarn add mongoose-monitor-fields-plugin
```

## Basic Example Usage

```js
const { Schema } = require('mongoose');
const monitorFields = require('mongoose-monitor-fields-plugin');

const mySchema = new Schema({
  my_field: {
    type: String,
    // set monitor true to have the change passed to the document level callback post save
    // or define a function for a field level callback post save
    monitor: console.log
  }
});

mySchema.plugin(monitorFields, console.log);

const MyModel = model('MySchema', mySchema);

(async () => {
  let myDocument = new MyModel({
    my_field: 'foo'
  });
  await myDocument.save();
  myDocument.my_field = 'bar';
  await myDocument.save();

  // prints the following to the console
  // for the field level callback
  // {path: 'my_field', prev: 'foo', updated: 'bar'}
  // for the document level
  // [{path: 'my_field', prev: 'foo', updated: 'bar'}]
})();
```

In either field level or document level callbacks - `this` refers to the newly updated document.

## Special Credit

This package was heavily influenced by [mongoose-plugin-diff](https://github.com/CentralPing/mongoose-plugin-diff)

## Contributors

| Name               | Website                    |
| ------------------ | -------------------------- |
| **Spencer Snyder** | <https://spencersnyder.io> |

## License

[MIT](LICENSE) © [Spencer Snyder](https://spencersnyder.io)

##

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
