import { Raycaster, Vector2, Camera, Intersection } from "three";
import Component from "../core/component";
import Scene from "../core/scene";

export default class MouseRaycast implements Component {

  private _requestAnimationFrameId: number

  private _camera: Camera
  private _raycaster: Raycaster
  private _mouse: Vector2

  constructor(
    private _scene: Scene,
    private _onRaycast: (intersections: Intersection[]) => void
  ) {
    this._scene = _scene
    this._camera = _scene.getCamera()

    this.start()
  }


  start = () => {
    this._raycaster = new Raycaster()
    this._mouse = new Vector2()

    window.addEventListener( 'mousemove', this.onMouseMove, false);

    this.update()
  }

  update = () => {
    this.raycast()
    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    window.removeEventListener( 'mousemove', this.onMouseMove, false );

    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  raycast = () => {
    this._raycaster.setFromCamera(this._mouse, this._camera)

    const intersects = this._raycaster.intersectObjects(this._scene.get().children, false)
    
    if (this._onRaycast) {
      this._onRaycast(intersects)
    }
  }

  onMouseMove = (event: MouseEvent) => {
    // calculate mouse position in normalized device coordinates
  	// (-1 to +1) for both components
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

}