import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";
import * as CSS from 'csstype';
import { Color } from "../configs/Color";
import { MediaItem, MediaTypes } from "./MediaItem";




class CarouselImages extends ShadowElement {

    a: string;
    MediaNodes: any[];
    BtnNext: BaseElement;
    BtnPrev: BaseElement;
    Slides: BaseElement;
    index: number = 0;

    constructor(images: { url: string, style?: CSS.Properties, type?: MediaTypes}[] = []) {
        super('div',
            {
                position:'relative',
                width: "100%",
                height: "100%"
            },
            {
                wrapperInitialStyle: {
                    width: "100%",
                    height: "100%",
                    position:"relative",
                    overflow:"hidden"
                },
                styleSheet: {
                    '.carousel-item':{
                        "box-sizing":"border-box",
                        padding:"2px",
                        'min-width':"100%",
                        'display': 'flex',
                        'object-fit':"contain",
                        'justify-content': 'center',
                        'align-items': 'center',
                        'text-align': 'center',
                        'color': '#fff',
                        'font-size': '20px',
                        'scroll-snap-align':"center",
                    },

                    '::-webkit-scrollbar' :{
                        width: '5px',
                        height:'0px'
                    },
                    '::-webkit-scrollbar-track': {
                        "box-shadow": `inset 0 0 5px ${Color.Dark2}`,
                        "border-left":"2px solid transparent",
                        "border-right": "2px solid transparent",
                        background:  'transparent'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: '#555', 
                        "border-radius":'1px',
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                    '.carousel-item > img':{
                        'transition': '0.6s ease',
                        opacity:0.82
                    },
                    '.carousel-item > img:hover':{
                        opacity:1
                    },
                    'control-next':{
                        'background-color': "rgba(0,0,0,0.2)",
                    },
                    'control-next:hover':{
                        'background-color':"rgba(0,0,0,0.6)",
                    },
                    'control-prev':{
                        'background-color': "rgba(0,0,0,0.2)",
                    },
                    'control-prev:hover':{
                        'background-color':"rgba(0,0,0,0.6)",
                    }


                },

            });


        this.Slides = new BaseElement('div', {
            boxSizing:"border-box",
            position:'relative',
            width:"100%",
            height:"100%",
            overflowX:"auto",
            whiteSpace:"nowrap",
            display:"flex",
            scrollSnapType:"x mandatory",
            WebkitOverflowScrolling: 'touch',
            scrollBehavior:"smooth",
        })
        this.shadowElementRoot.appendChild(this.Slides.root)

        this.MediaNodes = images.map((item, index) => {
            var media = new MediaItem(item.url, item.type, index)
            media.root.className='carousel-item'
            this.Slides.root.appendChild(media.root)
            return media;
        })

        this.BtnNext = new BaseElement('div', {
            position:'absolute',
            bottom:'calc(50% - 17px)',
            right:0,
            margin:'10px',
            width:'22px',
            height:'22px',
            cursor:"pointer",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: '80%',
            padding:'5px',
            borderRadius:'20px',
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20.243' height='13.501' viewBox='0 0 20.243 13.501'%3E%3Cpath id='Icon_ionic-ios-arrow-round-forward' data-name='Icon ionic-ios-arrow-round-forward' d='M20.784,11.51a.919.919,0,0,0-.007,1.294l4.275,4.282H8.782a.914.914,0,0,0,0,1.828H25.045L20.77,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,20.784,11.51Z' transform='translate(-7.875 -11.251)' fill='%23efeff4'/%3E%3C/svg%3E%0A")`
          
        });
        this.BtnNext.root.className = 'control-next'

        this.BtnNext.root.onclick = () => {
            var index = Math.round(this.Slides.root.scrollLeft / this.Slides.root.clientWidth)
            this.Slides.root.scroll({ 
                left: this.Slides.root.clientWidth * (index+1),
                top:0,
                behavior:"smooth"
            })
        }
    
        this.BtnPrev = new BaseElement('div', {
            position:'absolute',
            bottom:'calc(50% - 17px)',
            left:0,
            margin:'10px',
            width:'22px',
            height:'22px',
            cursor:"pointer",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: '80%',
            padding:'5px',
            borderRadius:'20px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20.243' height='13.501' viewBox='0 0 20.243 13.501'%3E%3Cpath id='Icon_ionic-ios-arrow-round-back' data-name='Icon ionic-ios-arrow-round-back' d='M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H27.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z' transform='translate(-7.882 -11.251)' fill='%23efeff4'/%3E%3C/svg%3E%0A")`

        })
        this.BtnPrev.root.className = 'control-prev'

        this.BtnPrev.root.onclick = () => {
            var index = Math.round(this.Slides.root.scrollLeft / this.Slides.root.clientWidth)
            this.Slides.root.scroll({ 
                left: this.Slides.root.clientWidth * Math.max(0, index-1),
                top:0,
                behavior:"smooth"
            })
        }

        if(images.length > 1){
            this.shadowElementRoot.appendChild(this.BtnNext.root)
            this.shadowElementRoot.appendChild(this.BtnPrev.root)
        }
        

        
    }


}


export {
    CarouselImages
}