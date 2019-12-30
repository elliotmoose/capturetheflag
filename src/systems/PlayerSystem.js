import { players } from "../managers/gamemanager";
import Player from "../renderers/Player";

const Lerp = (from, to, progress) => {
    return from + (to-from) * progress;
}

export const PlayerSystem = (entities, {time}) => {    
    for(let updated_state_player of players){                
        if(entities[updated_state_player.id] === undefined) {
            //the player entity is same as the player object except for its renderer and type attributes
            let player = {
                ...updated_state_player,
                type: 'player',
                from_lerp_package: null,
                to_lerp_package: null,
                lerp_progress: 0,
                renderer: Player
            }
            
            entities[updated_state_player.id] = player;            
        }
        else {
            let player = entities[updated_state_player.id];            
            
            if(player.to_lerp_package && player.from_lerp_package) {
                //the player's latest target position is not updated (aka we've received a new update)
                if(player.to_lerp_package.position != updated_state_player.position) {                                    
                    let time_since_from = player.lerp_progress * (player.to_lerp_package.timestamp - player.from_lerp_package.timestamp);
    
                    //update the start point to current
                    player.from_lerp_package = {
                        position: player.position,
                        timestamp: player.from_lerp_package.timestamp + time_since_from
                    }
    
                    //lets update the target position and time
                    player.to_lerp_package = {
                        position: updated_state_player.position,
                        timestamp: Date.now()
                    }

                    //reset progress
                    player.lerp_progress = 0;
                }

                let time_frame = player.to_lerp_package.timestamp - player.from_lerp_package.timestamp;
                player.lerp_progress = Math.min(1, player.lerp_progress + time.delta/time_frame);
                player.position[0] = Lerp(player.from_lerp_package.position[0], player.to_lerp_package.position[0], player.lerp_progress);
                player.position[1] = Lerp(player.from_lerp_package.position[1], player.to_lerp_package.position[1], player.lerp_progress);
            }
            else if (player.from_lerp_package) { //mid init (to_lerp_package == null)
                //lets update the target position and time
                player.to_lerp_package = {
                    position: updated_state_player.position,
                    timestamp: Date.now()
                }

                //reset progress
                player.lerp_progress = 0;
            }
            else { //init
                //lets update the target position and time
                player.from_lerp_package = {
                    position: updated_state_player.position,
                    timestamp: Date.now()
                }
            }

            
            return entities;                      

            /*
            Lerp occurs in 3 scenarios:
            1. Init: from_lerp_package == null, to_lerp_package == null, lerp_queue.length == 0
            2. Mid-Init: from_lerp_package != null, to_lerp_package == null, lerp_queue.length == 0
            3. Post-Init from_lerp_package != null, to_lerp_package != null lerp_queue.length >= 0

            Scenario 1 and 2:
            We snap position. 
            if to_lerp_package == null:
                player.position = from_lerp_package == null ? [start_x,start_y] : from_lerp_package.position;

            Scenario 3:
            player.position = interpolate(from_position, to_position, progress)            
            time_frame = to_lerp_package.timestamp - from_lerp_package.timestamp                                    
            progress += (time.delta/time_frame) //because progress should increase relative to given time frame. 1 means we have reached destination

            if progress >= 1:
                progress = 0
                from_lerp_package = to_lerp_package

                if(lerp_queue != null)
                    to_lerp_package = lerp_queue[0]
                else                    
            */
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