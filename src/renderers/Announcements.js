import React, { PureComponent, Component } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { UI } from "../constants/UI";
import { EventRegister } from "react-native-event-listeners";
import { Colors } from "../constants/Colors";
import * as GameManager from '../managers/gamemanager'

export default class Announcements extends Component {

    state = {
        layout: 'SUBTITLE',
        title_font_size: 0,
        subtitle_font_size: 0,
        title: '',
        subtitle: '',
        opacity: new Animated.Value(0)
    }

    componentWillMount() {
        this.announcement_event_listener = EventRegister.on('ANNOUNCEMENT', (announcement)=>this.showAnnouncement(announcement));
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.announcement_event_listener);
    }

    renderTextWithShadow(text, fontSize) {
        if(text == 'back to lobby') {
            return <TouchableOpacity onPress={()=>GameManager.RequestBackToLobby()}>
                <Text style={{ position: 'absolute', left: 3, top: 4, fontFamily: 'Endless Boss Battle', fontSize: fontSize, color: 'black', textAlign: 'center'}}>{text}</Text>
                <Text style={{ fontFamily: 'Endless Boss Battle', fontSize: fontSize, color: Colors.yellow, textAlign: 'center'}}>{text}</Text>
            </TouchableOpacity>
        }

        return <View>
            <Text style={{ position: 'absolute', left: 3, top: 4, fontFamily: 'Endless Boss Battle', fontSize: fontSize, color: 'black', textAlign: 'center'}}>{text}</Text>
            <Text style={{ fontFamily: 'Endless Boss Battle', fontSize: fontSize, color: 'white', textAlign: 'center'}}>{text}</Text>
        </View>
    }

    showAnnouncement(announcement) {
        //layouts = SUBTITLE/LARGE/SMALL
        let layout = announcement.layout;        
        let title_font_size = layout == 'LARGE' ? UI.announcements.layout.LARGE_FONT_SIZE : (layout == 'SUBTITLE' ? UI.announcements.layout.TITLE_FONT_SIZE : UI.announcements.layout.SMALL_FONT_SIZE);
        let subtitle_font_size = layout == 'SUBTITLE' ? UI.announcements.layout.SUBTITLE_FONT_SIZE : 0;
        let title = announcement.title
        let subtitle = announcement.subtitle
        
        let duration = announcement.duration == 'LONG' ? UI.announcements.animation.DURATION_LONG : announcement.duration == 'SHORT' ? UI.announcements.animation.DURATION_SHORT : UI.announcements.animation.DURATION_V_SHORT;
        this.setState({layout, title, subtitle, title_font_size, subtitle_font_size, opacity: new Animated.Value(1)});
        
        if(this.animation !== undefined) {
            this.animation.stop();            
        }

        if(this.animation_timer !== undefined) {
            clearTimeout(this.animation_timer);
        }
        
        if(announcement.duration == 'FOREVER') {
            return;
        }

        this.animation_timer = setTimeout(() => {
            this.setState({opacity: new Animated.Value(1)});
            if(this.animation != undefined) {
                this.animation.stop();
            }

            this.animation = Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300
            });

            this.animation.start();            
        }, duration);
    }

    render() {        
        return (
            <Animated.View style={{ position: "absolute", width: "100%", height: '100%', zIndex: UI.announcements.zIndex, alignItems: "center", justifyContent: 'center', opacity: this.state.opacity }}>
                <View style={{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <Text style={{ fontFamily: 'Endless Boss Battle', fontSize: title_font_size, color: 'white', textAlign: 'center'}}>{title}</Text>
                    {this.state.announcement.layout == 'SUBTITLE' && <Text style={{ fontFamily: 'Endless Boss Battle', fontSize: subtitle_font_size, color: 'white', textAlign: 'center'}}>{subtitle}</Text>} */}
                    {this.renderTextWithShadow(this.state.title, this.state.title_font_size)}
                    {this.state.layout == 'SUBTITLE' && this.renderTextWithShadow(this.state.subtitle, this.state.subtitle_font_size)}
                </View>
            </Animated.View>
        );
    }
}