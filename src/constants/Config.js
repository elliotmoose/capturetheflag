export const config = {
    LERP_THRESHOLD: 150,
    local: true
}

export const game_domain = config.local ? 'http://localhost:3000' : 'http://mooselliot.com:3000';
export const api_domain = game_domain + '/api/v1/';