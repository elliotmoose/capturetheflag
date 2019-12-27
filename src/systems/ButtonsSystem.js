
export const ButtonsSystem = (entities, { touches }) => {    

    touches.forEach(t => {
        Object.values(entities).filter(e => e.type == "button").forEach((button) => {
            if(t.type == "start" && button.touch_id == null) {                
                let distance_x = t.event.pageX - button.position[0];        
                let distance_y = t.event.pageY - button.position[1];
                let distance = Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));                
                let within_button = (distance <= button.radius);
    
                if(within_button) {                    
                    button.touch_id = t.id;
                    button.active = true;
                }
            }
            
            if(t.type == "end" && t.id == button.touch_id) {            
                button.touch_id = null;
                button.active = false;
            }
        }) ;
    });

    return entities;
};
