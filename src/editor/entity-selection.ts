import ReactiveComponent from "../core/reactive-component";
import { subscribeKeyEvent, unsubscribeKeyEvent } from "../utils/key-events";
import { floorEntities } from "./data/entities";

export enum EntitySelectionKeys {
  TOGGLE = 'Tab',
}

export default class EntitySelection implements ReactiveComponent {

  private _modalContainer: HTMLDivElement
  private _modalContent: HTMLDivElement
  private _modalTitle: HTMLHeadingElement

  private _floorList: HTMLUListElement
  private _floorItems: HTMLLIElement[] = []

  constructor(
    private _isActive: boolean
  ) {
    this._isActive = _isActive

    this.start()
  }

  start = () => {
    this.render()

    subscribeKeyEvent('keydown', EntitySelectionKeys.TOGGLE, this.handleToggle)
  
    window.onclick = (event: MouseEvent) => {
      if (event.target == this._modalContainer) {
        this._modalContainer.style.display = 'none'

        this._isActive = false
      }
    }
  }

  destroy = () => {
    unsubscribeKeyEvent('keydown', EntitySelectionKeys.TOGGLE, this.handleToggle)

    document.body.appendChild(this._modalContent) // Necessary?
    document.body.appendChild(this._modalContainer)
  }

  render = () => {
    this._modalContainer = document.createElement('div')
    this._modalContainer.setAttribute('style', `
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    `)
    document.body.appendChild(this._modalContainer)

    this._modalContent = document.createElement('div')
    this._modalContent.setAttribute('style', `
      background-color: rgba(255, 255, 255);
      margin: 15% auto;
      padding: 20px;
      width: 40%;
    `)
    this._modalContainer.appendChild(this._modalContent)

    /** Floor */
    this._modalTitle = document.createElement('h2')
    this._modalTitle.setAttribute('style', `
      padding: 10px;
    `)
    this._modalTitle.innerHTML = 'Floors'
    this._modalContent.appendChild(this._modalTitle)

    this._floorList = document.createElement('ul')
    this._floorList.setAttribute('style', `
      padding: 10px;
    `)
    this._modalContent.appendChild(this._floorList)

    floorEntities.forEach(floorEntity => {
      const li = document.createElement('li')
      li.innerHTML = floorEntity.displayName
      li.onclick = () => { console.log(floorEntity)}

      this._floorItems.push(li)
      this._floorList.appendChild(li)
    })

  }

  handleToggle = () => {
    this.handleDisplay()
    this._isActive = !this._isActive
  }

  handleDisplay = () => {
    const value = this._isActive ? 'none' : 'block'

    this._modalContainer.style.display = value
  }
}

