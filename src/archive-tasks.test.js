import * as fc from 'fast-check';
import moveOldTasksToArchive from './archive-tasks';

// Some date constants to make life easier. We're using
// timestamps rather than date objects just to keep the
// math simple.
const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

// // We create some example data. All tasks have, at minimum,
// // both a created date and a title. The completed time is optional.
// // A task that has a missing or undefined completed field is not
// // yet done.
// const recentlyCompletedTask = {
//     created: START - ONE_MINUTE + 1,
//     title: 'A mighty task of spectacular derring-do',
//     completed: START,
// };

// // We intend to pass START as our reference time. So we make an
// // old task that is was completed 59 minutes ago.
// const oldCompletedTask = {
//     created: START - ONE_HOUR,
//     completed: START - ONE_HOUR + ONE_MINUTE,
//     title: 'A task that should be archived',
// };

// // This is our basic input. We have an array of 'active' tasks, and
// // an array of 'archive' tasks. The active list has one task we
// // expect to stay in the active list, and one we expect to move.
// const basicInput = {
//     active: [recentlyCompletedTask, oldCompletedTask],
//     archive: [],
// };

// // After we run our archive function we expect the following
// // output:
// const expectedBasic = {
//     active: [recentlyCompletedTask],
//     archive: [oldCompletedTask],
// };

// // We should test the edge case for when the arrays are empty.
// const emptyInput = {active: [], archive: []};

// // And we'd also like to test the case where there's something
// // already in the archive. So we'll create another old task…
// const oldAbandonedTask = {
//     created: START - ONE_HOUR,
//     title: 'Another old task',
//     completed: START - ONE_HOUR + ONE_MINUTE + ONE_MINUTE,
// };

// // …and put the old task into the archive to create a new input.
// const populatedArchive = {
//     active: [oldCompletedTask],
//     archive: [oldAbandonedTask],
// };

// // This is the expected output for the case where the archive
// // already has something in it.
// const expectedPopulated = {
//     active: [],
//     archive: [oldCompletedTask, oldAbandonedTask],
// };

// describe.each`
//     description            | input               | date     | expected
// -----------------------------------------------------------------------------
//     ${'Basic example'}     | ${basicInput}       | ${START} | ${expectedBasic}
//     ${'Empty arrays'}      | ${emptyInput}       | ${START} | ${emptyInput}
//     ${'Populated archive'} | ${populatedArchive} | ${START} | ${expectedPopulated}
// `('$description', ({input, date, expected}) => {
//     test(`Given a sample state and date,
//           when we run moveOldTasksToArchive(),
//           it should return the expected output`, () => {
//         expect(moveOldTasksToArchive(input, date)).toEqual(expected);
//     });
// });

// Property-based tests
// ------------------------------------------------------------------------------------------------

// Generate a to-do item.
const genTodo = () => {
    return fc
        .record(
            {
                created: fc.date().map(d => d.getTime()),
                title: fc.string(),
                offset: fc.nat(),
            },
            {requiredKeys: ['created', 'title']}
        )
        .map(({created, title, offset}) => ({
            created,
            title,
            completed: offset !== undefined ? created + offset : undefined,
        }));
};

// Generate a task state.
const genTaskState = () =>
    fc.record({
        active: fc.array(genTodo()),
        archive: fc.array(genTodo()),
    });

describe('moveOldTasksToArchive()', () => {
    test(`GIVEN ANY valid task state and date
        WHEN we run moveOldTasksToArchive()
        THEN the total number of tasks SHOULD ALWAYS stay the same`, () => {
        const lengthProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
            const newState = moveOldTasksToArchive(s, dt.getTime());
            const actualLength = newState.active.length + newState.archive.length;
            const expectedLength = s.active.length + s.archive.length;
            expect(actualLength).toBe(expectedLength);
        });
        fc.assert(lengthProperty);
    });

    // test(`GIVEN ANY valid task and date
    //     WHEN we run moveOldTasksToArchive()
    //     THEN all the tasks in .active SHOULD ALWAYS be either
    //         incomplete, or, completed less than 60 seconds
    //         before the date`, () => {
    //     const allActiveRecentProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
    //         const newState = moveOldTasksToArchive(s, dt.getTime());
    //         expect(
    //             newState.active.some(
    //                 ({completed}) => completed !== undefined && dt - completed > ONE_MINUTE
    //             )
    //         ).toBe(false);
    //     });
    //     fc.assert(allActiveRecentProperty);
    // });

    // test(`GIVEN ANY valid task and date
    //     WHEN we run moveOldTasksToArchive()
    //     THEN there SHOULD NEVER be any tasks in the archive that weren't in the original state`, () => {
    //     const noNewTasksProperty = fc.property(genTaskState(), fc.date(), (s, dt) => {
    //         const {archive} = moveOldTasksToArchive(s, dt.getTime());
    //         expect(archive.every(task => s.archive.includes(task) || s.active.includes(task))).toBe(
    //             true
    //         );
    //     });
    //     fc.assert(noNewTasksProperty);
    // });
});
