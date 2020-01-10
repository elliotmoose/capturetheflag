import io from 'socket.io-client';
import Player from '../renderers/Player';
import { EventRegister } from 'react-native-event-listeners';
import { logged_in_user } from './UserManager';
export var players = [];
export var flags = [];
export var scoreboard = {
    score: [],
    start_time: 0
}
export var map = {};

export var server = 'http://localhost:3000';

export var socket;

export var InitializeSocketIO = (target_server) => {
    console.log(`attempting to connect to ${target_server}...`)
    server = target_server
    socket = io(server);
    socket.on('connect', () => console.log('connected to lobby'));

    //CUSTOM
    socket.on('LOBBY_ROOMS_UPDATE', rooms => OnReceiveLobbyRoomsUpdate(rooms));
    socket.on('COMMAND_JOIN_CUSTOM_ROOM', namespace => CommandJoinCustomRoom(namespace));

    //MATCHMAKING
    socket.on('COMMAND_JOIN_GAME_ROOM', namespace => CommandJoinGameRoom(namespace));
    socket.on('COMMAND_UPDATE_FIND_MATCH', ({current_players, max_players}) => OnReceiveFindMatchUpdate(current_players, max_players));

    //BOTH
    socket.on('JOIN_ROOM_FAILED', error => OnJoinRoomFailed(error));
};

export var OnReceiveFindMatchUpdate = (current_players, max_players) => {
    EventRegister.emit('FIND_MATCH_UPDATE', {current_players, max_players});
}

//#region CUSTOM
export var RequestLoadLobbyRooms = () => {
    socket.emit('REQUEST_LOAD_LOBBY_ROOMS');
}

export var OnReceiveLobbyRoomsUpdate = (rooms) => {
    EventRegister.emit('LOBBY_ROOMS_UPDATE', rooms);
}

export var RequestCreateCustomRoom = (room_name) => {    
    socket.emit('REQUEST_CREATE_CUSTOM_ROOM', {
        user_id: logged_in_user.id,
        room_name: room_name
    });
}

export var RequestJoinCustomRoom = (room_id) => {
    socket.emit('REQUEST_JOIN_CUSTOM_ROOM', room_id);
}

export var CommandJoinCustomRoom = namespace => {
    socket = io(`${server}/${namespace}`);
    socket.on('CUSTOM_ROOM_UPDATE', (room)=> OnReceiveCustomRoomLobbyUpdate(room));    
    socket.on('COMMAND_GET_USER_ID', ()=> OnCommandGetUserId()); //user_id must be set before user officially joins the room    
    socket.on('COMMAND_JOIN_GAME_ROOM', namespace => CommandJoinGameRoom(namespace));
    socket.on('disconnect', ()=>OnDisconnectCustomRoom());
    EventRegister.emit('JOIN_CUSTOM_ROOM_CONFIRMED');
}

export var OnCommandGetUserId = ()=>{
    if(socket && logged_in_user) {
        socket.emit('REQUEST_SET_USER_ID', {user_id: logged_in_user.id});
    }
}

export var OnReceiveCustomRoomLobbyUpdate = (room)=>{            
    EventRegister.emit('CUSTOM_ROOM_UPDATE', room);
}


export var RequestLeaveCustomRoom = () => {
    socket.disconnect();
    InitializeSocketIO(server);
}

export var OnDisconnectCustomRoom = () => {
    EventRegister.emit('DISCONNECTED_CUSTOM_ROOM');
}

export var RequestJoinTeam = (team) => {
    if(socket && logged_in_user) {
        socket.emit('REQUEST_JOIN_TEAM', {user_id: logged_in_user.id, team: team});
    }    
}
export var RequestStartGame = () => {
    if(socket && logged_in_user) {
        socket.emit('REQUEST_START_CUSTOM_GAME', {user_id: logged_in_user.id});
    }
}
//#endregion

export var RequestFindMatch = (matchmaking_type) => {
    if(socket) {
        socket.emit('REQUEST_FIND_MATCH', {user_id: logged_in_user.id, type: matchmaking_type});        
    }
}

export var CommandJoinGameRoom = namespace => {
    socket = io(`${server}/${namespace}`);
    socket.on('COMMAND_CONFIRM_CONNECT', () => ConfirmConnectGameRoom());
    socket.on('INIT_MAP', state => OnReceiveGameMap(state));
    socket.on('GAME_STATE', state => OnReceiveGameState(state));
    socket.on('GAME_START', start_time => OnReceiveGameStart(start_time));    
    socket.on('PING', ()=> OnReceivePing());
    EventRegister.emit('JOIN_ROOM_CONFIRMED');
};

export var ConfirmConnectGameRoom = () => {
    if(socket) {
        socket.emit('REQUEST_CONFIRM_CONNECT', {user_id: logged_in_user.id});
    }
}

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
    socket.emit('CONTROLS', {controls, user_id: logged_in_user.id});
};