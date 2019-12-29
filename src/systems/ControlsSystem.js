
export const ControlsSystem = (entities, { touches }) => {
    Object.values(entities).filter(entity => entity.type == "button").forEach((entity)=>{
        switch (entity.id) {
            case "sprint_button":
                if(entity.active) {
                    // Object.values(entities).filter(e => e.type=='player').forEach((player, index)=>{
                    //     if(player.current_stamina > 0){
                    //         player.current_speed = player.sprint_speed;
                    //     }
                    //     else {
                    //         player.current_speed = player.default_speed;
                    //     }
                        
                    //     player.current_stamina = Math.max(player.current_stamina - 1, 0);
                    // });
                }
                else {
                    // Object.values(entities).filter(e => e.type=='player').forEach((player, index)=>{
                    //     player.current_speed = player.default_speed;
                    //     player.current_stamina = Math.min(player.current_stamina + 1, 100);
                    // });                   
                }
                break;        
            default:
                break;
        }
    });

    return entities;
};
