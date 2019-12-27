
export const ControlsSystem = (entities, { touches }) => {
    Object.values(entities).filter(entity => entity.type == "button").forEach((entity)=>{
        switch (entity.id) {
            case "sprint_button":
                if(entity.active) {
                    Object.values(entities).filter(e => e.type=='player').forEach((entity, index)=>{
                        entity.speed = 10;
                    })
                }
                else {
                    Object.values(entities).filter(e => e.type=='player').forEach((entity, index)=>{
                        entity.speed = 4;
                    })                    
                }
                break;        
            default:
                break;
        }
    });

    return entities;
};
