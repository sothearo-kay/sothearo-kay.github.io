---
title: 'Using Union Types in TypeScript'
description: 'Learn how union types add flexibility to your TypeScript types.'
tags: ['typescript', 'types']
published: true
---

Union types allow a value to be one of several types.

## Example

```ts
type Status = 'loading' | 'success' | 'error';

function showStatus(status: Status) {
	if (status === 'loading') {
		console.log('Loading...');
	} else if (status === 'success') {
		console.log('Data loaded.');
	} else {
		console.log('Something went wrong.');
	}
}
```

## Use Cases

| Use Case      | Description                       |
| ------------- | --------------------------------- |
| API status    | Represent multiple loading states |
| Input options | Allow limited user input choices  |
| Flexibility   | Combine multiple accepted types   |
