import { Color } from "../../src/configs/Color";
import { BaseElement } from "./BaseElement";
import anime from 'animejs'

class SoundIcon extends BaseElement {

    _col1: BaseElement;
    _col2: BaseElement;
    _col3: BaseElement;


    animation1: any;
    animation2: any;
    animation3: any;

    isPlaying: boolean = false;


    constructor() {
        super('div', {
            position: "relative",
            display: "flex",
            width: "44px",
            height: "20px",
            cursor:"pointer",
            // backgroundColor: Color.Dark1,
            padding:"5px 5px"
        })

        this._col1 = new BaseElement('div', {
            backgroundColor: Color.Dark2,

            height: "3px",

        });

        this._col2 = new BaseElement('div', {
            width: '52.35%',
            height: "3px",
            backgroundColor: Color.Dark2,

        });

        this._col3 = new BaseElement('div', {

            width: '32.36%',
            height: "3px",
            backgroundColor: Color.Dark2
        });

        var musicNote = new BaseElement('div', {
            width: "20px",
            height: "20px",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23aaa' width='16.601' height='29.236' viewBox='0 0 16.601 29.236'%3E%3Cpath id='Icon_ionic-ios-musical-note' data-name='Icon ionic-ios-musical-note' d='M25.615,3.389c-.33.063-8.3,1.695-8.592,1.751a.623.623,0,0,0-.57.563h0V23.639a1.939,1.939,0,0,1-.169.823,1.874,1.874,0,0,1-1.132.893c-.232.077-.548.148-.921.232-1.695.38-4.528,1.027-4.528,3.642a3.262,3.262,0,0,0,2.461,3.312,5.282,5.282,0,0,0,.97.07,8.322,8.322,0,0,0,3.6-.928,3.788,3.788,0,0,0,1.695-3.361V12.171a.558.558,0,0,1,.45-.548L25.4,10.287a1.129,1.129,0,0,0,.9-1.1V3.923A.556.556,0,0,0,25.615,3.389Z' transform='translate(-9.703 -3.375)' fill='inherit'/%3E%3C/svg%3E%0A")`
        })

        var flex = new BaseElement('div', {
            flex: 1,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        })

        flex.root.appendChild(this._col1.root);
        flex.root.appendChild(this._col2.root);
        flex.root.appendChild(this._col3.root);

        this.root.appendChild(musicNote.root)
        this.root.appendChild(flex.root)
        this.root.onclick = () => {
            if(this.isPlaying){
                this.pause()
            }
            else{
                this.play()
            }
        }
        this.play()
        
    }


    play = () => {

        if(!this.animation1)
            this.animation1 = anime({
                targets: this._col1.root,
                width: ['33%', '88%'],
                duration:800,
                direction: 'alternate',
                easing: 'easeInOutQuad',
                loop:true
            });

        if(!this.animation2)
            this.animation2 = anime({
                targets: this._col2.root,
                delay:100,
                width: ['33%', '66%'],
                duration:800,
                direction: 'alternate',
                easing: 'easeInOutQuad',
                loop:true
            });

        if(!this.animation3)
            this.animation3 = anime({
                targets: this._col3.root,
                delay:200,
                width: ['22%', '44%'],
                duration:800,
                direction: 'alternate',
                easing: 'easeInOutQuad',
                loop:true
            });


        this.animation1.play()
        this.animation2.play()
        this.animation3.play()
        this.isPlaying = true


    }

    pause = () => {
        this.animation1.pause()
        this.animation2.pause()
        this.animation3.pause()
        this.isPlaying = false
    }

}


export {
    SoundIcon
}