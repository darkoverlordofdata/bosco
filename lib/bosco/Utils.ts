/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
module bosco {

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  export function isMobile():boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Builds a composited sprite
   *
   * @param name  resource name
   * @returns {PIXI.Sprite}
   */
  export function prefab(name): Sprite {

    var config = bosco.config.resources[name];

    if (Array.isArray(config)) {
      var container = new Sprite();
      for (var i = 0, l = config.length; i < l; i++) {
        container.addChild(prefab(config[i]));
      }
      return container;
    } else {
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
}

