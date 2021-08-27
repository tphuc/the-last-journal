import { Color } from "../../src/configs/Color";
import { BaseElement } from "../../src/components/BaseElement"
import { ShadowElement } from "../../src/components/ShadowElement";
import anime from 'animejs';
const Logo = require('../assets/logo_t.png')


function li(a, b, n) {
    return (1 - n) * a + n * b;
  }
  
  

const fakeData = [
    {
        name: "Introduction: President and the Press",
        url: '/posts/123',
        timestamp: new Date()
    },
    {
        name: "Fall of the Cabal (part 1): Things that make you go hmmm",
        timestamp: new Date()
    },
]

class Pages {

    listeners: { [k: string]: any };
    router: any;

    constructor(router){
        this.router = router;
    }

    home = () => {
        var Centered = new ShadowElement('div', {
            position: "relative",
            height:"1500px",
            width: "100%"
        }, {
            wrapperInitialStyle: {
                width: "100%"
            },
            styleSheet: {
                '.centered': {
                    "box-sizing": "border-box",
                    position: "absolute",
                    width: "100%",
                    display: "flex",
                    "flex-direction": 'column',
                    "justify-content": 'center',
                    "align-items": "center",
                    padding: "0px 20vw"
                },
                '.input-wrapper:before': {
                    content: `""`,
                    position: 'absolute',
                    top: '0',
                    left: '-20px',
                    width: '20px',
                    height: '100%',
                    "z-index": 100,
                    "background-size": "contain",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "background-image": `url("data:image/svg+xml,%3Csvg fill='%23aaa' xmlns='http://www.w3.org/2000/svg' width='27' height='27.007' viewBox='0 0 27 27.007'%3E%3Cpath fill='inherit' id='Icon_ionic-ios-search' data-name='Icon ionic-ios-search' d='M31.184,29.545l-7.509-7.58a10.7,10.7,0,1,0-1.624,1.645l7.46,7.53a1.156,1.156,0,0,0,1.631.042A1.163,1.163,0,0,0,31.184,29.545ZM15.265,23.7a8.45,8.45,0,1,1,5.977-2.475A8.4,8.4,0,0,1,15.265,23.7Z' transform='translate(-4.5 -4.493)'/%3E%3C/svg%3E%0A")`,
                    transition: '.25s',
                },
                '@media only screen and (max-width: 900px)': {
                    '.centered': {
                        padding: "10vw"
                    },
                },
                '@media only screen and (max-width: 600px)': {
                    '.centered': {
                        padding: "10px"
                    },
                },
                '::-webkit-scrollbar' :{ 
                    width: 0 
                }
            }
        })

        Centered.shadowElementRoot.className = 'centered'

        var LogoElement = new BaseElement('img', {
            padding: "10px",
            width: '66px',
            height: '66px',
        });




        LogoElement.root.setAttribute('src', Logo)
        let title = new BaseElement('h1', {
            color: Color.Primary1,
            marginTop: 0,
            fontWeight: 400,
        })
        title.root.className = 'ml3'
        title.root.textContent = 'The Last Journal'
        title.root.innerHTML = title.root.textContent.replace(/\S/g, `<span style='color:${Color.Primary1};' class='letter'>$&</span>`);

        // .add({
        //     targets: LogoElement.root,
        //     opacity: [0, 1],
        //     easing: "easeInOutQuad",
        //     duration: 1120,
        //     delay: (el, i) => 150 * (i + 1)
        // })
        anime.timeline()
  
            .add({
                targets: title.root.querySelectorAll('.letter'),
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 2250,
                delay: (el, i) => 150 * (i + 1)
            })
        var root = document.getElementById('root');
        var inputWrapper = new BaseElement('div', {
            position: "relative"
        })
        inputWrapper.root.className = 'input-wrapper';

        
        var SearchInput = new BaseElement('input', {
            minWidth: "200px",
            padding: "5px 10px",
            fontSize: "16px",
            background: 'transparent',
            outline: "none",
            color: '#bbb',
            border: "none",
            borderBottom: `1px solid ${Color.Dark2}`
        });
        SearchInput.root.setAttribute('placeholder', 'search for content...')
        SearchInput.root.setAttribute('type', 'text')
        // inputWrapper.root.appendChild(SearchInput.root)

        var tableOfContent = new BaseElement('h4', {
            color: Color.Primary1
        })
        tableOfContent.root.innerText = 'Table of contents'

        var postWrapper = new BaseElement('div', {
            marginTop:'50px',
            marginBottom:"100px",
            minHeight: '900px'
        })

       

        Centered.shadowElementRoot.appendChild(LogoElement.root)
        Centered.shadowElementRoot.appendChild(title.root)
        Centered.shadowElementRoot.appendChild(inputWrapper.root)
        postWrapper.root.appendChild(document.createElement('hr'))
        postWrapper.root.appendChild(tableOfContent.root)
        root.appendChild(Centered.root);
        Centered.shadowElementRoot.appendChild(postWrapper.root)


       
       
        fakeData.map((item) => {
            let El = new BaseElement('a', {
                display:"block",
                color: Color.Primary1,
                padding:"10px 0px",
                cursor:"pointer",
                textDecoration:"underline"
            })

            El.root.innerText = item.name;
            El.root.onclick = () => {
                this.router.navigate(item.url)
            }
           postWrapper.root.appendChild(El.root)
        })

        var disclaimerTitle = new BaseElement('h4', {
            color: Color.Primary1
        })
        disclaimerTitle.root.innerText = 'Disclaimer'
        
        var disclaimerText = `The materials appearing on this website do not constitute legal advice and are provided for general information purposes only. No warranty, whether express or implied is given in relation to such materials.` 
        var disclaimerTextNode = new BaseElement('p', {
            color: Color.Primary1,
            textAlign:"center"
        })
        disclaimerTextNode.root.innerText = disclaimerText

        Centered.shadowElementRoot.appendChild(document.createElement('hr'))
        Centered.shadowElementRoot.appendChild(disclaimerTitle.root)
        Centered.shadowElementRoot.appendChild(disclaimerTextNode.root)

        var copyright = new BaseElement('p',
        {
            color: Color.Primary1
        })

        copyright.root.innerText = 'Copyright © 2021-2022'
        Centered.shadowElementRoot.appendChild(copyright.root)


    }

}


export {
    Pages
}