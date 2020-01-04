import { scoreboard } from "../managers/gamemanager";

export const ScoreboardSystem = (entities) => {    
    let scoreboard_entity = entities['scoreboard'];
    scoreboard_entity.score = scoreboard.score;
    let time_diff = (Date.now()-scoreboard.start_time);        
    let minutes = time_diff/60000;    
    let seconds = (time_diff % 60000)/1000;    
    scoreboard_entity.time = `${Math.round(minutes)}:${Math.round(seconds)}`;    
    return entities;
};

