import {TasksState} from '../../types';

// Some date constants to make life easier. We're using timestamps rather than date objects to keep
// the math simple.
const ONE_MINUTE = 60000;

// We rebuild the state using two filter operations. One keeps anything that has a completed date
// newer than one minute. The other keeps anything that has a completed date older than one minute.
const moveOldTasksToArchive = ({active, archive}: TasksState, currentTime: number) => ({
    active: active.filter(({completed}) => currentTime - (completed ?? 0) < ONE_MINUTE),
    archive: active
        .filter(({completed}) => currentTime - (completed ?? 0) >= ONE_MINUTE)
        .concat(archive),
});

export default moveOldTasksToArchive;
