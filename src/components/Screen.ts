import { BaseElement } from "./BaseElement";
import * as CSS from 'csstype';
import { ShadowElement } from "./ShadowElement";
import { Color } from "../configs/Color";
import { ImageGrid } from "./ImageGrid";
import { CarouselImages } from "./CarouselImages";
import { AudioPlayer } from "../modules/AudioPlayer";
import { PageIndicator } from "./PageIndicator";
import { CarouselText } from "./CarouselText";
import { MediaItem } from "./MediaItem";
import { AudioSequence } from "../../src/modules/AudioSequence";


function li(a, b, n) {
    return (1 - n) * a + n * b;
}




class Screen extends ShadowElement {

    contentText: string = '';

    MediaContainer: BaseElement;
    ContentContainer: BaseElement;
    Pagination: PageIndicator;


    activePage: number = 0;
    mediaDisplayType: string;

    MediaPages: any[];

    LastActiveIndex: number = 0;

    AudioBackgroundSequence: AudioSequence;

    data: any = null;

    constructor(data: any) {

        super('div',
            {
                flex: 1,
                display: "block",
                height: 'calc(100vh - 40px)',
                position: "relative",
                userSelect: "none",
            },
            {
                wrapperInitialStyle: {
                    height: "100%",
                    position: "relative",
                    userSelect: "none",
                },
                styleSheet: {
                    ':host': {
                        'color': Color.Primary1
                    },
                    '*': {
                        'box-sizing': 'border-box'
                    },
                    'input[type="number"]::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none'
                    },
                    '.wrapper': {
                        display: "flex",
                        'flex-direction': "row",
                    },
                    '.media-container': {
                        'transition': "all ease 0.6s",
                        flex: "1.618",
                        position: "relative",
                        padding: '0px'
                    },
                    '.content-container': {
                        transition: "ease-in-out 0.6s",
                        opacity: 0.8,
                    },
                    '.content-container:hover': {
                        opacity: 1
                    },

                    '.content-wrapper':{
                        width:"46.2%",
                    },

                    '@media only screen and (max-width: 800px)': {
                        '.media-container': {
                            flex: "none",
                            height: '42vh',
                            padding: "5px 5px",
                        },
                        '.wrapper': {
                            "flex-direction": "column"
                        },
                        '.content-wrapper': {
                            width:"100%",
                        },
                    },
                    '@media only screen and (max-width: 600px)': {
                        '.media-container': {
                            flex: "none",
                            height: '24vh',
                            padding: "5px 5px",

                        },
                        '.wrapper': {
                            "flex-direction": "column"
                        },
                        '.content-wrapper': {
                            width:"100%",
                        },
                    },
                    '::-webkit-scrollbar': {
                        width: '0px',
                        height: '0px'
                    },
                    '::-webkit-scrollbar-track': {
                        "box-shadow": `inset 0 0 5px ${Color.Dark2}`,
                        "border-left": "2px solid transparent",
                        "border-right": "2px solid transparent",
                        background: 'transparent'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: '#555',
                        "border-radius": '1px',
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },

                }
            });

        this.data = data
        // preventIframeFlash()
        this.shadowElementRoot.className = 'wrapper'

        var music = data.pages.map(item => item.music)

        this.AudioBackgroundSequence = new AudioSequence(music)
        this.AudioBackgroundSequence.player.play()

        this.MediaContainer = new BaseElement('div', {
            position: "relative",
            // border:`1px solid ${Color.Dark2}`,
            background: Color.Black
        })
        this.MediaContainer.root.className = 'media-container'

        this.MediaPages = data.pages.map(item => {
            
            let mediaDisplay = item.media.find(item => item.type == 'youtube') ? 'slides' : 'grid'
            mediaDisplay = item.mediaType || mediaDisplay
            if (mediaDisplay == 'grid') {
                let media = new ImageGrid(item.media, {
                    maxCols: 3,
                    maxImgPerCol: 2
                })
                return media
            }
            else {
                let media = new CarouselImages(item.media)
                return media
            }
        })


        this.MediaContainer.root.appendChild(this.MediaPages[0].root)

        // let carousel = new CarouselImages(data.pages[this.activePage].media)

        let carouselText = new CarouselText(data.pages.map(item => ({ content: item.content })))

        let contentContainerWrapper = new BaseElement('div', {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            

        })

        contentContainerWrapper.root.className = 'content-wrapper'

        // this.MediaContainer.root.appendChild(carousel.root)


        this.ContentContainer = new BaseElement('div', {
            position: "relative",
            overflow: 'scroll',
            flex: 1,
            background: Color.Dark1
        })




        this.ContentContainer.root.appendChild(carouselText.root)
        this.ContentContainer.root.className = 'content-container'
        this.Pagination = new PageIndicator(data.pages.length)

        contentContainerWrapper.root.appendChild(this.ContentContainer.root)
        contentContainerWrapper.root.appendChild(this.Pagination.root)
        this.shadowElementRoot.appendChild(this.MediaContainer.root);
        this.shadowElementRoot.appendChild(contentContainerWrapper.root);




        carouselText.onPageChange = () => {

            // set iframe hidden
            this.MediaPages[this.activePage]?.MediaNodes?.map((node: MediaItem) => {
                node?.setIframeVisibility('hidden')
            })
 
            if(data.pages[carouselText.index].media?.length){
                this.MediaContainer.root.removeChild(this.MediaPages[this.LastActiveIndex].root)
            }
                
            this.activePage = carouselText.index
            if(data.pages[carouselText.index].media?.length){
                this.LastActiveIndex = carouselText.index
                this.MediaContainer.root.appendChild(this.MediaPages[this.activePage].root)
            }
                
            this.AudioBackgroundSequence.currentSessionIndex = this.activePage
            this.Pagination.currentPage = carouselText.index + 1
            this.Pagination.updatePercentage()
            // let mediaDisplay = data.pages[this.activePage].find(item => item.type == 'youtube') ? 'slides' : 'grid'

        }



        




    }


    cleanUp = () => {
        this.AudioBackgroundSequence.pause()
    }


}


export {
    Screen
}