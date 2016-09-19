/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
module bosco {
  "use strict"

  import Sprite = PIXI.Sprite
  import Texture = PIXI.Texture
  import Container = PIXI.Container

  /**
   * @returns true if browser running on a mobile platform
   */
  export function isMobile():boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  ///**
  // * Make 'n' Bake:  a composite sprite
  // *
  // * @param name
  // * @param bake
  // * @returns {Sprite}
  // */
  //export function prefab(name, bake:boolean=true): Sprite {
  //  var s = _prefab(name)
  //  s.cacheAsBitmap = bake
  //  return s
  //}
  //
  //function _prefab(name): Sprite {
  //
  //  var config = bosco.config.resources[name]
  //
  //  if (Array.isArray(config)) {
  //    var container = new Sprite()
  //    for (var i = 0, l = config.length; i < l; i++) {
  //      container.addChild(_prefab(config[i]))
  //    }
  //    return container
  //  } else {
  //    var sprite = new Sprite(Texture.fromFrame(config.path))
  //    for (var k in config) {
  //      switch (k) {
  //        case 'anchor':
  //          sprite.anchor.set(config.anchor.x, config.anchor.y)
  //          break
  //        case 'scale':
  //          sprite.scale.set(config.scale.x, config.scale.y)
  //          break
  //        case 'position':
  //          sprite.position.set(config.position.x, config.position.y)
  //          break
  //        case 'rotation':
  //          sprite.rotation = config.rotation.z
  //          break
  //        case 'tint':
  //          sprite.tint = config.tint
  //          break
  //      }
  //    }
  //    return sprite
  //  }
  //}
}

