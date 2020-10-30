import * as THREE from 'three'
import Component from '../core/component'

// @ts-ignore
const OrbitControls = require('three-orbit-controls')(THREE)

export default class OrbitControl implements Component<THREE.OrbitControls> {

  private _instance: THREE.OrbitControls
  private _requestAnimationFrameId: number

  constructor(
    private _camera: THREE.Camera,
    private _domElement: HTMLCanvasElement,
  ) {
    this._camera = _camera
    this._domElement = _domElement

    this.start()
  }

  start = () => {
    this._instance = new OrbitControls(this._camera, this._domElement)

    this.update()
  }

  update = () => {
    this._instance.update()

    this._requestAnimationFrameId = window.requestAnimationFrame(this.update)
  }

  destroy = () => {
    window.cancelAnimationFrame(this._requestAnimationFrameId)
  }

  get = () => {
    return this._instance;
  }
}
