import { Entity } from "../editor-grid";
import { generateBoxGeometry } from "../../utils/mesh";

export interface EntityPreview extends Entity {
  displayName: string
  color?: string
}

export const floorEntities: EntityPreview[] = [
  {
    uuid: 'dirt',
    mesh: generateBoxGeometry('#cb997e'),
    displayName: 'Dirt',
    color: '#cb997e',
  },
  {
    uuid: 'grass',
    mesh: generateBoxGeometry('#74c69d'),
    displayName: 'Grass',
    color: '#74c69d',
  },
]
