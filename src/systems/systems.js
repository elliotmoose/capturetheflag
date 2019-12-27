import { players } from "../managers/gamemanager";

export const JoystickSystem = (entities, { touches }) => {
    const joytstick_reach = 10; //lets the joystick exceed the outer bounds

    touches.forEach(t => {
        let joystick = entities["joystick"];
        
        if(joystick.type != "joystick") {
            return;
        }

        //if there is a touch already controlling the jostick
        if(joystick.touch_id != null) {
            if(joystick.touch_id == t.id) {
                if(t.type == "end") {
                    joystick.touch_id = null;
                    joystick.active = false;
                    joystick.angle = null;
                    joystick.innerPosition = [0,0];
                }

                if(t.type == "move") {
                    let temp_x = t.event.pageX - joystick.outerPosition[0];
                    let temp_y = t.event.pageY - joystick.outerPosition[1];        
                            
                    let max_dist = joystick.outerRadius - joystick.innerRadius + joytstick_reach; 
                    let dist_from_center = Math.min(Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2)), max_dist); 
                    // dist_from_center = Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2));
                    let angle = Math.atan2(temp_y,temp_x);
        
                    let x = dist_from_center * Math.cos(angle);
                    let y = dist_from_center * Math.sin(angle);
        
                    joystick.innerPosition = [x,y];

                    joystick.angle = angle;
                }
            }
            else {
                return; //not the touch you want
            }
        }
        else {
            //capture this touch if it is in range
            let touch_x_relative = t.event.pageX - joystick.outerPosition[0];
            let touch_y_relative = t.event.pageY - joystick.outerPosition[1];    
            let touch_range = Math.sqrt(Math.pow(touch_x_relative, 2) + Math.pow(touch_y_relative, 2));
            let joystick_max_dist = joystick.outerRadius + joytstick_reach;
            let touch_in_joystick = (touch_range <= joystick_max_dist);
            if(t.type == "start" && touch_in_joystick) {
                joystick.touch_id = t.id;
                let max_dist = joystick.outerRadius - joystick.innerRadius + joytstick_reach; 
                let dist_from_center = Math.min(Math.sqrt(Math.pow(touch_x_relative, 2) + Math.pow(touch_y_relative,2)), max_dist); 
                // dist_from_center = Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2));
                let angle = Math.atan2(touch_y_relative,touch_x_relative);
    
                let x = dist_from_center * Math.cos(angle);
                let y = dist_from_center * Math.sin(angle);
                joystick.innerPosition = [x, y];
                joystick.active = true;
                joystick.angle = angle;
            }
        }

    });

    return entities;
};

export const PlayerUpdater = (entities) => {    
    
    let angle = entities["joystick"].angle;

    if(angle) {
        Object.values(entities).filter(e => e.type=='player').forEach((entity, index)=>{
            if(!entity.speed) {
                return;
            }
            
            let x = entity.position[0] + entity.speed * Math.cos(angle);
            let y = entity.position[1] + entity.speed * Math.sin(angle);
            entity.position = [x,y];
            
            // if(players[index])
            // {
            //     entity.position = players[index].position;
            // }
        })
    }



    return entities;
};