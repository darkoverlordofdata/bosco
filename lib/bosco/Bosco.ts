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

  declare var Stats;
  declare var viewContainer;
  declare var foreContainer;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  import SystemRenderer = PIXI.SystemRenderer;
  import Input = bosco.utils.Input;

  export enum ScaleType {
    FILL, // fill to fit screen
    FIXED // scale fixed size to fit the screen
  }

  export var config;

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

  class DummyStats {
    begin() {}
    end() {}
  }
  export class Game {


    stage:Container;
    sprites:Container;
    fore:Container;
    renderer:SystemRenderer;
    stats;
    config;
    resources;

    /**
     * Create the game instance
     * @param resources
     */
    constructor(config, resources) {

      var controllers = [];
      var temp:number;
      var previousTime:number;

      config.height = config.height || window.innerHeight;
      config.width = config.width || window.innerWidth;
      if (isNaN(parseFloat(config.scaleType))) {
        config.scaleType = ScaleType[config.scaleType];
      }
      if (!config.scale) {
        var scaleH = window.innerWidth/config.width;
        var scaleV = window.innerHeight/config.height;
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
        this.update = (time:number) => {
          stats.begin();
          temp = previousTime || time;
          previousTime = time;
          var delta = (time - temp) * 0.001;
          for (var i=0, l=controllers.length; i<l; i++) {
            controllers[i].update(delta);
          }
          renderer.render(stage);
          stats.end();
          requestAnimationFrame(this.update);
          Input.update();
          TWEEN.update();
        };

      } else {

        /**
         *
         * @param time
         */
        this.update = (time:number) => {
          temp = previousTime || time;
          previousTime = time;
          var delta = (time - temp) * 0.001;
          for (var i=0, l=controllers.length; i<l; i++) {
            controllers[i].update(delta);
          }
          renderer.render(stage);
          requestAnimationFrame(this.update);
          Input.update();
          TWEEN.update();
        };
      }

      window.addEventListener('resize', this.resize, true);
      window.onorientationchange = this.resize;
      stage.addChild(this.sprites);
      stage.addChild(this.fore);

      for (var className of config.controllers) {
        var Class:any = window[config.namespace][className];
        controllers.push(new Class());
      }

      for (var controller of controllers) {
        controller.start();
      }
      requestAnimationFrame(this.update);

    }

    /**
     * Game Loop
     * @param time
     */
    update = (time:number) => {};

    /**
     * Resize window
     */
    resize = () => {
      switch (this.config.scaleType) {
        case ScaleType.FILL:
          var height = window.innerHeight;
          var width = window.innerWidth;
          this.renderer.resize(width, height);
          break;
        case ScaleType.FIXED:
          this.renderer.view.style.width = window.innerWidth + 'px';
          this.renderer.view.style.height = window.innerHeight + 'px';
          break;
      }
    };
  }
}

