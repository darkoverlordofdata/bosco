var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        var Input = (function () {
            function Input() {
                var _this = this;
                this.states = {};
                this.mouseDown = false;
                this.mouseButtonDown = false;
                this.mousePosition = { x: 0, y: 0 };
                this.isDown = function (keyCode) { return _this.states[keyCode]; };
                this.isUp = function (keyCode) { return !_this.states[keyCode]; };
                this.onKeyUp = function (event) {
                    if (_this.states[event.keyCode])
                        _this.states[event.keyCode] = false;
                };
                this.onKeyDown = function (event) {
                    _this.states[event.keyCode] = true;
                };
                this.onTouchStart = function (event) {
                    event = event.targetTouches ? event.targetTouches[0] : event;
                    if (_this.isFullScreen === undefined)
                        _this.checkFullScreen();
                    _this.mouseDown = true;
                    _this.mouseButtonDown = true;
                    _this.mousePosition.x = parseInt(event.clientX);
                    _this.mousePosition.y = parseInt(event.clientY);
                    return true;
                };
                this.onTouchMove = function (event) {
                    event = event.targetTouches ? event.targetTouches[0] : event;
                    _this.mousePosition.x = parseInt(event.clientX);
                    _this.mousePosition.y = parseInt(event.clientY);
                };
                this.onTouchEnd = function (event) {
                    _this.mouseDown = false;
                    _this.mouseButtonDown = false;
                };
                document.addEventListener('touchstart', this.onTouchStart, true);
                document.addEventListener('touchmove', this.onTouchMove, true);
                document.addEventListener('touchend', this.onTouchEnd, true);
                document.addEventListener('mousedown', this.onTouchStart, true);
                document.addEventListener('mousemove', this.onTouchMove, true);
                document.addEventListener('mouseup', this.onTouchEnd, true);
                window.addEventListener('keydown', this.onKeyDown, true);
                window.addEventListener('keyup', this.onKeyUp, true);
            }
            Object.defineProperty(Input, "mousePosition", {
                get: function () {
                    return Input._input.mousePosition;
                },
                enumerable: true,
                configurable: true
            });
            Input.getKeyDown = function (k) {
                return Input._input.isDown(k.charCodeAt(0));
            };
            Input.getKeyUp = function (k) {
                return Input._input.isUp(k.charCodeAt(0));
            };
            Input.getMouseButtonUp = function (m) {
                return !Input._input.mouseButtonDown;
            };
            Input.getMouseButton = function (m) {
                return Input._input.mouseDown;
            };
            Input.getMouseButtonDown = function (m) {
                return Input._input.mouseButtonDown;
            };
            Input.update = function () {
                Input._input.mouseDown = false;
                Input._input.states = {};
            };
            Input.prototype.checkFullScreen = function () {
                if (this.isFullScreen === undefined) {
                    if (bosco.config.fullScreen === undefined) {
                        this.isFullScreen = false;
                    }
                    else {
                        this.isFullScreen = bosco.isMobile() || bosco.config.fullScreen;
                    }
                }
                if (this.isFullScreen) {
                    try {
                        if (document.documentElement['requestFullscreen']) {
                            document.documentElement['requestFullscreen']();
                        }
                        else if (document.documentElement['mozRequestFullScreen']) {
                            document.documentElement['mozRequestFullScreen']();
                        }
                        else if (document.documentElement['webkitRequestFullscreen']) {
                            document.documentElement['webkitRequestFullscreen']();
                        }
                        else if (document.documentElement['msRequestFullscreen']) {
                            document.documentElement['msRequestFullscreen']();
                        }
                    }
                    catch (e) { }
                }
            };
            Input._input = new Input();
            return Input;
        })();
        utils.Input = Input;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        var Rnd = (function () {
            function Rnd() {
            }
            Rnd.nextBool = function () {
                return ((~~(Math.random() * 32767)) & 1) === 1;
            };
            /*
             * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
            */
            Rnd.nextDouble = function () {
                return Math.random();
            };
            /*
             * Generates a random int value from 0, inclusive, to max, exclusive.
            */
            Rnd.nextInt = function (max) {
                return ~~(Math.random() * max);
            };
            Rnd.random = function (start, end) {
                if (end === undefined) {
                    return Rnd.nextInt(start + 1);
                }
                else if (parseInt(start) === parseFloat(start) && parseInt(end) === parseFloat(end)) {
                    return start + Rnd.nextInt(end - start + 1);
                }
                else {
                    return start + Rnd.nextDouble() * (end - start);
                }
            };
            return Rnd;
        })();
        utils.Rnd = Rnd;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        var Timer = (function () {
            function Timer(delay, repeat) {
                if (repeat === void 0) { repeat = false; }
                this.execute = function () { };
                this.delay = delay;
                this.repeat = repeat;
                this.acc = 0;
            }
            Timer.prototype.update = function (delta) {
                if (!this.done && !this.stopped) {
                    this.acc += delta;
                    if (this.acc >= this.delay) {
                        this.acc -= this.delay;
                        if (this.repeat) {
                            this.reset();
                        }
                        else {
                            this.done = true;
                        }
                        this.execute();
                    }
                }
            };
            Timer.prototype.reset = function () {
                this.stopped = false;
                this.done = false;
                this.acc = 0;
            };
            Timer.prototype.isDone = function () {
                return this.done;
            };
            Timer.prototype.isRunning = function () {
                return !this.done && this.acc < this.delay && !this.stopped;
            };
            Timer.prototype.stop = function () {
                this.stopped = true;
            };
            Timer.prototype.setDelay = function (delay) {
                this.delay = delay;
            };
            Timer.prototype.getPercentageRemaining = function () {
                if (this.done)
                    return 100;
                else if (this.stopped)
                    return 0;
                else
                    return 1 - (this.delay - this.acc) / this.delay;
            };
            Timer.prototype.getDelay = function () {
                return this.delay;
            };
            return Timer;
        })();
        utils.Timer = Timer;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
/**
 * Timer.ts from Artemis: Copyright 2011, 2013 GAMADU.COM. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of
 conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list
 of conditions and the following disclaimer in the documentation and/or other materials
 provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY GAMADU.COM ``AS IS'' AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GAMADU.COM OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 The views and conclusions contained in the software and documentation are those of the
 authors and should not be interpreted as representing official policies, either expressed
 or implied, of GAMADU.COM.
 */
var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        // Thanks to Riven
        // From: http://riven8192.blogspot.com/2009/08/fastmath-sincos-lookup-tables.html
        var TrigLUT = (function () {
            function TrigLUT() {
            }
            TrigLUT.sin = function (rad) {
                return TrigLUT.sin_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cos = function (rad) {
                return TrigLUT.cos_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.sinDeg = function (deg) {
                return TrigLUT.sin_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cosDeg = function (deg) {
                return TrigLUT.cos_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.init = function (update) {
                TrigLUT.RAD = Math.PI / 180.0;
                TrigLUT.DEG = 180.0 / Math.PI;
                TrigLUT.SIN_BITS = 12;
                TrigLUT.SIN_MASK = ~(-1 << TrigLUT.SIN_BITS);
                TrigLUT.SIN_COUNT = TrigLUT.SIN_MASK + 1;
                TrigLUT.radFull = (Math.PI * 2.0);
                TrigLUT.degFull = (360.0);
                TrigLUT.radToIndex = TrigLUT.SIN_COUNT / TrigLUT.radFull;
                TrigLUT.degToIndex = TrigLUT.SIN_COUNT / TrigLUT.degFull;
                TrigLUT.sin_ = new Array(TrigLUT.SIN_COUNT);
                TrigLUT.cos_ = new Array(TrigLUT.SIN_COUNT);
                for (var i = 0; i < TrigLUT.SIN_COUNT; i++) {
                    TrigLUT.sin_[i] = Math.sin((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                    TrigLUT.cos_[i] = Math.cos((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                }
                if (update) {
                    Math.sin = TrigLUT.sin;
                    Math.cos = TrigLUT.cos;
                }
            };
            return TrigLUT;
        })();
        utils.TrigLUT = TrigLUT;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
var bosco;
(function (bosco) {
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    bosco.isMobile = isMobile;
})(bosco || (bosco = {}));
/**
 * Properties.ts
 *
 * Persist properties using LocalStorage
 *
 */
var bosco;
(function (bosco) {
    var Properties = (function () {
        function Properties() {
        }
        Properties.init = function (name, properties) {
            if (Properties.db !== null)
                return;
            /** Initialize the db with the properties */
            function initializeDb(db) {
                if (db.isNew()) {
                    db.createTable("settings", ["name", "value"]);
                    db.createTable("leaderboard", ["date", "score"]);
                    for (var key in properties) {
                        if (properties.hasOwnProperty(key)) {
                            db.insert("settings", {
                                name: key,
                                value: properties[key]
                            });
                        }
                    }
                    db.commit();
                }
            }
            Properties.dbname = name;
            Properties.properties = properties;
            if (window['chrome']) {
                chromeStorageDB(Properties.dbname, localStorage, function (db) { return initializeDb(Properties.db = db); });
            }
            else {
                initializeDb(Properties.db = new localStorageDB(Properties.dbname));
            }
        };
        /*
         * Get Game Property from local storage
         *
         * @param property name
         * @return property value
         */
        Properties.get = function (prop) {
            return Properties.db.queryAll("settings", {
                query: {
                    name: prop
                }
            })[0].value;
        };
        Properties.setScore = function (score) {
            var today = new Date();
            var mm = (today.getMonth() + 1).toString();
            if (mm.length === 1)
                mm = '0' + mm;
            var dd = today.getDate().toString();
            if (dd.length === 1)
                dd = '0' + dd;
            var yyyy = today.getFullYear().toString();
            var yyyymmdd = yyyy + mm + dd;
            if (0 === Properties.db.queryAll('leaderboard', { query: { date: yyyymmdd } }).length) {
                Properties.db.insert('leaderboard', { date: yyyymmdd, score: score });
            }
            else {
                Properties.db.update('leaderboard', { date: yyyymmdd }, function (row) {
                    if (score > row.score) {
                        row.score = score;
                    }
                    return row;
                });
            }
            Properties.db.commit();
        };
        Properties.getLeaderboard = function (count) {
            return Properties.db.queryAll('leaderboard', { limit: count, sort: [['score', 'DESC']] });
        };
        Properties.db = null;
        Properties.dbname = "";
        Properties.properties = null;
        /*
         * Set Game Property in local storage
         *
         * @param property name
         * @param property value
         * @return nothing
         */
        Properties.set = function (prop, value) {
            Properties.db.update("settings", {
                name: prop
            }, function (row) {
                row.value = "" + value;
                return row;
            });
            Properties.db.commit();
        };
        return Properties;
    })();
    bosco.Properties = Properties;
})(bosco || (bosco = {}));
/**
 * Bosco.ts
 *
 * Game Shell
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 */
var bosco;
(function (bosco) {
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var Container = PIXI.Container;
    var Input = bosco.utils.Input;
    (function (ScaleType) {
        ScaleType[ScaleType["FILL"] = 0] = "FILL";
        ScaleType[ScaleType["FIXED"] = 1] = "FIXED"; // scale fixed size to fit the screen
    })(bosco.ScaleType || (bosco.ScaleType = {}));
    var ScaleType = bosco.ScaleType;
    bosco.fps = 0;
    var _prefabs = {};
    /**
     * Load assets and start
     */
    function start(config) {
        if (bosco.Properties && config.properties) {
            bosco.Properties.init(config.namespace, config.properties);
        }
        for (var asset in config.assets) {
            PIXI.loader.add(asset, config.assets[asset]);
        }
        PIXI.loader.load(function (loader, resources) {
            new Game(config, resources);
        });
    }
    bosco.start = start;
    var DummyStats = (function () {
        function DummyStats() {
        }
        DummyStats.prototype.begin = function () { };
        DummyStats.prototype.end = function () { };
        return DummyStats;
    })();
    /**
     * Bake a texture
     * @param name
     */
    function buildComposite(name, level) {
        if (level === void 0) { level = 0; }
        var config = bosco.config.resources[name];
        if (Array.isArray(config)) {
            var container = new Sprite();
            for (var i = 0, l = config.length; i < l; i++) {
                container.addChild(buildComposite(config[i], level + 1));
            }
            return container;
        }
        else {
            var sprite = new Sprite(Texture.fromFrame(config.path));
            for (var k in config) {
                switch (k) {
                    case 'anchor':
                        sprite.anchor.set(config.anchor.x, config.anchor.y);
                        break;
                    case 'scale':
                        if (level > 0)
                            sprite.scale.set(config.scale.x, config.scale.y);
                        break;
                    case 'position':
                        if (level > 0)
                            sprite.position.set(config.position.x, config.position.y);
                        break;
                    case 'rotation':
                        if (level > 0)
                            sprite.rotation = config.rotation.z;
                        break;
                    case 'tint':
                        sprite.tint = config.tint;
                        break;
                }
            }
            return sprite;
        }
    }
    /**
     * prefab
     *
     * Make a sprite from a prefabricated texture
     * and then configure it.
     *
     * @param name
     * @param parent
     * @returns {PIXI.Sprite}
     */
    function prefab(name, parent) {
        if (parent === void 0) { parent = viewContainer; }
        var sprite = new Sprite(_prefabs[name]);
        var config = bosco.config.resources[name];
        for (var k in config) {
            switch (k) {
                case 'anchor':
                    sprite.anchor.set(config.anchor.x, config.anchor.y);
                    break;
                case 'scale':
                    sprite.scale.set(config.scale.x, config.scale.y);
                    break;
                case 'position':
                    sprite.position.set(config.position.x, config.position.y);
                    break;
                case 'rotation':
                    sprite.rotation = config.rotation.z;
                    break;
            }
        }
        return sprite;
    }
    bosco.prefab = prefab;
    var Game = (function () {
        /**
         * Create the game instance
         * @param resources
         */
        function Game(config, resources) {
            var _this = this;
            this.totalFrames = 0;
            this.elapsedTime = 0;
            /**
             * Game Loop
             * @param time
             */
            this.update = function (time) {
                var stats = _this.stats;
                if (stats)
                    stats.begin();
                var temp = _this.previousTime || time;
                _this.previousTime = time;
                var delta = bosco.delta = (time - temp) * 0.001;
                _this.totalFrames++;
                _this.elapsedTime += delta;
                if (_this.elapsedTime > 1) {
                    bosco.fps = _this.totalFrames;
                    _this.totalFrames = 0;
                    _this.elapsedTime = 0;
                }
                var controllers = _this.controllers;
                for (var i = 0, l = controllers.length; i < l; i++) {
                    controllers[i].update(delta);
                }
                _this.renderer.render(_this.stage);
                Input.update();
                TWEEN.update();
                requestAnimationFrame(_this.update);
                if (stats)
                    stats.end();
            };
            /**
             * Resize window
             */
            this.resize = function () {
                var ratio = Math.min(window.innerWidth / _this.config.width, window.innerHeight / _this.config.height);
                _this.config.scale = ratio;
                _this.stage.scale.x = _this.stage.scale.y = ratio;
                _this.renderer.resize(Math.ceil(_this.config.width * ratio), Math.ceil(_this.config.height * ratio));
            };
            this.config = bosco.config = config;
            this.resources = resources;
            this.previousTime = 0;
            var controllers = this.controllers = [];
            var renderer = this.renderer = PIXI.autoDetectRenderer(config.width, config.height, config.options);
            for (var name in config.resources) {
                var s = buildComposite(name);
                _prefabs[name] = s.generateTexture(renderer);
            }
            renderer.view.style.position = 'absolute';
            renderer.view.style.top = '0px';
            renderer.view.style.left = '0px';
            var stage = this.stage = new Container();
            viewContainer = this.sprites = new Container();
            foreContainer = this.fore = new Container();
            this.resize();
            document.body.appendChild(renderer.view);
            if (config.stats) {
                var stats = this.stats = new Stats();
                stats.setMode(0);
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                document.body.appendChild(stats.domElement);
            }
            window.addEventListener('resize', this.resize, true);
            window.onorientationchange = this.resize;
            stage.addChild(this.sprites);
            stage.addChild(this.fore);
            for (var _i = 0, _a = config.controllers; _i < _a.length; _i++) {
                var className = _a[_i];
                var Class = window[config.namespace][className];
                controllers.push(new Class());
            }
            for (var _b = 0; _b < controllers.length; _b++) {
                var controller = controllers[_b];
                controller.start();
            }
            requestAnimationFrame(this.update);
        }
        return Game;
    })();
    bosco.Game = Game;
})(bosco || (bosco = {}));
//# sourceMappingURL=bosco.js.map