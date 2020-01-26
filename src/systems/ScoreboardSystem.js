import { scoreboard } from "../managers/gamemanager";
import { Colors } from "../constants/Colors";

export const ScoreboardSystem = (entities) => {    
    let scoreboard_entity = entities['scoreboard'];
    scoreboard_entity.score = scoreboard.score;
    // let time_diff = (Date.now()-scoreboard.start_time);        
    let displayed_time = scoreboard.remainding_time;
    let minutes = displayed_time/60000;    
    let seconds = (displayed_time % 60000)/1000;    

    if(displayed_time < 30*1000) {
        scoreboard_entity.time_color = Colors.red;
    }
    else {
        scoreboard_entity.time_color = 'white';
    }

    if(displayed_time > 0) {
        scoreboard_entity.time = `${Math.floor(minutes)}:${Math.floor(seconds)}`;    
    }
    else {
        scoreboard_entity.time == 'GAMEOVER'
    }
    return entities;
};

