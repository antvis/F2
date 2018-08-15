#! /usr/bin/env bash
# compress
# compress the standard version
uglifyjs --compress --mangle --output dist/f2.min.js -- build/f2.js
# compress the common version
# uglifyjs --compress --mangle --output dist/f2-common.min.js -- build/f2-common.js
# compress the simple version
uglifyjs --compress --mangle --output dist/f2-simple.min.js -- build/f2-simple.js
# compress the full version
uglifyjs --compress --mangle --output dist/f2-all.min.js -- build/f2-all.js
