import { BaseElement } from "./BaseElement";
import { ShadowElement } from "./ShadowElement";
import * as CSS from 'csstype';
import { Color } from "../../src/configs/Color";


class ImageMedia extends BaseElement {

    ImageModal: ShadowElement = null;
    _CloseBtn: BaseElement = null;
    constructor(url: string){
        super('img', {
            width:"100%"
        });

        this.root.onclick = this.openModal;
        this.root.setAttribute('src', url);
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
                }
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
        var imgClone = new BaseElement('img', {
            'width':"100%",
            maxHeight:"100vh",
            objectFit:"contain"
        })
        imgClone.root.setAttribute('src', url);
        imgClone.root.className = 'modal-content'
        this.ImageModal.shadowElementRoot.appendChild(imgClone.root)

        
    }

    openModal = (e) => {
        document.body.appendChild(this.ImageModal.root)
    }

    closeModal = (e) => {
        document.body.removeChild(this.ImageModal.root)
    }



} 

class ImageGrid extends ShadowElement {

    maxCols = 3;
    maxImgPerCol = 5;

    _cols = [];
    a: string;

    constructor(images: { url: string, style?: CSS.Properties }[] = [], 
        options?: {
            maxCols?: number, 
            maxImgPerCol?: number
    }) {
        super('div',
            {
                width: "100%",
                height: "100%"
            },
            {
                wrapperInitialStyle: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '0 4px',
                },
                styleSheet: {
                    ':host':{
                        'overflow-y':"scroll"
                    },
                    '.column': {
                        'flex': '25%',
                        'max-width': '48%',
                        'padding': '0 4px',
                    },
                    '.column img': {
                        animation:"fade 0.8s ease",

                        'transition':"all ease 0.5s",
                        'margin-top': '8px',
                        // 'max-height': '30vh',
                        'height':"auto",
                        'vertical-align': 'middle',
                        'background-size': 'contain',
                        'background-repeat': 'no-repeat',
                        'width': '100%',
                    },
                    '@media screen and (max-width: 1200px)': {
                        '.column': {
                            '-ms-flex': '50%',
                            'flex': '50%',
                            'max-width': '50%'
                        }
                    },
                    '@media screen and (max-width: 800px)': {
                        '.column': {
                            '-ms-flex': '100%',
                            'flex': '100%',
                            'max-width': '100%'
                        }
                    },
                    ':host::-webkit-scrollbar' :{
                        width: '5px',
                        height:'10px'
                    },
                    ':host::-webkit-scrollbar-track': {
                        "box-shadow": `inset 0 0 5px ${Color.Dark2}`,
                        "border-left":"2px solid transparent",
                        "border-right": "2px solid transparent",
                        background:  'transparent'
                    },
                    ':host::-webkit-scrollbar-thumb': {
                        background: '#555', 
                        "border-radius":'1px',
                    },
                    ':host::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },

                    '@keyframes fade': {
                        from: {
                            transform:'scale(0.33)',
                            opacity:'0.1'
                        }, 
                        'to': {
                            transform: 'scale(1)',
                            opacity:'1'
                        }
                    },



                },

            });
        
        if(options){
            this.maxCols = options.maxCols
            this.maxImgPerCol = options.maxImgPerCol
        }

        for (var i = 0; i < this.maxCols; i++) {
            var col = new BaseElement('div', {})
            col.root.className = 'column'
            this._cols.push(col);
            this.shadowElementRoot.appendChild(col.root);
        }

        for (var i = 0; i < images.length; i++) {
            var colIndex = Math.round(i / this.maxImgPerCol);
            var img = new ImageMedia(images[i].url);
            this._cols[colIndex].root.appendChild(img.root)
        }

    }


}


export {
    ImageGrid
}