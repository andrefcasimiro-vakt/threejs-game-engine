/**
 * Core component from which every component derives
 */
export default abstract class Component<T = any> {

  /**
   * Run once on bootstrap
   */
  abstract start(): void

  /**
   * Runs every frame
   */
  abstract update(): void

  /**
   * Runs before component is destroyed
   */
  abstract destroy?(): void

  /**
   * Gets the private instance of the component
   */
  abstract get?(): T

}
