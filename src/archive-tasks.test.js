// import * as fc from "fast-check";
import moveOldTasksToArchive from './archive-tasks';

// const genTodo = () =>
//   fc.tuple(fc.date(), fc.nat()).chain((dt, offset) =>
//     fc.record(
//       {
//         created: fc.constant(dt.valueOf()),
//         completed: fc.constant(dt.valueOf() + offset),
//         title: fc.string()
//       },
//       { requiredKeys: ["created", "title"] }
//     )
//   );

// const genTaskState = () =>
//   fc.record({
//     active: fc.array(genTodo),
//     archive: fc.array(genTodo)
//   });

const basicInput = {
    active: [
        {created: 1636521855000, title: 'some todo'},
        {
            created: 1636518194999,
            completed: 1636521794999,
            title: 'should be archived',
        },
    ],
    archive: [],
};

const expectedBasic = {
    active: [{created: 1636521855000, title: 'some todo'}],
    archive: [
        {
            created: 1636518194999,
            completed: 1636521794999,
            title: 'should be archived',
        },
    ],
};

describe.each`
    description        | input         | date             | expected
-----------------------------------------------------------------------------
    ${'Basic example'} | ${basicInput} | ${1636521855000} | ${expectedBasic}
`('$description', ({input, date, expected}) => {
    return expect(moveOldTasksToArchive(input, date)).toEqual(expected);
});

// describe("moveOldTasksToArchive()", () => {
//   test(
//     "Given a task state s, and date dt, after calling, no completed todos in s.active should be older than 60 seconds before date dt"
//   );
//   test(
//     "For any task state s, and date dt, the total number of tasks should not change"
//   );
//   test(
//     "For any task state s, and date dt, after running, there should be no new tasks in s.archive that did not come from the original active list"
//   );
// });
