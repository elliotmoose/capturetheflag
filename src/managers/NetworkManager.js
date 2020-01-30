import {Platform} from 'react-native'
import {Errors} from '../constants/Strings';
import { api_domain } from '../constants/Config';
import * as DeviceInfo from 'react-native-device-info';

// import Config from '../constants/Config';

export var NetworkSignupNewPlayer = async (username) => {
    let url = api_domain + '/signup';
    let device_id = DeviceInfo.default.getUniqueId();
    
    let params = {
        username,
        device_id
    }

    try {        
        let response = await JsonRequest('POST', url, params);

        if(response.status == 'ERROR' || response.status == 'EXCEPTION')
        {
            throw response.error
        }
        else if(response.status == 'SUCCESS')
        {
            return response.data

        }
    } catch (error) {
        // console.log(error)
        // error.message = url;
        throw error;
        
    }
}

export var NetworkVerifyPlayer = async (user_id) => {
    let url = api_domain + '/login';
    let device_id = DeviceInfo.default.getUniqueId();
    
    let params = {
        user_id,
        device_id
    }

    try {        
        let response = await JsonRequest('POST', url, params);

        if(response.status == 'ERROR' || response.status == 'EXCEPTION')
        {
            
            if(response.error) {
                throw response.error
            }
        }
        else if(response.status == 'SUCCESS')
        {
            return response.data
        }
    } catch (error) {
        // console.log(error)
        // error.message = url;
        throw error;
        
    }
}

export var JsonRequest = async (method,url,body) => 
{
    //log in to server
    var data = {
        method: method,
        credentials: 'same-origin',
        mode: 'same-origin',        
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'mooselliot'
        }
    }

    let getParams = ''
    if(method == 'POST')
    {     
        data.body = JSON.stringify(body);
    }    
    else if (method == 'GET')
    {
        getParams = '?'

        Object.keys(body).map((key, index)=>{
            let value = body[key];
            index != 0 && (getParams += '&');
            getParams += `${key}=${value}`;
        })
    }

    try
    {
        console.log(url+getParams);
        let response = await fetch(url+getParams,data);     
        let jsonResponse = await response.json();
        return jsonResponse
    }
    catch(e)
    {
        console.log(url)
        console.log(e)        
        
        throw Errors.NO_INTERNET;
    }    
}

