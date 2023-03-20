# Coming up with properties

Here are some properties that would make it difficult to come up with an incorrect function:

## Example property 1

Our function should never change or remove any of our tasks. Hence all the tasks in the `.archive` list should be in one of the two lists from the old state.

```
GIVEN ANY valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN there
SHOULD NEVER be any tasks in the resulting archive that weren't in the original state.
```

## Example property 2

The whole aim of our `moveOldTasksToArchive()` function is to archive any tasks older than a minute. Hence, after we're run the function, there should not be any tasks in the archive with a completed date _older_ than a minute.

```
GIVEN any valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN all the tasks in `.active`
SHOULD ALWAYS be either incomplete, or, completed less than 60 seconds before the given date.
```

## Example property 3

Since we only ever move tasks from `.active` to `.archive`, the archive list should never get _shorter_.

```
GIVEN any valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN the length of `.archive` SHOULD NEVER decrease
```

## Example property 4

Since we only ever move tasks from `.active` to `.archive`, the active list should never get _longer_.

```
GIVEN any valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN the length of `.active` SHOULD NEVER increase
```