module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  import Text = PIXI.Text;

  declare var viewContainer;

  export class ReachedFinishSystem implements IReactiveSystem, ISetPool {
    protected pool:Pool;

    public get trigger():TriggerOnEvent {
      return Matcher.Position.onEntityAdded();
    }

    /**
     * Check if anyone crossed the finish line
     * @param entities
     */
    public execute(entities:Array<Entity>) {
      var finishLinePosY = this.pool.finishLineEntity.position.y;
      for (var i=0, l=entities.length; i<l; i++) {
        var e = entities[i];
        if (e.position.y > finishLinePosY) {
          if (e.isPlayer) {

            var label = new Text('', { font: 'bold 50px Arial', fill: 'white' });
            label.anchor.set(0.5, 0.5);
            label.position.set(bosco.config.width/2, 100);
            viewContainer.addChild(label);

            switch (e.score.value) {
              case 0:
                label.text  = "You Win!";
                break;
              case 1:
                label.text  = "2nd Place!";
                break;
              case 2:
                label.text  = "3rd Place!";
                break;
              default:
                label.text  = "You Lose!";

            }
          }
          if (this.pool.hasScore) this.pool.replaceScore(this.pool.score.value+1);
          e.isDestroy = true;
        }
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
  }
}