module example {

  declare var viewContainer;

  import Input = bosco.utils.Input;
  import Pools = example.Pools;

  export class InputController {

    start() {}
    stop() {}

    update(delta:number) {
      Pools.pool.isAccelerating = Input.getMouseButtonDown(0);
    }
  }
}