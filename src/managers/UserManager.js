import { NetworkSignupNewPlayer, NetworkVerifyPlayer } from "./NetworkManager";
import { EventRegister } from "react-native-event-listeners";
import { AsyncStorage } from "react-native";


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
        logged_in_user = player;
        AsyncStorage.setItem('LOGGED_IN_USER', JSON.stringify(logged_in_user));
        EventRegister.emit('USER_LOGGED_IN');

        return player;
    } catch (error) {
        if(error.statusText && error.message) {
            throw error;
        }
        else {
            console.log(error);
            throw {
                status: 'MALFORMED_RESPONSE',
                statusText: 'Error',
                message: error.message || `${error}`
            }
        }
    }
}

export var VerifyLoggedInUser = async () => {
    let userString = await AsyncStorage.getItem('LOGGED_IN_USER');
    if(userString) {
        try {
            let user = JSON.parse(userString);
            if(user.id) {                
                let player = await NetworkVerifyPlayer(user.id);        
                logged_in_user = player;
                EventRegister.emit('USER_VERIFICATION_RESULT', true);                            
            }
            else {
                EventRegister.emit('USER_VERIFICATION_RESULT', false);            
            }
        } catch (error) {
            EventRegister.emit('USER_VERIFICATION_RESULT', false);            
        }
    }
    else {
        EventRegister.emit('USER_VERIFICATION_RESULT', false);
    }
}