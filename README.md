# Shortlinks Api GraphQL
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md)

# Table of Contents
* [Development](#development)
    * [Prerequisites](#Prerequisites)
    * [Running](#running)
    * [Contributing](#contributing)
* [Documentation](#documentation)
    * [Building](#building)
* [Codebase](#codebase)
    * [Structure](#structure)

# Development
> Information describing how to install and configure all the required tools to begin development.

## Prerequisites
Ensure that you have the following installed and configured any environment variables.

- **Git**
    - Version 2.20.1+
- **Node**
    - Version 10.15.0+

## Running
Run the following command to install all the required packages:
```bash
npm install
```

Start the GraphQL API server with live reload via `nodemon` using the following command:
```bash
npm start
```

## Contributing
Scriber welcomes contributions from anyone and everyone. Please see our [contributing guide](/CONTRIBUTING.md) for more info.

# Documentation
GraphQL documentation is build using [graphdoc](https://github.com/2fd/graphdoc).

## Building
First run start the GraphQL API server using the following command:
```bash
npm start
```

To build GraphQL documentation run the following command:
```bash
npm run build:docs
```

The documentation is now avaliable in the `docs` folder and can be viewed [here](/docs/index.html).

# Codebase
> Information describing the software architecture and how to maintain it while adding additional functionality.

## Structure
    .
    ├── ...
    ├── graphql                     # GraphQL data
    │    ├── resolvers              # GraphQL resolvers
    │    │   ├── index.js           # Root resolver file
    │    │   └── ...
    │    ├── schema                 # GraphQL schemas
    │    │   ├── index.js           # Root schema file
    │    │   └── ...
    │    └── ...
    ├── models                      # DB models
    │   └── ...
    ├── middlware                   # Helper middleware
    │   └── ...
    ├── app.js                      # Main server logic
    ├── config.js                   # Server config file
    └── ...
