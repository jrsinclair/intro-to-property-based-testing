# Code samples for: How to get started with property-based testing in JavaScript using fast-check

This is a repository containing sample code to accompany the article [How to get started with property-basted testing in JavaScript using fast-check](https://jrsinclair.com/articles/2021/how-to-get-started-with-property-based-testing-in-javascript-with-fast-check/).

To run the tests, clone the repo and run `yarn install` to install dependencies. Then `yarn test` should run Jest with the property tests. At the time of writing, this wasn't working in Node 17.

The setup uses Babel to transpile the test code so that import statements look like they would if you were writing React code.
