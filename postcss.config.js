const purgecss = require("@fullhuman/postcss-purgecss");

const plugins = [
    require('postcss-preset-env')({
        browsers: 'last 2 versions',
    })
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    purgecss({
      content: [
        "./components/**/*.vue",
        "./views/**/*.vue"
      ],
      whitelist: ["html", "body"],
      //whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
    })
  );
}