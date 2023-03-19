import {Task, TasksState} from '../../types';

import moveOldTasksToArchive from './index';

// Some date constants to make life easier. We're using
// timestamps rather than date objects to keep the
// maths simple.
const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

// All tasks have a created date and a title. The
// completed time is optional. A task that has a missing
// or undefined completed field is not yet done.
const recentlyCompletedTask: Task = {
    created: START - ONE_MINUTE,
    title: 'A mighty task of spectacular derring-do',
    completed: START,
};

// We intend to pass START as our reference time. So we
// make an old task that completed 59 minutes ago.
const oldCompletedTask: Task = {
    created: START - ONE_HOUR,
    completed: START - ONE_HOUR + ONE_MINUTE,
    title: 'A task that should be archived',
};

// This is an example state for our application. The
// archive list is empty, but the active list contains
// our two example tasks.
const basicInput: TasksState = {
    active: [recentlyCompletedTask, oldCompletedTask],
    archive: [],
};

// After we run our archive function we expect the
// following output:
const expectedBasic: TasksState = {
    active: [recentlyCompletedTask],
    archive: [oldCompletedTask],
};

describe('moveOldTasksToArchive()', () => {
    it('should move the old item to the archive', () => {
        expect(moveOldTasksToArchive(basicInput, START)).toEqual(expectedBasic);
    });
});
