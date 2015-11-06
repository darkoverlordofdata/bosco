module example {

  import Pools = example.Pools;
  import Systems = entitas.Systems;

  export class GameController {

    systems:Systems;

    start() {

      this.systems = this.createSystems(Pools.pool);
      this.systems.initialize();
    }

    stop() {
      this.systems = null;
    }

    update(delta:number) {
      this.systems.execute();
    }

    createSystems(pool) {
      return new Systems()
        // Initialize
        .add(pool.createSystem(example.CreateFinishLineSystem))
        .add(pool.createSystem(example.CreatePlayerSystem))
        .add(pool.createSystem(example.CreateOpponentsSystem))

        // Update
        .add(pool.createSystem(example.AccelerateSystem))
        .add(pool.createSystem(example.MoveSystem))
        .add(pool.createSystem(example.ReachedFinishSystem))

        // Render
        .add(pool.createSystem(example.RemoveViewSystem))
        .add(pool.createSystem(example.AddViewSystem))
        .add(pool.createSystem(example.RenderPositionSystem))

        // Destroy
        .add(pool.createSystem(example.DestroySystem));

    }
  }
}