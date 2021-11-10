export default {
  pkgs: [
    "graphic",
    "f2",
    "react",
  ],
  cjs: {
    type: "babel",
  },
  esm: {
    type: "babel",
  },
  runtimeHelpers: true,
  lessInBabelMode: true,
  cssModules: true,
};
