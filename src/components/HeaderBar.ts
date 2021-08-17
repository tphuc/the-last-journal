import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";
import { Color } from "../../src/configs/Color";
import { SoundIcon } from "./SoundIcon";


const Logo = require('../assets/logo.png')

class HeaderBarController extends ShadowElement{

    Title: BaseElement;

    Logo: BaseElement;
    SoundPlayerIcon: SoundIcon;

    constructor(title: string){
        super('div', {
            position:"relative",
            height:"40px",
            background:'#000',
            borderBottom:`1px solid ${Color.Dark2}`
        }, {
            wrapperInitialStyle: {
                height:"100%",
                display:"flex",
                alignItems:"center"
            },
            styleSheet: {
                ':host':{
                    color: Color.Primary1
                }
            }
        })
        this.Title = new BaseElement('span', {
            padding:"0px 5px"
        })
        this.Title.root.className = 'title'
        this.Title.root.innerText = title
        this.Logo = new BaseElement('img', {
            width:'auto',
            height:'100%',
            borderRight:`1px solid ${Color.Dark2}`
        });

        this.Logo.root.setAttribute('src', Logo)
        this.shadowElementRoot.appendChild(this.Logo.root)
        this.shadowElementRoot.appendChild(this.Title.root)


        var flexEnd = new BaseElement('div', {
            marginLeft:"auto",
            marginRight:"5px"
        })
        this.shadowElementRoot.appendChild(flexEnd.root)
        this.SoundPlayerIcon = new SoundIcon();
        flexEnd.root.appendChild(this.SoundPlayerIcon.root)
        
    }
}


export {
    HeaderBarController
}