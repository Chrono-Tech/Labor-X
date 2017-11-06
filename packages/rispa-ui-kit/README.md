# Rispa UI-Kit [![Build Status](https://api.travis-ci.org/rispa-io/rispa-ui-kit.svg?branch=master)](https://travis-ci.org/rispa-io/rispa-ui-kit)

* [User Guide](https://github.com/rispa-io/rispa-core) – How to develop apps bootstrapped with **Rispa**.


## Structure

The project is organized on the principles of [atomic design](http://atomicdesign.bradfrost.com/chapter-2/),
therefore, only atoms and molecules are represented in the plugin, the most basic building blocks of the application.

## Development

Development is going around Storybook.
For launch Storybook, run:
```sh
ris ui sb
```

After build will be available on `http://localhost:9001`

## Testing
For launch testing, run:
```
ris ui test
```
For launch testing in watch mode, run:
```
ris ui test:watch
```
