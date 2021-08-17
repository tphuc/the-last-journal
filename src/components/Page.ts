import { BaseElement } from "./BaseElement";
import * as CSS from 'csstype';
import { ShadowElement } from "./ShadowElement";
import { Color } from "../../src/configs/Color";
import { ImageGrid } from "./ImageGrid";
import { CarouselImages } from "./Carousel";
import { AudioPlayer } from "../../src/modules/AudioPlayer";



class Page extends ShadowElement {

    contentText: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Một số ít trong số tài liệu hiếm hoi tìm được có đề cập về một hội kín được cho là bí ẩn, quyền lực và có sự ảnh hưởng lớn nhất đến thế giới đó chính là Illuminati (Hội Khai Sáng). Có những tin đồn cho rằng tổ chức Illuminati vẫn chưa tan rã và vẫn còn hoạt động cho đến này nay, thành viên gia nhập Illuminati đều là những người có địa vị và tầm ảnh hưởng lớn đến xã hội. Vậy, liệu đó có phải là sự thật hay không thì hãy cùng mình tìm hiểu trong bài viết dưới đây nhé!';

    MediaContainer: BaseElement;
    ContentContainer: BaseElement;


    constructor(tag?: keyof HTMLElementTagNameMap, intitialStyle?: CSS.Properties){
        
        super('div',  
        {
            flex:1,
            display: "block",

            position: "relative",
            userSelect: "none",
        },
        {
            wrapperInitialStyle: {
                height:"100%",
                position: "relative",
                userSelect: "none",
            },
            styleSheet: {
                ':host':{
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
                    'flex-direction':"row",
                },
                '.media-container':{
                    'transition':"all ease 0.6s",
                    flex:"1.618",
                    position:"relative",
                    padding:'0px'
                },
                '.content-container':{
                    transition:"ease-in-out 0.6s",
                    opacity: 0.8
                },
                '.content-container:hover':{
                    opacity: 1
                },
               
                '@media only screen and (max-width: 800px)': {
                    '.media-container':{
                        flex:"none",
                        height:'42vh',
                        padding:"5px 5px"
                    },
                    '.wrapper':{
                        "flex-direction":"column"
                    }
                },
                '@media only screen and (max-width: 600px)': {
                    '.media-container':{
                        flex:"none",
                        height:'24vh',
                        padding:"5px 5px"
                    },
                    '.wrapper':{
                        "flex-direction":"column"
                    }
                },
                

            }
        });

        this.shadowElementRoot.className = 'wrapper'

        this.MediaContainer = new BaseElement('div', {
            position:"relative",
            maxHeight:"100vh",
            // border:`1px solid ${Color.Dark2}`,
            background:Color.Black
        })
        this.MediaContainer.root.className = 'media-container'

        var ImagesGallery = new ImageGrid([
            {
                url:"https://www.w3schools.com/w3images/wedding.jpg",
            },
            {
                url:"https://www.w3schools.com/w3images/rocks.jpg",
            },
            {
                url:"https://www.w3schools.com/w3images/underwater.jpg",
            },
            {
                url:"https://www.w3schools.com/w3images/wedding.jpg",
            },
            {
                url:"https://www.w3schools.com/w3images/ocean.jpg",
            }
        ],
        {
            maxCols: 2,
            maxImgPerCol:5
        })

        // this.MediaContainer.root.appendChild(ImagesGallery.root)

        let carousel = new CarouselImages([{
            url:"https://www.w3schools.com/w3images/wedding.jpg",
        },
        {
            url:"https://www.youtube.com/embed/ksb3KD6DfSI?controls=1&showinfo=0&rel=0&autoplay=0&loop=0&muted=0",
            type:"YT"
        }])
       this.MediaContainer.root.appendChild(carousel.root)


        this.ContentContainer = new BaseElement('div', {
            flex:1,
            padding:'20px 20px'
        })

        this.ContentContainer.root.innerHTML = this.contentText
        this.ContentContainer.root.className = 'content-container'

        this.shadowElementRoot.appendChild(this.MediaContainer.root);
        this.shadowElementRoot.appendChild(this.ContentContainer.root);
        
        // var audio = new AudioPlayer('https://www.fesliyanstudios.com/musicfiles/2020-10-27_-_Beyond_The_Stars_-_www.FesliyanStudios.com_Steve_Oxen/2020-10-27_-_Beyond_The_Stars_-_www.FesliyanStudios.com_Steve_Oxen.mp3')
        // audio.play()


 
    }

}


export {
    Page
}