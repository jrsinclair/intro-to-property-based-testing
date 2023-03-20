# Don't write tests; generate them! Property based testing with fast-check workshop

This package contains exercises and code samples for a workshop on property-based testing. They're designed to be run through with a workshop facilitator, but you could probably run through them on your own with a bit of effort.

## Instructions

1. Checkout the package to your local machine.

   ```
   git checkout git@github.com:jrsinclair/intro-to-property-based-testing.git
   cd intro-to-property-based testing
   ```

2. Run `yarn` to install dependencies.

    ```
    yarn install
    ```

3. Navigate to `src/exercises` and write your first test. The test file contins instructions written as code comments. Once you've got a test written, you can run it using `jest`. To run tests for exercise 1, for example, use the command `yarn test src/ex01`.

## The scenario

To provide something concrete to work on, the execrises assume a hypothetical scenario., let's suppose we're working on some kind of HR application. The app shows people a list of tasks, and people can mark them completed as they go. We've been asked to add a feature that hides completed tasks after a set amount of time (say, a minute). Hence, we want to write a function, `moveOldTasksToArchive()`, that updates the state of our application.

## More information

If you're new to propert-based testing, you can find [a step-by-step walkthrough on my website](https://jrsinclair.com/articles/2021/how-to-get-started-with-property-based-testing-in-javascript-with-fast-check/)