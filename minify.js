const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');


console.log("minify...");
minify({
    compressor: cleanCSS,
    input: 'style.css',
    output: 'style.min.css',
    callback: function (err, min) { }
});
console.log("minify finished");
