import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";


export type MediaTypes = 'img' | 'youtube';

class MediaItem extends BaseElement {

    ImageModal: ShadowElement = null;
    Content: BaseElement = null;
    _CloseBtn: BaseElement = null;
    url: string = '';
    
    constructor(url: string, type: MediaTypes = 'img', index?: number){
    
        super('div', {
            position:"relative",
            display:"flex",
            justifyContent:'center',
        });
        const htmlContentType: keyof HTMLElementTagNameMap = type == 'img' ? 'img' : 'iframe'
        this.url = url;
        var urlParams = type == 'youtube' ? `?autoplay=${index == 0 ? 1 : 0}&rel=0` : ''
        this.Content = new BaseElement(htmlContentType, {
            height:"100%",
            width:"100%",
            background:"black",
            objectFit: type == 'img' ? 'contain' : 'fill',
            border:"none",
            visibility: type == 'img' ? 'visible' : 'hidden',
        })
        this.Content.root.onclick = this.openModal;
        this.Content.root.setAttribute('src', url + urlParams);
        if(htmlContentType == 'iframe'){
           this.Content.root.onload = (e) => {
               this.Content.root.style.visibility = 'visible'
           }

           


        }

    
        
        this.Content.root.setAttribute('allowtransparency', 'true');
        this.Content.root.className = 'media-content'
        this.root.appendChild(this.Content.root)
        this.ImageModal = new ShadowElement('div', {
            position:"absolute",
            top:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:'rgba(0,0,0,0.66)',
        }, {
            wrapperInitialStyle: {
                height:"100vh",
                width:"100vw",
                display:"flex",
                justifyContent:'center',
                alignItems:"center"
            },
            styleSheet: {

                '@keyframes zoom': {
                    from: {
                        transform:'scale(0)'
                    }, 
                    'to': {
                        transform: 'scale(1)'
                    }
                },
                '.modal-content': {
                    "animation-name":'zoom',
                    "animation-duration":'0.6s',
                },
                '@media only screen and (max-width: 600px)': {
                    '.media-content':{
                        "min-height":'33vh'
                    },

                },

            }
        })

        this._CloseBtn = new BaseElement('div', {
            position:'fixed',
            top:0,
            right:0,
            margin:'10px',
            width:'16px',
            height:'16px',
            cursor:"pointer",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: 'contain',
            backgroundImage : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13.426' height='13.423' viewBox='0 0 13.426 13.423'%3E%3Cpath id='Icon_ionic-ios-close' data-name='Icon ionic-ios-close' d='M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z' transform='translate(-11.285 -11.289)' fill='%23dedede'/%3E%3C/svg%3E%0A")`
        })
        this._CloseBtn.root.onclick = this.closeModal
        this.ImageModal.shadowElementRoot.appendChild(this._CloseBtn.root);
        var imgClone = new BaseElement(type == 'img' ? 'img' : 'iframe', {
            maxHeight:"100vh",
            height:"100%",
            width:"100%",
           objectFit:"contain"
        })
        imgClone.root.setAttribute('src', url);
        imgClone.root.className = 'modal-content'
        this.ImageModal.shadowElementRoot.appendChild(imgClone.root)

        
    }

    setIframeVisibility = (value: 'visible' | 'hidden') => {
        if(this.Content.root.tagName  == 'IFRAME'){
            this.Content.root.style.visibility = value
        }
    }

    openModal = (e) => {
        document.body.appendChild(this.ImageModal.root)
    }

    closeModal = (e) => {
        document.body.removeChild(this.ImageModal.root)
    }



} 


export {
    MediaItem
}