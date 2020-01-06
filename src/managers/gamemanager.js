import io from 'socket.io-client';
import Player from '../renderers/Player';
import { EventRegister } from 'react-native-event-listeners';

export var user = {
    username: 'elliotmoose',
    id: 'elliotmoose'
}

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

    //CUSTOM
    socket.on('LOBBY_ROOMS_UPDATE', rooms => OnReceiveLobbyRoomsUpdate(rooms));
    socket.on('JOIN_CUSTOM_ROOM_CONFIRMED', namespace => JoinCustomRoomConfirmed(namespace));

    
    socket.on('JOIN_ROOM_CONFIRMED', namespace => JoinGameRoom(namespace));
    socket.on('JOIN_ROOM_FAILED', error => OnJoinRoomFailed(error));
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

export var RequestLoadLobbyRooms = () => {
    socket.emit('REQUEST_LOAD_LOBBY_ROOMS');
}

export var OnReceiveLobbyRoomsUpdate = (rooms) => {
    EventRegister.emit('LOBBY_ROOMS_UPDATE', rooms);
    console.log(rooms);
}

export var RequestCreateCustomRoom = () => {
    socket.emit('REQUEST_CREATE_CUSTOM_ROOM', {
        //TODO: put real user id
        user_id: 'elliotmoose',
        room_name: 'elliot\'s room'
    });
}

export var RequestJoinCustomRoom = (room_id) => {
    socket.emit('REQUEST_JOIN_CUSTOM_ROOM', room_id);
}

export var JoinCustomRoomConfirmed = namespace => {
    socket = io(`${server}/${namespace}`);
    socket.on('CUSTOM_ROOM_UPDATE', (room)=> OnReceiveCustomRoomLobbyUpdate(room));    
    EventRegister.emit('JOIN_CUSTOM_ROOM_CONFIRMED');
}

export var OnReceiveCustomRoomLobbyUpdate = (room)=>{        
    console.log(room);
    EventRegister.emit('CUSTOM_ROOM_UPDATE', room);
}

export var JoinGameRoom = namespace => {
    socket = io(`${server}/${namespace}`);
    socket.on('BIND_PLAYER', id => OnReceivePlayerBind(id));
    socket.on('INIT_MAP', state => OnReceiveGameMap(state));
    socket.on('GAME_STATE', state => OnReceiveGameState(state));
    socket.on('GAME_START', start_time => OnReceiveGameStart(start_time));    
    socket.on('PING', ()=> OnReceivePing());
    EventRegister.emit('JOIN_ROOM_CONFIRMED');
};

export var OnJoinRoomFailed = error => {
    EventRegister.emit('JOIN_ROOM_FAILED', error);
}

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