export default abstract class Serializable<T = any> {

  abstract serialize(data: T): string

  abstract unserialize(rawData: string): T

}
