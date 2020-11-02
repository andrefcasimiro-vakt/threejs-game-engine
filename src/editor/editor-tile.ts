import Serializable from "../core/serializable";

export enum TileType {
  FLOOR,
  OBJECT,
  EVENT
}

export interface TileEntity {
  uuid: string
  floorId: string
  objectId: string
  eventId: string
}

export default class Tile implements Serializable<TileEntity> {

  /** The floor texture / material (e. g. grass, dirt, stonewall) */
  private _floorID: string

  /** The object placed upon the floor (e. g. tree, a static 3d model) */
  private _objectID: string

  /** The event placed on the tile (e. g. some character, a dynamic door) */
  private _eventID: string

  constructor(
    private _uuid: string
  ) {
    this._uuid = _uuid
  }

  serialize() {
    const tileToSerialize: TileEntity = {
      uuid: this._uuid,
      floorId: this._floorID,
      objectId: this._objectID,
      eventId: this._eventID,
    } 

    try {
      const serializedData = JSON.stringify(tileToSerialize)
      return serializedData
    } catch (error) {
      console.error(`Error serializing tile entity. Details: `, error)
    }
  }

  unserialize(rawData: string) {
    try {
      const data: TileEntity = JSON.parse(rawData)
      return data
    } catch (error) {
      console.error(`Error unserializing tile entity. Details: `, error)
    }
  }

  get(type: TileType) {
    switch (type) {
      case TileType.FLOOR: {
        return this._floorID
      }
      case TileType.OBJECT: {
        return this._objectID
      }
      case TileType.EVENT: {
        return this._eventID
      }
      default:
        break
    }
  }

  set(entityId: string, type: TileType) {
    switch (type) {
      case TileType.FLOOR: {
        this._floorID = entityId
        break
      }
      case TileType.OBJECT: {
        this._objectID = entityId
        break
      }
      case TileType.EVENT: {
        this._eventID = entityId
        break
      }
      default:
        break
    }
  }

  unset(type: TileType) {
    switch (type) {
      case TileType.FLOOR: {
        this._floorID = null
        break
      }
      case TileType.OBJECT: {
        this._objectID = null
        break
      }
      case TileType.EVENT: {
        this._eventID = null
        break
      }
      default:
        break
    }
  }
}
