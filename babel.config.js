const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        chrome: "52",
        firefox: "44",
        safari: "7",
        ie: "10"
      }
    },
  ],
];

module.exports = { presets};