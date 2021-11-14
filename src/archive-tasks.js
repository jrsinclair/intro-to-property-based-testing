const ONE_MINUTE = 60000;

// Take a function and transform it so that it returns the boolean
// negation.
const not = f => x => !f(x);

// Take the current time and a task, and determine if this is an
// old task that should be archived.
const isOldTask = currentTime => task => {
    return task.completed !== undefined && currentTime - task.completed > ONE_MINUTE;
};

const moveOldTasksToArchive = ({active, archive}, currentTime) => ({
    active: active.filter(not(isOldTask(currentTime))),
    archive: active.filter(isOldTask(currentTime)).concat(archive),
});

export default moveOldTasksToArchive;
