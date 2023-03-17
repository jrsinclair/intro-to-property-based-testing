import {TasksState} from '../../types';

const moveOldTasksToArchive = (tasks: TasksState, start: number) => ({
    active: [
        {
            created: 1636521795000,
            title: 'A mighty task of spectacular derring-do',
            completed: 1636521855000,
        },
    ],
    archive: [
        {
            created: 1636518255000,
            completed: 1636518315000,
            title: 'A task that should be archived',
        },
    ],
});

export default moveOldTasksToArchive;
