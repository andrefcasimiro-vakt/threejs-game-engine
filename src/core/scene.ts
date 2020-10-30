import {
  WebGLRenderer,
  Camera,
  Scene as ThreeJSScene
} from 'three'
import Component from './component';

export default class Scene implements Component<ThreeJSScene> {

  private _instance: ThreeJSScene

  private _renderer: WebGLRenderer

  /**
   * The id of the requestAnimationFrame update() hook-up
   */
  private _requestAnimationFrameId: number

  /**
   * 
   * @param _sceneName - The name of our scene
   * @param _camera - The camera rendered by the scene
   */
  constructor(
    private _sceneName: string,
     private _camera: Camera,
  ) {
    this._sceneName = _sceneName
    this._camera = _camera

    this.start()
  }

  start = () => {
    this._instance = new ThreeJSScene()

    // Instantiate WebGL Renderer
    this._renderer = new WebGLRenderer()
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this._renderer.domElement)

    this.update()
  }

  update = () => {
    this._renderer.render(this.get(), this._camera)

    // Hook update() to every animation frame
    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    // Unhook update() from every animation frame
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  get = () => {
    return this._instance;
  }

  getRenderer = () => {
    return this._renderer;
  }

  getName = () => {
    return this._sceneName;
  }
}
