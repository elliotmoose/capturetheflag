import io from 'socket.io-client';
import Player from '../renderers/Player';
import { EventRegister } from 'react-native-event-listeners';

export var players = [];
export var flags = [];
export var scoreboard = {
    score: [],
    start_time: 0
}
export var map = {};
export var player_id = null;

export var server = 'http://localhost:3000';

export var socket;

export var InitializeSocketIO = (target_server) => {
    console.log(`attempting to connect to ${target_server}...`)
    server = target_server
    socket = io(server);
    socket.on('connect', () => console.log('connected to lobby'));
    socket.on('JOIN_ROOM_CONFIRMED', namespace => JoinRoom(namespace));
    socket.on('FIND_MATCH_UPDATE', ({current_players, max_players}) => OnReceiveFindMatchUpdate(current_players, max_players));
};

export var FindMatch = () => {
    if(socket) {
        socket.emit('REQUEST_FIND_MATCH');
    }
};

export var OnReceiveFindMatchUpdate = (current_players, max_players) => {
    EventRegister.emit('FIND_MATCH_UPDATE', {current_players, max_players});
}


export var JoinRoom = namespace => {
    socket = io(`${server}/${namespace}`);
    socket.on('BIND_PLAYER', id => OnReceivePlayerBind(id));
    socket.on('INIT_MAP', state => OnReceiveGameMap(state));
    socket.on('GAME_STATE', state => OnReceiveGameState(state));
    socket.on('GAME_START', start_time => OnReceiveGameStart(start_time));
    socket.on('PING', ()=> OnReceivePing());
    EventRegister.emit('JOIN_ROOM_CONFIRMED');
};

let last_ping_date = Date.now();
export let ping = 0;

export var Ping = ()=>{
    if(socket) {
        last_ping_date = Date.now();
        socket.emit('PING');
    }
}

export var OnReceivePing = ()=>{
    ping = Date.now() - last_ping_date;
}

export var OnReceivePlayerBind = (id) => {
    player_id = id;
}
export var OnReceiveGameMap = (new_map) => {
    map = new_map;
}

export var OnReceiveGameStart = (start_time) => {
    scoreboard.start_time = start_time;    
}

export var OnReceiveGameState = (state) => {
    players = state.players;
    flags = state.flags;
    scoreboard.score = state.score;
}

export var SendControls = controls => {
    socket.emit('CONTROLS', controls);
};