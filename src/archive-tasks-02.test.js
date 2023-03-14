import * as fc from 'fast-check';
import moveOldTasksToArchive from './archive-tasks-01';

// Some date constants to make life easier. We're using timestamps
// rather than date objects to keep the maths simple.
const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

// This will create an arbitrary that represents random
// strings.
const titleArb = fc.string();

// We first create a date arbitrary, then use a .map()
// method to convert the generated date to a timestamp
// in epoch milliseconds.
const createdArb = fc.date().map(d => d.getTime());

// This offset arbitrary will represent the _difference_
// between the start date and the completed date. We use
// fc.nat() to ensure that this offset is always a
// positive integer (or zero).
const offsetArb = fc.nat();

// Our fc.record() generator function takes an options
// object as its second parameter. In this case, we tell
// it that title and created properties are required.
// This implies that offset is optional.
const taskArb = fc
    .record(
        {
            title: titleArb,
            created: createdArb,
            offset: offsetArb,
        },
        {requiredKeys: ['created', 'title']}
    )
    .map(({created, title, offset}) => ({
        created,
        title,
        // If offset is undefined, leave completed as
        // undefined. Otherwise, add the offset to created.
        completed: offset !== undefined ? created + offset : undefined,
    }));

// Our state is an object which contains arrays for
// for active and archived tasks. By default, fc.array()
// will generate arrays of up to 100 items in length.
// But we can adjust that figure by passing an options
// object.
const stateArb = fc.record(
    {
        active: fc.array(taskArb),
        archive: fc.array(taskArb),
    },
    {required: ['active', 'archive']}
);

// Our moveOldTasksToArchive() function expects a
// current time parameter as well as a state parameter.
const currentTimeArb = fc.date().map(d => d.getTime());

// Create a property that we will assert. Creating the
// property does not run the test. We need a 'runner'
// for that. But it describes how to check that the
// property holds.
const lengthProperty = fc.property(stateArb, currentTimeArb, (state, currentTime) => {
    // Run the function with the generated state and
    // and current time.
    const newState = moveOldTasksToArchive(state, currentTime);

    // Measure the total number of tasks before and
    // after running the test.
    const expectedLength = state.active.length + state.archive.length;
    const actualLength = newState.active.length + newState.archive.length;

    // Check that both are the same.
    expect(actualLength).toBe(expectedLength);
});

describe('moveOldTasksToArchive()', () => {
    test(`GIVEN ANY valid task state and date
        WHEN we run moveOldTasksToArchive()
        THEN the total number of tasks SHOULD ALWAYS stay the same`, () => {
        fc.assert(lengthProperty);
    });
});
