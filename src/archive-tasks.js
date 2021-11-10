const ONE_MINUTE = 60000;

const moveOldTasksToArchive = ({active, archive}, currentTime) => ({
    active: active.filter(({completed}) => !completed || currentTime - completed < ONE_MINUTE),
    archive: active.filter(({completed}) => currentTime - completed >= ONE_MINUTE).concat(archive),
});

export default moveOldTasksToArchive;
