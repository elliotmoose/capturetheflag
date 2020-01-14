export const UI = {
    controls: {
        zIndex: 999
    },
    joystick : {
        outer_radius: 60,
        inner_radius: 30,
        left_margin: 72,
        bottom_margin: 32,
        zIndex: 999
    },
    action_buttons : {
        radius: 45,
        right_margin_near: 32,
        right_margin_far: 45,
        button_spacing: 24,
        bottom_margin: 32,
        zIndex: 999
    },
    minimap : {
        screen_scale: 0.5, //Ratio of height of minimap to height of screen
        flag_scale_factor: 5,  //Flags appear too small if we follow the main game scale. This factor helps to mitigate that
        zIndex: 999
    },
    base: {
        zIndex: 300,
    },
    player: {
        action_indicator: {
            zIndex: 100
        },
        stamina: {
            zIndex: 700
        },
        player_sprite: {
            zIndex: 500
        }        
    },
    flag: {
        zIndex: 600
    },
    scoreboard: {
        zIndex: 999
    },
    announcements: {
        zIndex: 999,
        fontSize: 15,
        animation : {
            DURATION_LONG : 2500,
            DURATION_SHORT : 1400,
            DURATION_V_SHORT : 700,
        },
        layout : {
            TITLE_FONT_SIZE: 42,
            SUBTITLE_FONT_SIZE: 18,
            LARGE_FONT_SIZE: 110,
            SMALL_FONT_SIZE: 20
        }
    }
}