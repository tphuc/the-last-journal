import { Color } from "../../src/configs/Color";
import { BaseElement } from "../../src/components/BaseElement"
import { ShadowElement } from "../../src/components/ShadowElement";
import anime from 'animejs';
import { firestore } from "../../src/firebase";
import { Screen } from "../../src/components/Screen";
import { HeaderBarController } from "../../src/components/HeaderBar";
import { AudioPlayer } from "../../src/modules/AudioPlayer";
const Logo = require('../assets/logo_t.png')


function li(a, b, n) {
    return (1 - n) * a + n * b;
  }
  

// const data = {
// 	"title": "",
// 	"pages": [
// 		{
// 			"music": [],
// 			"media": [
// 				{
// 					"type": "img",
// 					"url": "https://firebasestorage.googleapis.com/v0/b/last-journal.appspot.com/o/images%2F181028-migrant-caravan-al-0906.jpg?alt=media&token=e99b2f11-50c2-49ff-92e3-72759628d46e"
// 				},
// 				{
// 					"type": "img",
// 					"url": "https://firebasestorage.googleapis.com/v0/b/last-journal.appspot.com/o/images%2Fcaravan_distance.png?alt=media&token=52c2b1ec-2a3f-4c7b-b580-36f898ac8858"
// 				},
// 				{
// 					"type": "img",
// 					"url": "https://firebasestorage.googleapis.com/v0/b/last-journal.appspot.com/o/images%2FScreen%20Shot%202021-08-28%20at%202.12.01%20PM.png?alt=media&token=d0a923f9-0018-4a92-b0ba-fee636bf833e"
// 				},
// 				{
// 					"type": "img",
// 					"url": "https://firebasestorage.googleapis.com/v0/b/last-journal.appspot.com/o/images%2FScreen%20Shot%202021-08-28%20at%202.11.43%20PM.png?alt=media&token=10c77ad2-6f5e-43f9-ba62-c6d4e9be6da0"
// 				},
// 				{
// 					"type": "img",
// 					"url": "https://firebasestorage.googleapis.com/v0/b/last-journal.appspot.com/o/images%2FScreen%20Shot%202021-08-28%20at%202.13.03%20PM.png?alt=media&token=e9ca371a-ed70-432f-a055-d81a50a3aeea"
// 				}
// 			],
// 			"content": "<p><em>Let's have a look at the migrant Caravan. Thousands of people fled their South American homes to look for a better future in the U.S. The trip covered two thousand miles in one and a half months in order to be on time for the America midterm elections as a political statement against President Trump. This means they walked an average of 45 miles a day on flip-flops or barefoot, 45 miles (72km) a day!</em></p>",
// 			"mediaType": "grid"
// 		}
// 	]
// }
  

const posts = [
    {
        name: "Greeting: A word from JFK",
        id: 'greeting',
    },

]

const fallOfTheCabalSeries = [
    {
        name: "P1. The end of the world as we know it: Things that make you go hmmm...",
        id: 'FOC1',
    },
    {
        name: "P2. Down the rabbit hole",
        id: 'FOC2',
    },
    {
        name: "P3. The Alien Invasion",
        id: 'FOC3',
    },
]

const covid19Series = [
    {
        name: 'Covid19 Plandemic and Predictive Programming',
        id:'CV19-PLANDEMIC'
    },
    {
        name: 'PCR Testing: A Critical Examination',
        id:'PCR-CriticalExamination'
    }
]

const promotesNRelated = [
    {
        name: "The Mirror Project documentay P1",
        id: 'TMP1',
    },
]


class Pages {

    listeners: { [k: string]: any };
    router: any;

    constructor(router){
        this.router = router;
    }

    home = () => {
        AudioPlayer.clean()
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

        var tableOfContent = new BaseElement('h3', {
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


       
       
        posts.map((item) => {
            let El = new BaseElement('a', {
                display:"block",
                color: Color.Primary1,
                padding:"10px 0px",
                cursor:"pointer",
                textDecoration:"underline"
            })

            El.root.innerText = item.name;
            El.root.onclick = () => {
                this.router.navigate(`/posts/${item.id}`)
            }
           postWrapper.root.appendChild(El.root)
        })

        //-----------------------------------------
        var fallofcabal = new BaseElement('p', {
            marginTop:'50px',
            color: Color.Primary1,
            fontWeight:600,
        })
        fallofcabal.root.innerText = 'The fall of the Cabal series (10 parts)'
        postWrapper.root.appendChild(fallofcabal.root)
        fallOfTheCabalSeries.map((item) => {
            let El = new BaseElement('a', {
                display:"block",
                color: Color.Primary1,
                padding:"10px 0px",
                cursor:"pointer",
                textDecoration:"underline"
            })

            El.root.innerText = item.name;
            El.root.onclick = () => {
                this.router.navigate(`/posts/${item.id}`)
            }
           postWrapper.root.appendChild(El.root)
        })

        //-----------------------------------------
         var covid19 = new BaseElement('p', {
            marginTop:'50px',
            fontWeight:600,
            color: Color.Primary1
        })
        covid19.root.innerText = 'Covid 19'
        postWrapper.root.appendChild(covid19.root)
        covid19Series.map((item) => {
            let El = new BaseElement('a', {
                display:"block",
                color: Color.Primary1,
                padding:"10px 0px",
                cursor:"pointer",
                textDecoration:"underline"
            })

            El.root.innerText = item.name;
            El.root.onclick = () => {
                this.router.navigate(`/posts/${item.id}`)
            }
           postWrapper.root.appendChild(El.root)
        })

        //-----------------------------------------
        var promote = new BaseElement('p', {
            marginTop:'50px',
            fontWeight:600,
            color: Color.Primary1
        })
        promote.root.innerText = 'Promotes and related contents'
        postWrapper.root.appendChild(promote.root)
        promotesNRelated.map((item) => {
            let El = new BaseElement('a', {
                display:"block",
                color: Color.Primary1,
                padding:"10px 0px",
                cursor:"pointer",
                textDecoration:"underline"
            })

            El.root.innerText = item.name;
            El.root.onclick = () => {
                this.router.navigate(`/posts/${item.id}`)
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

        anime.timeline()
  
        .add({
            targets: title.root.querySelectorAll('.letter'),
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1250,
            delay: (el, i) => 50 * (i + 1)
        })
        .add({
            targets: postWrapper.root,
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
        })


    }






    renderPost = async (id: string) => {

        AudioPlayer.clean()
        let res = await firestore.collection('posts').doc(id).get()
        let data = null;
        if(res.exists){
            data = res.data()
        }
    
        let page = new Screen(data);
    
        let Flex = new BaseElement('div', {
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh"
        })
    
    
        let root = document.getElementById('root')
        let HeaderBar = new HeaderBarController(data?.title || '')
        HeaderBar.Logo.root.onclick = () => {
            window.location.replace('/')
        }
        HeaderBar.Backlogo.root.onclick = () => {
            window.location.replace('/')
        }


        root.appendChild(Flex.root)
        Flex.root.appendChild(HeaderBar.root)
    
        HeaderBar.SoundPlayerIcon.onPlay = () => {
            page.AudioBackgroundSequence.play()
        }
    
        HeaderBar.SoundPlayerIcon.onPause = () => {
            page.AudioBackgroundSequence.pause()
        }
    
    
    
        Flex.root.appendChild(page.root)
    }


}


export {
    Pages
}