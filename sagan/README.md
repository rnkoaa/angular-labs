
## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**.

```bash
npm install
npm start
```

> If the `typings` folder doesn't show up after `npm install` please install them manually with:

> `npm run typings -- install`

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

You're ready to write your application.

### npm scripts

We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run lite` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.
* `npm run typings` - runs the typings tool.
* `npm run postinstall` - called by *npm* automatically *after* it successfully completes package installation. This script installs the TypeScript definition files this app requires.
Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run e2e` - run protractor e2e tests, written in JavaScript (*e2e-spec.js)

## Testing

# sagan
A simple angular 2 application that explores many facets of the new framework.


## Install npm packages and start the server
```bash
    npm install
    npm start.
```

This should start the server. 

Additionally this uses a local [json-server](https://github.com/typicode/json-server) to server sample json files 
to simulate the backend. 

To start the server, you need both docker for windows/docker for mac installed. 
Also install docker-compose.

1. cd into the data directory <br />
```bash
    cd data
```

2. Run  the application via docker-compose
```bash
    docker-compose up -d
```

3. Ensure docker is running by looking at the currently running docker containers
```bash
    docker ps -a
    verify that json-server container is running.
```

//  docker run -d -p 80:80 -v /home/user/articles.json:/data/db.json clue/json-server
