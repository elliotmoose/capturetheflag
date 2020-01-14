import { Dimensions } from "react-native";
// import { announcement } from "../managers/gamemanager"

const {width: SCREENWIDTH, height: SCREENHEIGHT} = Dimensions.get('window'); //landscape

export const AnnouncementSystem = (entities) => {

  entities.announcements.announcement = announcement;

  return entities;
};
