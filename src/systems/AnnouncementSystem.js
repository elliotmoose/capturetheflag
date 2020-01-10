import { Dimensions } from "react-native";
import { announcements } from "../managers/gamemanager"

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape

export const AnnouncementSystem = (entities) => {

  entities.announcements.messages = announcements;

  return entities;
};
