// The course answers (solution*.txt) are TSX kept as text. Tests compile them like source so each
// exercise can be rendered; every other non-code file goes to Create React App's file transform.
const babel = require("react-scripts/config/jest/babelTransform");
const file = require("react-scripts/config/jest/fileTransform");

module.exports = {
  process(src, filename, ...rest) {
    if (filename.endsWith(".txt"))
      return babel.process(src, `${filename}.tsx`, ...rest);
    return file.process(src, filename, ...rest);
  },
};
