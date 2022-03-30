# Solver
[![codecov](https://codecov.io/gh/samwaters/solver/branch/master/graph/badge.svg?token=HXHN5WOD9C)](https://codecov.io/gh/samwaters/solver)  
Easily solve word puzzles
## Technical Notes
Built with `React`, `Redux`, `Sagas` and `styled-components`  
Suggestions are provided by WebWorkers to avoid locking up the UI thread  
Tested with `Jest` and `React-Testing-Library`  
Code formatting is enforced with `eslint`, `prettier` and `lint-staged`
## Prerequisites
- Node 16
- Yarn 1.22
## Installing
Run `yarn` to install dependencies
## Running in dev mode
Run `yarn start` to build in dev mode  
The project will be built with no optimisation, and will include sourcemaps.  
React and Redux devtools are enabled to support debugging.   
Once built, it will be available on [localhost:3000](http://localhost:3000)
## Building
Run `yarn build` to build in prod mode  
The project will be built with full optimisation, and will not include sourcemaps  
Artifacts will be placed in the `dist` folder ready for deployment
## Testing
Run `yarn test` to run the test suite
