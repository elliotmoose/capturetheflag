import * as PerformanceReport from "../managers/PerformanceReport";

export const PerformanceSystem = (entities, { time }) => {    
   
    let performance = entities['performance'];
    performance.fps = PerformanceReport.frame_report();    
    performance.ping = PerformanceReport.ping_report();    
    

    return entities;
};
