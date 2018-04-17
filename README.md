# Labor-X
[![Build Status](https://travis-ci.org/ChronoBank/Labor-X.svg?branch=master)](https://travis-ci.org/ChronoBank/Labor-X) [![Coverage Status](https://coveralls.io/repos/github/ChronoBank/Labor-X/badge.svg?branch=master)](https://coveralls.io/github/ChronoBank/Labor-X?branch=master) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Launch in development environment

Build:
```
yarn install
```

Launch:
```
yarn dev
```

The app will be launched on the port 3001 by default.

## Launch in demo environment

Create network:
```
docker network create --driver=bridge --subnet=192.168.11.0/24 laborx-platform
```

Build docker image:
```
yarn docker:build
```

Start:
```
yarn docker:start

```
Restart:
```
yarn docker:restart
```

Stop:
```
yarn docker:stop
```

The app will be launched on the 192.168.11.0:3000
