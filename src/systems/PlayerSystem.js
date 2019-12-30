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
                renderer: Player
            }

            entities[updated_state_player.id] = player;            
        }
        else {
            let player = entities[updated_state_player.id];
            //receive lerp data            
            player.from_lerp_package = updated_state_player.from_lerp_package;
            player.to_lerp_package = updated_state_player.to_lerp_package;
            
            //TODO: for testing, just set position to latest packet received
            // let last_position = player.lerp_queue.length == 0 ? [0,0] : player.lerp_queue[player.lerp_queue.length-1].position;
            
            //TODO: lerping implementation
            // player.position = last_position;
            
            let from = updated_state_player.from_lerp_package;
            let to = updated_state_player.to_lerp_package;

            // console.log(player)
            
            if(from && to) {
                let time_frame = to.timestamp - from.timestamp;
                player.position[0] = Lerp(from.position[0], to.position[0], player.lerp_progress);
                player.position[1] = Lerp(from.position[1], to.position[1], player.lerp_progress);
                
                //reached destination
                if(player.lerp_progress >= 1) {

                    //destination is new starting point
                    updated_state_player.from_lerp_package = to;
                    
                    //if got no more packages to receive
                    if(updated_state_player.lerp_queue.length == 0) {
                        // console.log('no more packages');                        
                        updated_state_player.to_lerp_package = null;
                    }
                    else {
                        updated_state_player.to_lerp_package = updated_state_player.lerp_queue[0];                        
                        updated_state_player.lerp_queue.splice(0, 1);
                        // console.log('reset lerp progress');
                        player.lerp_progress = 0;                                                
                    }
                }
                else {
                    player.lerp_progress += time.delta/time_frame;
                }
                
                console.log(updated_state_player.lerp_queue.length);
            }

            if(from && !to) {
                player.position = from.position;                
            }

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