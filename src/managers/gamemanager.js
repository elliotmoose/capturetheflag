import io from 'socket.io-client';
import Player from '../renderers/Player';
import { EventRegister } from 'react-native-event-listeners';

export var players = [];
export var flags = [];
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
    EventRegister.emit('JOIN_ROOM_CONFIRMED');
};

export var OnReceivePlayerBind = (id) => {
    player_id = id;
}
export var OnReceiveGameMap = (new_map) => {
    map = new_map;
}
export var OnReceiveGameState = (state) => {
    players = state.players;
    flags = state.flags;
}

export var SendControls = controls => {
    socket.emit('CONTROLS', controls);
};