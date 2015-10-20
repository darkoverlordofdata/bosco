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
            Input._input = new Input();
            return Input;
        })();
        utils.Input = Input;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
//# sourceMappingURL=Input.js.map
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
//# sourceMappingURL=Rnd.js.map
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
//# sourceMappingURL=TrigLUT.js.map
/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
var bosco;
(function (bosco) {
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    /**
     * Builds a composited sprite
     *
     * @param name  resource name
     * @returns {PIXI.Sprite}
     */
    function prefab(name) {
        var config = bosco.config.resources[name];
        if (Array.isArray(config)) {
            var container = new Sprite();
            for (var i = 0, l = config.length; i < l; i++) {
                container.addChild(prefab(config[i]));
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
                        sprite.scale.set(config.scale.x, config.scale.y);
                        break;
                    case 'position':
                        sprite.position.set(config.position.x, config.position.y);
                        break;
                    case 'rotation':
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
    bosco.prefab = prefab;
})(bosco || (bosco = {}));
//# sourceMappingURL=Utils.js.map
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
    var Container = PIXI.Container;
    var Input = bosco.utils.Input;
    (function (ScaleType) {
        ScaleType[ScaleType["FILL"] = 0] = "FILL";
        ScaleType[ScaleType["FIXED"] = 1] = "FIXED"; // scale fixed size to fit the screen
    })(bosco.ScaleType || (bosco.ScaleType = {}));
    var ScaleType = bosco.ScaleType;
    bosco.config;
    /**
     * Load assets and start
     */
    function start(config) {
        for (var asset in config.assets) {
            PIXI.loader.add(asset, config.assets[asset]);
        }
        PIXI.loader.load(function (loader, resources) { return new Game(config, resources); });
    }
    bosco.start = start;
    var DummyStats = (function () {
        function DummyStats() {
        }
        DummyStats.prototype.begin = function () { };
        DummyStats.prototype.end = function () { };
        return DummyStats;
    })();
    var Game = (function () {
        /**
         * Create the game instance
         * @param resources
         */
        function Game(config, resources) {
            var _this = this;
            /**
             * Game Loop
             * @param time
             */
            this.update = function (time) { };
            /**
             * Resize window
             */
            this.resize = function () {
                switch (_this.config.scaleType) {
                    case ScaleType.FILL:
                        var height = window.innerHeight;
                        var width = window.innerWidth;
                        _this.renderer.resize(width, height);
                        break;
                    case ScaleType.FIXED:
                        _this.renderer.view.style.width = window.innerWidth + 'px';
                        _this.renderer.view.style.height = window.innerHeight + 'px';
                        break;
                }
            };
            var controllers = [];
            var temp;
            var previousTime;
            config.height = config.height || window.innerHeight;
            config.width = config.width || window.innerWidth;
            if (isNaN(parseFloat(config.scaleType))) {
                config.scaleType = ScaleType[config.scaleType];
            }
            if (!config.scale) {
                var scaleH = window.innerWidth / config.width;
                var scaleV = window.innerHeight / config.height;
                config.scale = Math.min(scaleH, scaleV);
            }
            this.config = bosco.config = config;
            this.resources = resources;
            var stage = this.stage = new Container();
            viewContainer = this.sprites = new Container();
            foreContainer = this.fore = new Container();
            viewContainer.scale.set(config.scale, config.scale);
            foreContainer.scale.set(config.scale, config.scale);
            var renderer = this.renderer = PIXI.autoDetectRenderer(config.width, config.height, config.options);
            switch (config.scaleType) {
                case ScaleType.FILL:
                    this.renderer.view.style.position = 'absolute';
                    break;
                case ScaleType.FIXED:
                    renderer.view.style.position = 'absolute';
                    renderer.view.style.width = window.innerWidth + 'px';
                    renderer.view.style.height = window.innerHeight + 'px';
                    renderer.view.style.display = 'block';
                    break;
            }
            document.body.appendChild(renderer.view);
            if (config.stats) {
                var stats = this.stats = new Stats();
                stats.setMode(0);
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                document.body.appendChild(stats.domElement);
                /**
                 *
                 * @param time
                 */
                this.update = function (time) {
                    stats.begin();
                    temp = previousTime || time;
                    previousTime = time;
                    var delta = (time - temp) * 0.001;
                    for (var i = 0, l = controllers.length; i < l; i++) {
                        controllers[i].update(delta);
                    }
                    renderer.render(stage);
                    stats.end();
                    requestAnimationFrame(_this.update);
                    Input.update();
                    TWEEN.update();
                };
            }
            else {
                /**
                 *
                 * @param time
                 */
                this.update = function (time) {
                    temp = previousTime || time;
                    previousTime = time;
                    var delta = (time - temp) * 0.001;
                    for (var i = 0, l = controllers.length; i < l; i++) {
                        controllers[i].update(delta);
                    }
                    renderer.render(stage);
                    requestAnimationFrame(_this.update);
                    Input.update();
                    TWEEN.update();
                };
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
//# sourceMappingURL=Bosco.js.map