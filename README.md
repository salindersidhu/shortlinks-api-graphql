# Shortlinks Api GraphQL
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE.md)

# Table of Contents
* [Development](#development)
    * [Prerequisites](#Prerequisites)
    * [Running](#running)
    * [Contributing](#contributing)
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
Shortlinks Api GraphQL welcomes contributions from anyone and everyone. Please see our [contributing guide](/CONTRIBUTING.md) for more info.

# Codebase
> Information describing the software architecture and how to maintain it while adding additional functionality.

## Structure
    .
    ├── ...
    ├── graphql                     # GraphQL source data
    │    ├── resolvers              # GraphQL resolvers
    │    │   ├── index.js           # Root resolver
    │    │   └── ...
    │    ├── typedefs               # GraphQL typedefs
    │    │   ├── index.js           # Root typedef
    │    │   └── ...
    │    └── ...
    ├── models                      # DB models
    │   ├── ...
    │   └── index.js                # DB models index
    ├── utils                       # Utility functions
    │   ├── auth-token.js           # Authentication token utils
    │   ├── validators.js           # Server side form input validators
    │   └── ...
    ├── index.js                    # Main server logic
    ├── config.js                   # Server config
    ├── .eslintrc.json              # Eslint file
    └── ...
