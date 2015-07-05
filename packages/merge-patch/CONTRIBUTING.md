CONTRIBUTING
============

JSON8 is written in ES5 for optimization concerns while test are written in ES6 and are transpiled on the fly.

1. ```npm install eslint mocha babel -g```
2. Edit the files in lib/, make sure to adopt the same coding style and include
3. Run ```npm test``` to execute unit tests and check syntax
4. Add unit test for your modifications
5. Submit a pull request

If you want to build the browser standalone version:
```
npm install webpack -g
npm run browserify
```
