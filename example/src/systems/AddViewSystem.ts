module example {

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import ParticleBuffer = PIXI.ParticleBuffer;

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import IInitializeSystem = entitas.IInitializeSystem;

  export class AddViewSystem implements IReactiveSystem {


    public get trigger():TriggerOnEvent {
      return Matcher.Resource.onEntityAdded();
    }

    /**
     * Execute when a Resource is added
     * @param entities
     */
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];

        var s:Sprite = bosco.prefab(e.resource.name, null);
        bosco.viewContainer.addChild(s);
        e.addView(s);
      }
    }
  }
}