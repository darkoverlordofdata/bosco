/**
 * Entitas Generated Classes for matchone
 *
 * do not edit this file
 */
module matchone {

  import Pool = entitas.Pool;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import ISystem = entitas.ISystem;
  import IMatcher = entitas.IMatcher;
  import IComponent = entitas.IComponent;

  export enum CoreComponentIds {
    Movable,
    Position,
    Destroy,
    GameBoardCache,
    GameBoard,
    GameBoardElement,
    Input,
    Interactive,
    Resource,
    View,
    Score,
    TotalComponents
  }


  export class MovableComponent implements IComponent {
  }
  export class PositionComponent implements IComponent {
    public x:number;
    public y:number;
  }
  export class DestroyComponent implements IComponent {
  }
  export class GameBoardCacheComponent implements IComponent {
    public grid:Array<Array<Entity>>;
  }
  export class GameBoardComponent implements IComponent {
    public columns:number;
    public rows:number;
  }
  export class GameBoardElementComponent implements IComponent {
  }
  export class InputComponent implements IComponent {
    public x:number;
    public y:number;
  }
  export class InteractiveComponent implements IComponent {
  }
  export class ResourceComponent implements IComponent {
    public name:string;
  }
  export class ViewComponent implements IComponent {
    public sprite:Object;
  }
  export class ScoreComponent implements IComponent {
    public value:number;
  }


  export class Pools {
    
    static _allPools:Array<Pool>;
    
    static get allPools():Array<Pool> {
      if (Pools._allPools == null) {
        Pools._allPools = [Pools.pool];
      }
      return Pools._allPools;
    }
    
    static _pool:Pool;
    
    static get pool():Pool {
      if (Pools._pool == null) {
        Pools._pool = new Pool(CoreComponentIds, CoreComponentIds.TotalComponents);
      }
    
      return Pools._pool;
    }
  }
}