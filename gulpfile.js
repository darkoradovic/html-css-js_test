import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as nodeSass from "sass";
import prefix from "gulp-autoprefixer";
import browserSync from "browser-sync";
import babel from "gulp-babel";
import terser from "gulp-terser";
import imagemin from "gulp-imagemin";
import imagewebp from "gulp-webp";
import minify from "gulp-clean-css";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";

const { src, dest, watch, series } = gulp;

const sass = gulpSass(nodeSass);

function html() {
  return src("src/*.html").pipe(dest("dist")).pipe(browserSync.stream());
}

function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function optimizeimg() {
  return src("src/images/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 80, progressive: true }),
        imageminOptipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"))
    .pipe(browserSync.stream());
}

function webpImage() {
  return src("dist/images/*.{jpg,png,svg}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

function jsmin() {
  return src("src/js/*.js")
    .pipe(terser())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

// Start the development server
function serve() {
  browserSync.init({
    server: "./dist",
  });

  watch("src/*.html", html).on("change", browserSync.reload);
  watch("src/scss/**/*.scss", compilescss);
  watch("src/js/*.js", jsmin);
  watch("src/images/*", optimizeimg);
  watch("dist/images/*.{jpg,png}", webpImage);
}

export default series(compilescss, html, jsmin, optimizeimg, webpImage, serve);
