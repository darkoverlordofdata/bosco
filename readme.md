# Bosco 

![Bosco] (https://github.com/darkoverlordofdata/bosco/raw/master/web/res/favicon.png)


           __  __         ___                            ___  ___
          / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
         / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
         \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/

Bosco is not a game engine.
Bosco is...
* A chocolaty shell for your code
* [An insane hologramic monkey](http://bosco.darkoverlordofdata.com/)
* A game shell that connects your game to the browswer


## Bosco Stack

```json
      "dependencies": {
        "bosco": "git://github.com/darkoverlordofdata/bosco",
        "chromestoragedb": "git://github.com/darkoverlordofdata/chromeStorageDB",
        "entitas": "git://github.com/darkoverlordofdata/entitas-ts",
        "ezgui":"git://github.com/Ezelia/EZGUI/",
        "howler.js": "~1.1.26",
        "localstoragedb": "git://github.com/knadh/localStorageDB",
        "pixi.js": "~3.0.8",
        "stats.js": "*",
        "tween.ts": "~0.1.2"
      },
      "install": {
        "ignore": ["closure-compiler", "google-closure-library"],
        "path": "web/src",
        "sources": {
          "bosco": "packages/bosco/build/bosco.js",
          "chromestoragedb": "packages/chromestoragedb/chromestoragedb.js",
          "localstoragedb": "packages/localstoragedb/localstoragedb.min.js",
          "entitas": "packages/entitas/build/entitas.js",
          "ezgui": "packages/ezgui/dist/EZGUI.js",
          "howler.js": "packages/howler.js/howler.min.js",
          "pixi.js": "packages/pixi.js/bin/pixi.min.js",
          "stats.js": "packages/stats.js/build/stats.min.js",
          "tween.ts": "packages/tween.ts/build/tween.min.js"
        }
      }
```

# MIT License

Copyright (c) 2015 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
