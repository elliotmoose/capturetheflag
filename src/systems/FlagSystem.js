import { players, flags } from "../managers/gamemanager";
import Flag from "../renderers/Flag";
import { Vector2Subtract, Vector2Magnitude } from "../helpers/Vectors";
import { config } from "../managers/config";

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
            // console.log(updated_state_flag.position);
            
            if(flag.to_lerp_package && flag.from_lerp_package) {
                //the player's latest target position is not updated (aka we've received a new update)
                if(flag.to_lerp_package.position != updated_state_flag.position) {                         
                    let time_since_from = flag.lerp_progress * (flag.to_lerp_package.timestamp - flag.from_lerp_package.timestamp);
    
                    //update the start point to current
                    flag.from_lerp_package = {
                        position: JSON.parse(JSON.stringify(flag.position)),
                        // timestamp: flag.from_lerp_package.timestamp + time_since_from
                        timestamp: flag.to_lerp_package.timestamp
                    }
                        
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
                
                let gap = Vector2Magnitude(Vector2Subtract(flag.from_lerp_package.position, flag.to_lerp_package.position));
                if(gap > config.LERP_THRESHOLD) {
                    flag.lerp_progress = 1;
                }                
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

            // flag.position = updated_state_flag.position;                                   
        }
    }       


    return entities;
};