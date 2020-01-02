import io from 'socket.io-client';
import Player from '../renderers/Player';

export var players = []; 
export var flags = []; 
export var map = {};
export var player_id = null;

const server = 'http://localhost:3000';
var socket = io(server);

export var InitializeSocketIO = () => {
  socket.on('connect', () => console.log('connected to lobby'));
  socket.on('JOIN_ROOM_CONFIRMED', namespace => JoinRoom(namespace));
};

export var FindMatch = () => {
  socket.emit('REQUEST_FIND_MATCH');
};

export var JoinRoom = namespace => {
  socket = io(`${server}/${namespace}`);
  socket.on('BIND_PLAYER', id => OnReceivePlayerBind(id));
  socket.on('INIT_MAP', state => OnReceiveGameMap(state));
  socket.on('GAME_STATE', state => OnReceiveGameState(state));
};

export var OnReceivePlayerBind = (id)=>{        
    player_id = id;
}
export var OnReceiveGameMap = (new_map)=>{        
    map = new_map;
}
export var OnReceiveGameState = (state)=>{            
    players = state.players;        
    flags = state.flags;
}

export var SendControls = controls => {
  socket.emit('CONTROLS', controls);
};
