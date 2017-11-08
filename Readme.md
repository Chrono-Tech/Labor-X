# Labor-X [![Build Status](https://travis-ci.org/ChronoBank/Labor-X.svg?branch=master)](https://travis-ci.org/ChronoBank/Labor-X) [![Coverage Status](https://coveralls.io/repos/github/ChronoBank/Labor-X/badge.svg?branch=master)](https://coveralls.io/github/ChronoBank/Labor-X?branch=master)

Проект исользует [Rispa](https://github.com/rispa-io/rispa-core)

Для работы нужно установить [Rispa CLI](https://www.npmjs.com/package/@rispa/cli)
```bash
yarn global add @rispa/cli@latest
```

## Разработка
Запуск dev. сервера

```start
yarn start
```

или

```bash
ris server start-dev
```

## Тестирование
Для запуска тестирования используется команда

```
yarn test
```

Для запуска в режиме покрытия 

```
yarn test:coverage
```

## Сборка
Для запуска сборки используется команда

```bash
yarn build
```

или

```bash
ris webpack build
```

## Storybook
Для запуска storybook'а используется команда

```bash
yarn storybook
```

или

```bash
ris ui storybook
```

## Генераторы
Для запуска генераторов используется команда

```bash
ris g
```

### Плагин фича
Для создания фичи с роутом используется команда

```bash
ris g feature-plugin
```

или без роута

```bash
ris g feature-plugin-without-route
```

### UI компоненты
Для создания компонентов используются команды 

#### Атом
```bash
yarn make-atom
```

или

```bash
ris g atom @rispa/ui-kit
```

#### Молекула

```bash
yarn make-molecule
```

или

```bash
ris g molecule @rispa/ui-kit
```

## Конфиг
Конфиг проекта находится в `packages/rispa-react-config/index.js`

Содержит информацию о сервере, `output` директории и генерирующемых статических страниц

## Environment variables
Вы можете конфигурировать проект используя environment variables.

### Server Port
Если Вам нужно модифицировать server port, Вы можете указать `PORT`

Mac and Linux:
```bash
PORT=4000
```

Windows:
```bash
set PORT=4000
```

### Анализатор бандла
Если Вам нужно включить анализатор бандла, Вы можете указать `ANALYZE_BUNDLE` равный `true`

Mac and Linux:
```bash
ANALYZE_BUNDLE=true
```

Windows:
```bash
set ANALYZE_BUNDLE=true
```

### Offline режим
Если Вам нужно отключить offline режим, Вы можете указать `DISABLE_OFFLINE` равный `true`

Mac and Linux:
```bash
DISABLE_OFFLINE=true
```

Windows:
```bash
set DISABLE_OFFLINE=true
```

### React dev tools
Если Вам нужно отключить React dev-tools, Вы можете указать `DISABLE_REACT_DEVTOOLS` равный `true`

Mac and Linux:
```bash
DISABLE_REACT_DEVTOOLS=true
```

Windows:
```bash
set DISABLE_REACT_DEVTOOLS=true
```

### Redux dev tools
Если Вам нужно отключить Redux dev-tools, Вы можете указать `DISABLE_REDUX_DEVTOOLS` равный `true`

Mac and Linux:
```bash
DISABLE_REDUX_DEVTOOLS=true
```

Windows:
```bash
set DISABLE_REDUX_DEVTOOLS=true
```