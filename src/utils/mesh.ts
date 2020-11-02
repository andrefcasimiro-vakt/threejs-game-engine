import { Object3D, Mesh, BoxGeometry } from "three";

export const generateBoxGeometry = (color: string = 'blue') => {
  const mesh = new Mesh(new BoxGeometry(1, 1, 1))
  // @ts-ignore
  mesh.material.color.set(color)
 
  return mesh
}
