import { players, flags } from "../managers/gamemanager";
import Flag from "../renderers/Flag";

const Lerp = (from, to, progress) => {
    return from + (to-from) * progress;
}

export const FlagSystem = (entities, {time}) => {    
    for(let updated_state_flag of flags){                
        if(entities[updated_state_flag.id] === undefined) {
            //the player entity is same as the player object except for its renderer and type attributes
            let flag = {
                ...updated_state_flag,
                type: 'flag',
                from_lerp_package: null,
                to_lerp_package: null,
                lerp_progress: 0,
                renderer: Flag
            }
            
            entities[updated_state_flag.id] = flag;            
        }
        else {
            let flag = entities[updated_state_flag.id];            
            
            if(flag.to_lerp_package && flag.from_lerp_package) {
                //the player's latest target position is not updated (aka we've received a new update)
                if(flag.to_lerp_package.position != updated_state_flag.position) {                         
                    let time_since_from = flag.lerp_progress * (flag.to_lerp_package.timestamp - flag.from_lerp_package.timestamp);
    
                    //update the start point to current
                    flag.from_lerp_package = {
                        position: JSON.parse(JSON.stringify(flag.position)),
                        timestamp: flag.from_lerp_package.timestamp + time_since_from
                    }
    
                    console.log(time_since_from);
                    //lets update the target position and time
                    flag.to_lerp_package = {
                        position: updated_state_flag.position,
                        timestamp: Date.now()
                    }

                    //reset progress
                    flag.lerp_progress = 0;
                }

                let time_frame = flag.to_lerp_package.timestamp - flag.from_lerp_package.timestamp;                
                flag.lerp_progress = Math.min(1, flag.lerp_progress + time.delta/time_frame);
                flag.position[0] = Lerp(flag.from_lerp_package.position[0], flag.to_lerp_package.position[0], flag.lerp_progress);
                flag.position[1] = Lerp(flag.from_lerp_package.position[1], flag.to_lerp_package.position[1], flag.lerp_progress);
                // console.log(`from: ${player.from_lerp_package.position[1]}, to: ${player.to_lerp_package.position[1]}`);
            }
            else if (flag.from_lerp_package) { //mid init (to_lerp_package == null)
                //lets update the target position and time
                flag.to_lerp_package = {
                    position: updated_state_flag.position,
                    timestamp: Date.now()
                }

                //reset progress
                flag.lerp_progress = 0;
            }
            else { //init
                //lets update the target position and time
                flag.from_lerp_package = {
                    position: updated_state_flag.position,
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