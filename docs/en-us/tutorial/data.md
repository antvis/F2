# Data

Data is the most basic part of drawing a chart. The data format supported by F2 is standard JSON array.

## Data format

The data format that F2 receives is very simple: a standard JSON array where each array element is a standard JSON object.

Example:

```js
const data = [
  { gender: '男', count: 40 },
  { gender: '女', count: 30 }
];
```

## How to load data

```js
chart.source(data);
```

