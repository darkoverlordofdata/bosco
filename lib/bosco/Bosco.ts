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
module bosco {
  "use strict";

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Input = bosco.utils.Input;
  import Container = PIXI.Container;
  import Properties = bosco.Properties;
  import SystemRenderer = PIXI.SystemRenderer;


  /** @type Object mrdoodb's stat viewer */
  declare var Stats;
  /** @type Object dat.gui */
  declare var dat;
  /** @type Object EZGUI */
  declare var EZGUI;
  /** @type PIXI.Container game screen */
  export var viewContainer:Container;
  /** @type PIXI.Container anything that <b>must</b> be in foreground */
  export var foreContainer:Container;

  /** @type Object PIXI loader return values */
  export var resources;
  /** @type Object raw configuration hash */
  export var config;
  /** @type number time change in ms for current frame */
  export var delta:number;
  /** @type number frames per second */
  export var fps:number=0;
  
  export var world;

  var _game:Game;

  /**
   * Set the current controller group
   *
   * @param name
   */
  export function controller(name, ...args) {

    if (!bosco.config.controllers[name]) return;

    /** First, stop the existing controller */
    for (var controller of _game.controllers) {
      controller.stop();
    }
    _game.controllers = [];

    /** Get the new controller(s) */
    var root = bosco.config.controllers[name];
    root = Array.isArray(root) ? root : [root];
    for (var className of root) {
      var Class:any = window[config.namespace][className];
      _game.controllers.push(new Class());
    }

    /** Start the controller(s) */
    for (var controller of _game.controllers) {
      controller.start(...args);
    }
  }
  /**
   * Load assets and start
   */
  export function start(config) {
    if (config.properties) {
      Properties.init(config.namespace, config.properties);
    }

    for (var asset in config.assets) {
      PIXI.loader.add(asset, config.assets[asset]);
    }
    PIXI.loader.load((loader, resources) => new Game(config, resources));
  }

  /**
   * Prefab -
   *
   * Composite an image
   * @param name
   * @param parent
   * @returns {PIXI.Sprite}
   */
  export function prefab(name:string, parent=bosco.viewContainer): Sprite {

    var s = _prefab(bosco.config.resources[name]);
    if (parent) parent.addChild(s);
    return s;
  }

  function _prefab(config): Sprite {
    if (Array.isArray(config)) {
      var container = new Sprite();
      for (var i=0, l=config.length; i<l; i++) {
        container.addChild(_prefab(config[i]));
      }
      return container;
    } else {
      var sprite = new Sprite(Texture.fromFrame(config.path));
      for (var k in config) {
        switch(k) {
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
            sprite.rotation = config.rotation;
            break;
          case 'tint':
            sprite.tint = config.tint;
            break;
        }
      }
      return sprite;
    }
  }
  export class Game {


    stage:Container;
    sprites:Container;
    foreground:Container;
    renderer:SystemRenderer;
    stats;
    config;
    resources;
    controllers;
    previousTime:number;
    private totalFrames:number=0;
    private elapsedTime:number=0;
    tween:boolean=false;
    input:boolean=false;

    /**
     * Create the game instance
     * @param resources
     */
    constructor(config, resources) {

      _game = this;

      this.config = bosco.config = config;
      this.resources = bosco.resources = resources;
      this.tween = config.tween;
      this.input = config.input;
      this.previousTime = 0;
      this.controllers = [];
      var renderer = this.renderer = PIXI.autoDetectRenderer(config.width, config.height, config.options);

      renderer.view.style.position = 'absolute';
      renderer.view.style.top = '0px';
      renderer.view.style.left = '0px';

      var stage = this.stage = new Container();
      bosco.viewContainer = this.sprites = new Container();
      bosco.foreContainer = this.foreground = new Container();

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
      stage.addChild(this.foreground);

      if (config.ezgui && config.theme) {
        EZGUI.Theme.load([`assets/${config.theme}-theme/${config.theme}-theme.json`], () => {
          bosco.controller('main');
          requestAnimationFrame(this.update);
        });

      } else {
        bosco.controller('main');
        requestAnimationFrame(this.update);
      }


    }

    /**
     * Game Loop
     * @param time
     */
    update = (time:number) => {
      var stats = this.stats;
      if (stats) stats.begin();

      var temp = this.previousTime || time;
      this.previousTime = time;
      var delta = bosco.delta = (time - temp) * 0.001;

      this.totalFrames++;
      this.elapsedTime += delta;
      if (this.elapsedTime > 1) {
        bosco.fps = this.totalFrames;
        this.totalFrames = 0;
        this.elapsedTime = 0;
      }

      var controllers = this.controllers;
      for (var i=0, l=controllers.length; i<l; i++) {
        controllers[i].update(delta);
      }
      
      this.renderer.render(this.stage);
      if (this.input) Input.update();
      if (this.tween) TWEEN.update();
      requestAnimationFrame(this.update);

      if (stats) stats.end();
    };


    /**
     * Resize window
     */

    resize = () => {
      var ratio = Math.min(window.innerWidth/this.config.width,
        window.innerHeight/this.config.height);

      this.config.scale = ratio;
      this.stage.scale.x = this.stage.scale.y = ratio;
      this.renderer.resize(Math.ceil(this.config.width * ratio),
        Math.ceil(this.config.height * ratio));


    };

  }
}

