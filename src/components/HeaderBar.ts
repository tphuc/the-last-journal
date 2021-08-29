import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";
import { Color } from "../../src/configs/Color";
import { SoundIcon } from "./SoundIcon";


const Logo = require('../assets/logo.png')

class HeaderBarController extends ShadowElement{

    Title: BaseElement;
    Backlogo: BaseElement;
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
            borderRight:`1px solid ${Color.Dark2}`,
            cursor:"pointer"
        });

        this.Backlogo = new BaseElement('div', {
            width: '32px',
            height:"16px",
            cursor:"pointer",
            backgroundSize:"contain",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.621' height='22.243' viewBox='0 0 12.621 22.243'%3E%3Cpath id='Icon_feather-chevron-left' data-name='Icon feather-chevron-left' d='M22.5,27l-9-9,9-9' transform='translate(-12 -6.879)' fill='none' stroke='%23bbb' stroke-linecap='round' stroke-linejoin='round' stroke-width='3'/%3E%3C/svg%3E%0A")`
        })
        this.Logo.root.setAttribute('src', Logo)
        this.shadowElementRoot.appendChild(this.Logo.root)
        this.shadowElementRoot.appendChild(this.Backlogo.root)
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