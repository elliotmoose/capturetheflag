import { NetworkSignupNewPlayer } from "./NetworkManager";

export var logged_in_user = {
    // username: 'elliotmoose',
    // id: '12345',
    username: 'enyi',
    id: '54321',    
    // username: 'bgroud',
    // id: '12321',    
}

export var SignupNewPlayer = async (username) => {
    try {
        let player = await NetworkSignupNewPlayer(username);        
        return player;
    } catch (error) {
        if(error.statusText && error.message) {
            throw error;
        }
        else {
            throw {
                status: 'MALFORMED_RESPONSE',
                statusText: 'Error',
                message: error.message || `${error}`
            }
        }
    }

}