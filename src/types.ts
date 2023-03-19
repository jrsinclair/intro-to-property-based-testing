export type Task = {
    created: number;
    completed?: number;
    title: string;
};

export type TasksState = {
    archive: Task[];
    active: Task[];
};
