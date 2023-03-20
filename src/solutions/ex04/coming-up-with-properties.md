# Coming up with properties

Here are some properties that would make it difficult to come up with an incorrect function:

## Example property 1

```
GIVEN ANY valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN there
SHOULD NEVER be any tasks in the archive that weren't in the original state.
```

## Example property 2

```
GIVEN any valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN all the tasks in `.active`
SHOULD ALWAYS be either incomplete, or, completed less than 60 seconds before the given date.
```

## Example property 3

```
GIVEN any valid tasks state and date
WHEN we run `moveOldTasksToArchive()`
THEN all the tasks in `.archive`
SHOULD ALWAYS be complete
```