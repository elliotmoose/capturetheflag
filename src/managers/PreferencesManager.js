import { AsyncStorage } from 'react-native';


export const SOME_PREF_KEY = 'SOME_PREF_KEY';

export var some_pref = true;

export var load = async () => {
    try {
        some_pref = await AsyncStorage.getItem(SOME_PREF_KEY) == 'true';       
    } catch (error) {
        
    }
}

export var save = async () => {
    try {
        await AsyncStorage.setItem(SOME_PREF_KEY, `${some_pref}`);        
    } catch (error) {

    }
}

export var SetPref = async (key, value) => {
    switch (key) {
        case SOME_PREF_KEY:
            some_pref = value;
            await save();
            break;
        default:
            break;
    }
}
