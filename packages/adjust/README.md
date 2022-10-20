# @antv/f2-adjust

## Installing

```bash
npm install @antv/f2-adjust
```

## Usage

```js
import { getAdjust } from '@antv/f2-adjust';

// contains Dodge, Jitter, Stack, Symmetric
const Dodge = getAdjust('dodge');

const d = new Dodge();

// adjust the data
const r = d.process();
```

## License

MIT
