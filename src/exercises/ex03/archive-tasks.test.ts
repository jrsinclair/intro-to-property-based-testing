import * as fc from 'fast-check';
import {Task, TasksState} from '../../types';

type Arbitrary<T> = fc.Arbitrary<T>;

// In this exercise, we will create generators for our data using fast-check Arbitraries, then write
// a single property test. You can find reference information for arbitraries in the
// [fast-check API documentation](https://github.com/dubzzz/fast-check/blob/main/packages/fast-check/documentation/Arbitraries.md).

//
// Simple data generators
// ------------------------------------------------------------------------------------------------

// Create an arbitrary that will generate a task title for us. A task title can be any string. (Or
// can it?)
// const titleArb: Arbitrary<string> = ??????

// Create an arbitrary that will generate a task creation date for us. A task creation date is a
// number representing epoch milliseconds. The number must map to a valid date. You may be
// be interested to know that we can
// [transform arbitraries](https://github.com/dubzzz/fast-check/blob/main/packages/fast-check/documentation/Arbitraries.md#array)
// const createdDateArb: Arbitrary<number> = ??????

// We eventually want to create an arbitrary that will provide compelted dates for us. But we have
// a problem. A completed date should always be ≥ creation date. So, we don't know what a valid
// completion date will be, unless we're given a creation date.
//
// To work around this, we'll come at the problem laterally. Instead of creating a completed date,
// instead we'll create a number that represents the number of milliseconds _after_ creation that
// our task is completed. We can then add that number to our creation date to get a completion date.
//
// Create an arbitrary to represent a number of milliseconds that's always greater than zero.
// const offsetArb: Arbitrary<number> = ?????

// Create an arbitray to represent the start date. Remember, again, this is a timestamp, not a Date.
// const startDate: Arbitrary<number> = ????

//
// Compound data generators
// ------------------------------------------------------------------------------------------------

// Create an arbitrary to represent a valid task. It needs to have a title, a creation date, and an
// optional completed date. We may need to make use of .map() to convert our offset into a timestamp.
// const taskArb: Arbitrary<Task> = ????

// Create an arbitrary to represent our Todo app state. The todo app state has two properties:
// 1. A list of current tasks; and
// 2. A list of archived tasks.
// const stateArb: Arbitrary<TasksState> = ????

//
// Property test
// ------------------------------------------------------------------------------------------------

describe('moveOldTasksToArchive()', () => {
    test(`GIVEN ANY valid tasks state and date
        WHEN we run moveOldTasksToArchive()
        THEN the total number of tasks SHOULD ALWAYS stay the same`, () => {
        // Create your property test here. It should check that the  total number of tasks does not
        // change.
    });
});
