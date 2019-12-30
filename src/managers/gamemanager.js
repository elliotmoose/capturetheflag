
import io from 'socket.io-client';
import Player from '../renderers/Player';

export var players = []; 
const server = 'http://localhost:3000';
var socket = io(server);

export var InitializeSocketIO = ()=>{
    socket.on('connect', ()=>console.log('connected to lobby'));        
    socket.on('JOIN_ROOM_CONFIRMED', (namespace)=> JoinRoom(namespace));
}

export var FindMatch = () => {
    socket.emit("REQUEST_FIND_MATCH");
}

export var JoinRoom = (namespace)=>{
    socket = io(`${server}/${namespace}`);
    socket.on('GAME_STATE', (state)=>OnReceiveGameState(state));
}

export var OnReceiveGameState = (state)=>{        
    for(let new_state_player of state.players) {
        //find the equivalent player to update by their id
        let player_index_ref = players.findIndex((e)=>e.id == new_state_player.id);
        
        //if this player has never been rendered -> we must add them into the array for the first time
        if(player_index_ref == -1) {            
            /*the template object received is used to initialize the player object in the array
            this object does not include:
            1. renderer (added in player system)
            2. type (added in player system)
            3. lerp[] (added in this step)            
            */
            new_state_player.lerp = [];//lerp object array
            new_state_player.lerp_from_position = new_state_player.position;
            new_state_player.lerp_to_position = new_state_player.position;
            new_state_player.lerp_progress = 0; //0 to 1, a value to signify th
            new_state_player.lerp_time_frame = 0;
            players.push(new_state_player);             
        }
        else {
            //has been rendered before, so we append the updates into the lerp array
            let player = players[player_index_ref];
            let lerp_package = {
                position: new_state_player.position,
                timestamp: Date.now()
            }
            
            player.lerp.push(lerp_package);
            player.max_stamina = new_state_player.max_stamina;
            player.current_stamina = new_state_player.current_stamina;
            player.sprint_speed = new_state_player.sprint_speed;
            player.default_speed = new_state_player.default_speed;
            player.current_speed = new_state_player.current_speed;
            player.size = new_state_player.size;
            player.reach = new_state_player.reach;
            player.action = new_state_player.action;
            player.sprint = new_state_player.sprint;   
        }        
    }
}

export var SendControls = (controls)=>{    
    socket.emit('CONTROLS', controls)
}