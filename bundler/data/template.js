module.exports = blocks => `
const F2 = require('./core'); // 核心包
F2.Plugin = {};
${blocks}
module.exports = F2;
`;
