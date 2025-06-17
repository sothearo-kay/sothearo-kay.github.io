---
title: 'Understanding TypeScript Interfaces'
description: 'A brief introduction to TypeScript interfaces with an example.'
tags: ['typescript', 'interfaces']
published: true
image: https://www.ghibli.jp/images/thumb-neko1.jpg
---

Interfaces in TypeScript are a powerful way to define the structure of an object.

## Example

```ts
interface Product {
	id: number;
	name: string;
	// [!code highlight:2]
	price: number;
	inStock: boolean;
}

const book: Product = {
	id: 1,
	name: 'TypeScript Handbook',
	price: 29.99,
	inStock: true
};

console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]
console.log('goodbye');
```

## Benefits

| Feature        | Benefit                          | Example                               | Related Tools/Concepts      |
| -------------- | -------------------------------- | ------------------------------------- | --------------------------- |
| Type safety    | Catch errors at compile time     | `user.age = "twenty"` → compile error | TypeScript, Flow            |
| Autocompletion | Better developer experience      | IDE suggests `user.name`              | VS Code, IntelliSense       |
| Reusability    | Use the interface in many places | Shared `User` interface across files  | TypeScript interfaces/types |
