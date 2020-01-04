import * as GameManager from "./gamemanager";

export let ping = 0;

let frames = 0;
let last_fps_report = 0;
let last_fps_report_time;
let last_ping_report_time;

/**
 * Called when a frame happens
 * reports the average fps in the last second
 */
export let frame_report = () => {
    if(last_fps_report_time == undefined) {
        last_fps_report_time = Date.now();
        return 60;
    }

    let time_since_last_report = Date.now()-last_fps_report_time;
    if(time_since_last_report > 1000) {
        last_fps_report_time = Date.now();
        last_fps_report = frames;
        frames = 0;
        return last_fps_report;
    }
    else {
        frames += 1;
        return last_fps_report;
    }
}

export let ping_report = () => {
    if(last_ping_report_time == undefined) {
        last_ping_report_time = Date.now();
        return 60;
    }

    let time_since_last_report = Date.now()-last_ping_report_time;
    if(time_since_last_report > 1000) {
        last_ping_report_time = Date.now();
        GameManager.Ping();        
    }    

    return GameManager.ping;
}

