import moveOldTasksToArchive from './archive-tasks-01';

// Some date constants to make life easier. We're using
// timestamps rather than date objects to keep the
// maths simple.
const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

// All tasks have a created date and a title. The
// completed time is optional. A task that has a missing
// or undefined completed field is not yet done.
const recentlyCompletedTask = {
    created: START - ONE_MINUTE,
    title: 'A mighty task of spectacular derring-do',
    completed: START,
};

// We intend to pass START as our reference time. So we
// make an old task that completed 59 minutes ago.
const oldCompletedTask = {
    created: START - ONE_HOUR,
    completed: START - ONE_HOUR + ONE_MINUTE,
    title: 'A task that should be archived',
};

// This is an example state for our application. The
// archive list is empty, but the active list contains
// our two example tasks.
const basicInput = {
    active: [recentlyCompletedTask, oldCompletedTask],
    archive: [],
};

// After we run our archive function we expect the
// following output:
const expectedBasic = {
    active: [recentlyCompletedTask],
    archive: [oldCompletedTask],
};

// We should test the edge case for when the arrays
// are empty.
const emptyInput = {active: [], archive: []};

// And we'd also like to test the case where there's
// something already in the archive. So we'll create
// another old task…
const anotherOldTask = {
    created: START - ONE_HOUR,
    title: 'Another old completed task',
    completed: START - ONE_HOUR + ONE_MINUTE + ONE_MINUTE,
};

// …and put the old task into the archive to create a
// new input.
const populatedArchive = {
    active: [oldCompletedTask],
    archive: [anotherOldTask],
};
// This is the expected output for the case where the archive
// already has something in it.
const expectedPopulated = {
    active: [],
    archive: [oldCompletedTask, anotherOldTask],
};

// Jest's describe.each() method lets us arrange our tests into a table format,
// and gets rid of some repetition for us. This is convenient and looks much
// neater than sprawling lists of `it()` or `test()` function calls.
describe.each`
    description            | input               | date     | expected
-----------------------------------------------------------------------------
    ${'Basic example'}     | ${basicInput}       | ${START} | ${expectedBasic}
    ${'Empty arrays'}      | ${emptyInput}       | ${START} | ${emptyInput}
    ${'Populated archive'} | ${populatedArchive} | ${START} | ${expectedPopulated}
`('$description', ({input, date, expected}) => {
    test(`Given a sample state and date,
          when we run moveOldTasksToArchive(),
          it should return the expected output`, () => {
        expect(moveOldTasksToArchive(input, date)).toEqual(expected);
    });
});
