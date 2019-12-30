import { players } from "../managers/gamemanager";
import Player from "../renderers/Player";

export const PlayerSystem = (entities) => {    
    for(let updated_state_player of players){
        if(entities[updated_state_player.id] === undefined) {
            //the player entity is same as the player object except for its renderer and type attributes
            let player = {
                ...updated_state_player,
                type: 'player',
                renderer: Player
            }

            entities[updated_state_player.id] = player;
            console.log(player);
        }
        else {
            let player = entities[updated_state_player.id];
            
            //TODO: for testing, just set position to latest packet received
            let last_position = player.lerp.length == 0 ? [0,0] : player.lerp[player.lerp.length-1].position;
            
            //TODO: lerping implementation
            player.position = last_position;
        }
    }    
    let angle = entities["joystick"].angle;

    if(angle) {
        Object.values(entities).filter(e => e.type=='player').forEach((entity, index)=>{
            if(!entity.current_speed) {
                return;
            }
            
            let x = entity.position[0] + entity.current_speed * Math.cos(angle);
            let y = entity.position[1] + entity.current_speed * Math.sin(angle);
            entity.position = [x,y];
            
            // if(players[index])
            // {
            //     entity.position = players[index].position;
            // }
        })
    }



    return entities;
};