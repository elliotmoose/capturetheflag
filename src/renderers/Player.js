import React, { PureComponent, useState, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Stamina from './Stamina';
import SpriteSheet from 'rn-sprite-sheet';
import Images from '../assets/Images';
import { UI } from '../constants/UI';
import { Colors } from '../constants/Colors';
import { config } from '../constants/Config';

export default class Player extends PureComponent {

    renderUsername() {
        let username_color = 'black'//this.props.team == 0 ? Colors.red : 'blue';
        let radius = this.props.radius;
        const stamina_margin_bottom = 24;
        const stamina_width = 80;
        const stamina_height = 14;

        return <View style={{position:'absolute', zIndex: 999, left: radius - stamina_width / 2, top: -(stamina_height + stamina_margin_bottom), width: stamina_width, height: stamina_height}}>
            <Text style={{marginTop: 3, textAlign: 'center', color: username_color, fontFamily: 'Endless Boss Battle', fontSize: 9, flex: 1}}>{this.props.username}</Text>
        </View>
    }

    render() {    
        let directions;
        let character;
        let source;

        if(config.animating) {
            if(this.animating_direction === undefined) {
                this.animating_direction = 'down';
            }
    
            if(this.animating === undefined) {
                this.animating = false;
            }
    
            if(this.run_fps == undefined) {
                this.run_fps = 12;
            }
            
            directions = ['right', 'downright', 'down', 'downleft', 'left', 'upleft', 'up', 'upright'];
            character = 'character';        
            source = Images[`${character}_${this.animating_direction}`];
    
            if(this.props.angle) {
                let index = Math.round((this.props.angle/Math.PI)*4);
                if(index < 0) {
                    index += 8;
                }
                
                let direction = directions[index];             
    
                if(this.sprite) {
    
                    let new_run_fps = this.props.current_speed*5; //declare here first because we need to check if it has changed                                 
    
                    if(!this.animating) {
                        this.animating = true;
                        this.sprite.play({type:'walk', fps: new_run_fps, loop: true});
                    }
                    else
                    {
                        if(this.animating_direction != direction) {//if the current direction does not match the new given direction                
                            this.sprite.play({type:'walk', fps: new_run_fps, loop: true});
                        }                
    
                        if(this.run_fps != new_run_fps) { //check if it has changed                        
                            this.sprite.play({type:'walk', fps: new_run_fps, loop: true});
                        }
                    }
    
                    this.run_fps = new_run_fps;
                }              
                
                this.animating_direction = direction;
            }
            else if(this.sprite && this.animating) { //if no angle but currently animating, stop           
                this.sprite.reset(); //stop so it remains in first frame
                this.animating = false; //reset
            }
        }
        
        
        let team_color = this.props.team == 0 ? Colors.red : 'blue';
        let radius = this.props.radius;
        let x = this.props.render_position[0] - radius;
        let y = this.props.render_position[1] - radius;

        let action_radius = this.props.radius + this.props.reach;
        let action_x = radius - action_radius;
        let action_y = radius - action_radius;

        let stamina_percentage = this.props.current_stamina / this.props.max_stamina;

        const stamina_width = 80;
        const stamina_height = 14;
        const stamina_margin_bottom = 24;
        let shadow_radius = radius / 2;

        return (
            <View style={{ position: 'absolute', left: x, top: y, height: radius * 2, width: radius * 2, zIndex: 500 }}>
                {!config.animating && <View style={{position:'absolute',width: '100%', height: '100%', borderRadius: radius, backgroundColor: this.props.team == 0 ? Colors.team_green : Colors.team_red}}/>}
                {config.animating && <View style={{ position: 'absolute', width: '100%', height: '100%', left: -radius, top: -radius, borderRadius: radius, zIndex: 300 }}>
                    <SpriteSheet ref={ref => this.sprite = ref}
                        source={source}
                        columns={4}
                        rows={1}
                        animations={{ walk: [0, 1, 2, 3] }}
                        height={radius*4}
                        width={radius*4}
                        imageStyle={{zIndex: UI.player.player_sprite.zIndex}}
                    />
                </View>}
                {config.animating && <View style={{position: 'absolute',left: radius-shadow_radius, bottom: -shadow_radius, width:shadow_radius*2, height: shadow_radius*2,borderRadius: shadow_radius, opacity: 0.3, transform:[{scaleX:2}], backgroundColor:'black', zIndex: 200}}></View>}
            <Stamina style={{ left: radius - stamina_width / 2, top: -(stamina_height + stamina_margin_bottom), width: stamina_width, height: stamina_height, zIndex: UI.player.stamina.zIndex }} percentage={stamina_percentage} team={this.props.team}/>                
                {this.renderUsername()}
                <View style={[styles.action_indicator, { left: action_x, top: action_y, borderRadius: action_radius, width: action_radius * 2, height: action_radius * 2, opacity: this.props.action ? 0.2 : 0 }]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#CCC',
        backgroundColor: 'yellow',
        position: 'absolute',
        padding: 0        
    },
    action_indicator: {
        backgroundColor: 'black',
        zIndex: UI.player.action_indicator.zIndex
    }
});
