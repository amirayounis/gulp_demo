const htmlmin = require('gulp-htmlmin');
const { src ,dest, series, parallel,watch} = require('gulp');
const minJs=require("gulp-terser");
const concat = require("gulp-concat");
//////// HTML
function Htmlmin(){
    return src("src/*.html").pipe(htmlmin({ collapseWhitespace: true ,removeComments:true})).pipe(dest("production"));
}
exports.html=Htmlmin;
////////// JS

function JSMinfy() {
  return src("src/Js/*.js").pipe(concat("script.js"))
  .pipe(minJs())
  .pipe(dest("production/Js"));
}
exports.js=JSMinfy;
const imgMin=require("gulp-imagemin");
function imgsMinify() {
  return src("src/Images/*").pipe(imgMin())
  .pipe(dest("production/Images"));
}
exports.img=imgsMinify;
const cssMin=require("gulp-clean-css");
function cssMinfy() {
  return src("src/Css/**/*.css").pipe(concat("style.css"))
  .pipe(cssMin()).pipe(dest("production/Css"));
}
exports.css=cssMinfy;

function watchTask() {
  watch(["src/Css/**/*.css","src/*.html","src/Js/*.js"],{interval:1000}, parallel(cssMinfy,Htmlmin,JSMinfy));
}


exports.default=series(parallel(JSMinfy,cssMinfy,Htmlmin),watchTask);
// exports.default=series(JSMinfy,cssMinfy,Htmlmin);
