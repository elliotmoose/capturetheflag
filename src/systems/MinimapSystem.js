import { players, flags, map } from "../managers/gamemanager"

export const MinimapSystem = (entities) => {
  
  if (map.bounds) {
    entities.minimap.width = map.bounds.width
    entities.minimap.height = map.bounds.height
  }

  entities.minimap.players = players;
  entities.minimap.flags = flags;
  
  return entities;
};
