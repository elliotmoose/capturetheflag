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
    touches.filter(t => t.type === "move" && t.id == 1).forEach(t => {
        let joystick = entities["joystick"];
        if (joystick.type == "joystick" && joystick.innerPosition && joystick.outerPosition) {
            //   console.error(t.event.locationX)
            // console.error(Object.keys(t.event))  // let old_x = joystick.innerPosition[0];
            // let old_y = joystick.innerPosition[1];
            
            let temp_x = t.event.pageX - joystick.outerPosition[0];
            let temp_y = t.event.pageY - joystick.outerPosition[1];        

            let max_dist = joystick.outerRadius - joystick.innerRadius;
            let dist_from_center = Math.min(Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2)), max_dist); 
            // dist_from_center = Math.sqrt(Math.pow(temp_x, 2) + Math.pow(temp_y,2));
            let angle = Math.atan2(temp_y,temp_x);

            let x = dist_from_center * Math.cos(angle);
            let y = dist_from_center * Math.sin(angle);

            joystick.innerPosition = [x,y];
            // entity.innerPosition = [
            //     entity.innerPosition[0] = t.event.pageX - entity.outerPosition[0],
            //     entity.innerPosition[1] = t.event.pageY - entity.outerPosition[1],
            // ];
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