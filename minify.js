const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');


console.log("minify...");
minify({
    compressor: cleanCSS,
    input: 'root/style.css',
    output: 'root/style.min.css',
    callback: function (err, min) { }
});
console.log("minify finished");
