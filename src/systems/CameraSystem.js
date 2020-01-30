import {Dimensions} from 'react-native';
import { GetLoggedInUser } from '../managers/UserManager';

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape
export const CameraSystem = (entities, {time}) => {
  let camera = entities['camera'];
  let joystick = entities['joystick'];
  
  //camera movement if no target
  if (joystick.active) {
    let angle = joystick.angle;    
    let speed = 5;
    camera.position[0] += Math.cos(angle) * speed;
    camera.position[1] += Math.sin(angle) * speed;
  }

  let logged_in_user = GetLoggedInUser();
  if(logged_in_user) {
    let player = Object.values(entities).filter(e => e.id == logged_in_user.id)[0];
  
    if (player) {
      let x = player.position[0] - SCREENWIDTH / 2;
      let y = player.position[1] - SCREENHEIGHT / 2;
      camera.position = [x, y];
    }
  }

  for (let entity of Object.values(entities)) {
    if (entity.position) {
      entity.render_position = [
        entity.position[0] - camera.position[0],
        entity.position[1] - camera.position[1],
      ];
    }
  }

  return entities;
};
