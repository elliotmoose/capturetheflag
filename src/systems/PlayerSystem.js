export const PlayerSystem = (entities) => {    
    
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