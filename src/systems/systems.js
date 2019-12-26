import { players } from "../managers/gamemanager";

export const MoveFinger = (entities, { touches }) => {

    //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
    //-- That said, it's probably worth considering performance implications in either case.
    // if(entities.players && entities.players.length != 0)
    // {
    //     console.log(entities.players);
    //     return;
    // }
    
    // console.log(entities);
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
                    joystick.innerPosition = [0,0];
                }

                if(t.type == "move") {
                    let temp_x = t.event.pageX - joystick.outerPosition[0];
                    let temp_y = t.event.pageY - joystick.outerPosition[1];        
        
                    let max_dist = joystick.outerRadius - joystick.innerRadius;
                    let dist_from_center = Math.min(Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2)), max_dist); 
                    // dist_from_center = Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2));
                    let angle = Math.atan2(temp_y,temp_x);
        
                    let x = dist_from_center * Math.cos(angle);
                    let y = dist_from_center * Math.sin(angle);
        
                    joystick.innerPosition = [x,y];
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
            let touch_in_joystick = (touch_range <= joystick.outerRadius);
            if(t.type == "start" && touch_in_joystick) {
                joystick.touch_id = t.id;
                joystick.innerPosition = [touch_x_relative, touch_y_relative];
            }
        }

    });

    return entities;
};

export const PlayerUpdater = (entities) => {    
        
    Object.values(entities).filter(e => e.type=='player').forEach((entity, index)=>{
        if(players[index])
        {
            entity.position = players[index].position;
        }
    })

    return entities;
};