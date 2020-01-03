import React, { PureComponent, useState, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Stamina from './Stamina';
import SpriteSheet from 'rn-sprite-sheet';
import Images from '../assets/Images';

export default class Player extends PureComponent {
    render() {    
        if(this.animating_direction === undefined) {
            this.animating_direction = 'down';
        }

        if(this.animating === undefined) {
            this.animating = false;
        }

        if(this.run_fps == undefined) {
            this.run_fps = 12;
        }
        
        let directions = ['right', 'downright', 'down', 'downleft', 'left', 'upleft', 'up', 'upright'];
        let character = 'character';        
        let source = Images[`${character}_${this.animating_direction}`];

        //TODO: change sprint to angle
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
        
        let radius = this.props.radius;
        let x = this.props.render_position[0] - radius;
        let y = this.props.render_position[1] - radius;

        let action_radius = this.props.radius + this.props.reach;
        let action_x = radius - action_radius;
        let action_y = radius - action_radius;

        let stamina_percentage = this.props.current_stamina / this.props.max_stamina;

        const stamina_width = 80;
        const stamina_height = 14;
        const stamina_margin_bottomm = 12;
        
        let shadow_radius = radius * 3/4;

        return (
            <View style={{ position: 'absolute', left: x, top: y, height: radius * 2, width: radius * 2, zIndex: 500 }}>
                {/* <View style={{position:'absolute',width: '100%', height: '100%', borderRadius: radius, backgroundColor: this.props.team == 0 ? 'yellow' : 'orange'}}/> */}
                <View style={{ position: 'absolute', width: '100%', height: '100%', left: -radius, top: -radius, borderRadius: radius, zIndex: 300 }}>
                    <SpriteSheet ref={ref => (this.sprite = ref)}
                        source={source}
                        columns={4}
                        rows={1}
                        animations={{ walk: [0, 1, 2, 3] }}
                        height={radius*4}
                        width={radius*4}
                    />
                </View>
                {/* <View style={{position: 'absolute',left: radius-shadow_radius, bottom: -shadow_radius, width:shadow_radius*2, height: shadow_radius*2,borderRadius: shadow_radius, opacity: 0.3, transform:[{scaleX:2}], backgroundColor:'black', zIndex: 200}}></View> */}
                <Stamina style={{ left: radius - stamina_width / 2, top: -(stamina_height + stamina_margin_bottomm), width: stamina_width, height: stamina_height }} percentage={stamina_percentage} />
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
        padding: 0,
    },
    action_indicator: {
        backgroundColor: 'black',
        zIndex: -100
    }
});
