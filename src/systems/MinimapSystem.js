import { players, flags, map } from "../managers/gamemanager"
import { Dimensions } from "react-native";
import { Vector2Subtract } from "../helpers/Vectors"

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape
const SCREEN_SCALE = 0.5; //Ratio of height of minimap to height of screen

export const MinimapSystem = (entities, {touches}) => {
  
  if (map.bounds) {
    let scale = SCREENHEIGHT * SCREEN_SCALE / map.bounds.height; //Actual scaling ratio of minimap to real game. Different from SCREEN_SCALE
    entities.minimap.scale = scale;
    entities.minimap.height = map.bounds.height * scale;
    entities.minimap.width = map.bounds.width * scale;
    entities.minimap.bases = map.bases;
  }

  entities.minimap.players = players;
  entities.minimap.flags = flags;

  touches.forEach(touch => {
    let touch_in_minimap = (touch.event.pageX >= entities.minimap.offset[0] && touch.event.pageX <= entities.minimap.offset[0] + entities.minimap.width 
      && touch.event.pageY >= entities.minimap.offset[1] && touch.event.pageY <= entities.minimap.offset[1] + entities.minimap.height);
    
    if (touch_in_minimap) {
      switch (touch.type) {
        case "start":
          entities.minimap.touch_id = touch.id;
          entities.minimap.touch_offset = Vector2Subtract([touch.event.pageX, touch.event.pageY], entities.minimap.offset);
          break;
        
        case "move":
          if (entities.minimap.touch_id == touch.id) {
            entities.minimap.offset = Vector2Subtract([touch.event.pageX, touch.event.pageY], entities.minimap.touch_offset);
          }
          break;

        case "end":
          entities.minimap.touch_id = null;
          entities.minimap.touch_offset = [0,0];
      }
    }
  });

  return entities;
};
