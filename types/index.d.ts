import { Util } from './Util';

declare namespace F2 {
  export { Util };
}

export = F2;

// ==== src ====
declare module '@antv/f2/src/index-all.js' {
  export = F2;
}

declare module '@antv/f2/src/index-simple.js' {
  export = F2;
}

declare module '@antv/f2/src/index.js' {
  export = F2;
}

// ==== lib ====
declare module '@antv/f2/lib/index-all.js' {
  export = F2;
}

declare module '@antv/f2/lib/index-simple.js' {
  export = F2;
}

declare module '@antv/f2/lib/index.js' {
  export = F2;
}

// ==== build ====
declare module '@antv/f2/build/f2-all.js' {
  export = F2;
}

declare module '@antv/f2/build/f2-simple.js' {
  export = F2;
}

declare module '@antv/f2/build/f2.js' {
  export = F2;
}

// ==== dist ====
declare module '@antv/f2/dist/f2-all.min.js' {
  export = F2;
}

declare module '@antv/f2/dist/f2-simple.min.js' {
  export = F2;
}

declare module '@antv/f2/dist/f2.min.js' {
  export = F2;
}
