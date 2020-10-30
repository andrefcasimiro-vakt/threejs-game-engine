import Component from "../core/component"
import { ChangeEvent } from "../typescript/typings"

interface Props {
  style: string
  onChange: (event: ChangeEvent) => void,
}

export default class Input implements Component {

  private _instance: HTMLInputElement

  private _style: string
  private _onChange: (event: ChangeEvent) => void

  constructor({ style, onChange }: Props) {
    this._style = style
    this._onChange = onChange

    this.start()
  }

  start () {
    this._instance = document.createElement('input')
    this._instance.setAttribute('type', 'text')
    this._instance.setAttribute('style', this._style)
    this._instance.addEventListener('input', this._onChange)

    document.body.appendChild(this._instance)
  }

  destroy () {
    this._instance.removeEventListener('input', this._onChange)

    document.removeChild(this._instance)
  }
}
