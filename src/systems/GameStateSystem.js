import { map } from "../managers/gamemanager";
import Base from "../renderers/Base";

/**
 * Game State System should handle all game state changes (game begin, game score updating, game end screens etc)
 */
export const GameStateSystem = (entities, { touches }) => {

    // map.bounds    
    let game_state = entities['game'].state;

    switch(game_state) {
        case "GAME_BEGIN": 
            let bases = map.bases;
            

            if(bases) {
                for(let base of bases) {
                    if(entities[base.id] === undefined) {
                        entities[base.id] = {
                            type: 'base',
                            ...base,
                            render_position: [0,0],
                            renderer: Base
                        }
                    }
                }
            }            

            let bounds = map.bounds;

            if(bounds) {
                entities['map'].height = bounds.height;
                entities['map'].width = bounds.width;
            }
            break;
    }

    return entities;
};
