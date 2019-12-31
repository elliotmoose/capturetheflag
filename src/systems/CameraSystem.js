import { Dimensions } from "react-native";

const { width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get("window"); //landscape
export const CameraSystem = (entities, { time }) => {
    let camera = entities['camera'];
    let joystick = entities['joystick'];

    //TODO: camera test
    if(joystick.active) {
        let angle = joystick.angle;
        // console.log(camera.position);
        let speed = 5;
        camera.position[0] += Math.cos(angle) * speed;
        camera.position[1] += Math.sin(angle) * speed;
    }

    // if(camera.target) {

    // }

    let player = Object.values(entities).filter(e=>e.type == 'player')[0];    
    if(player) {
        let x = player.position[0] - SCREENWIDTH/2;
        let y = player.position[1] - SCREENHEIGHT/2;
        camera.position = [x, y];
    }

    for(let entity of Object.values(entities)) {
        if(entity.position) {
            entity.render_position = [entity.position[0] - camera.position[0], entity.position[1] - camera.position[1]];
        }
    }

    return entities;
};
