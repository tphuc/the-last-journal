import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";
import * as CSS from 'csstype';
import { Color } from "../configs/Color";
import { MediaItem, MediaTypes } from "./MediaItem";
import anime from 'animejs'



class CarouselText extends ShadowElement {

    a: string;
    MediaNodes: any[];
    BtnNext: BaseElement;
    BtnPrev: BaseElement;
    Slides: BaseElement;
    index: number = 0;

    onPageChange: () => void;

    constructor(pages: { content: string }[] = []) {
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
                },
                styleSheet: {
                    '.carousel-item-text':{
                        "position":"relative",
                        "box-sizing":"border-box",
                        padding:"20px 20px",
                        'min-width':"100%",
                        'color': '#fff',
                        'scroll-snap-align':"center",
                        'overflow':"hidden"
                       
                    },
                    '::-webkit-scrollbar' :{
                        width: '0px',
                        height:'0px'
                    },
                    'a': {
                        color:"#faa"
                    }

                  


                },

            });


        this.Slides = new BaseElement('div', {
            boxSizing:"border-box",
            position:'relative',
            width:"100%",
            height:"100%",
            overflowX:"auto",
            display:"flex",
            flex:1,
            scrollSnapType:"x mandatory",
            WebkitOverflowScrolling: 'touch',
            scrollBehavior:"smooth",

            // transition:"0.6s ease-out"
        })
        this.shadowElementRoot.appendChild(this.Slides.root)

        this.MediaNodes = pages.map((item) => {
            let Content = new BaseElement('div', {
                position:"relative",
                width:"100%",
                overflowY:"scroll"
              
            })
            Content.root.className = 'carousel-item-text'
            Content.root.innerHTML = item.content
            this.Slides.root.appendChild(Content.root)
            return Content;
        })


        this.Slides.root.onscroll = (e: WheelEvent) => {
            var activeIndex = Math.round(this.Slides.root.scrollLeft / this.Slides.root.clientWidth)

            if(activeIndex != this.index){
                this.index = activeIndex;
                this.onPageChange && this.onPageChange()
            }
            var dx = this.Slides.root.scrollLeft % this.Slides.root.clientWidth;
            this.MediaNodes[activeIndex].root.style.opacity = `${Math.abs(dx - (this.Slides.root.clientWidth/2)) / (this.Slides.root.clientWidth/2)}`
        }



       


        
    }
}


export {
    CarouselText
}