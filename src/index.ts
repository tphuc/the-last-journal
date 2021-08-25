import { BaseElement } from "./components/BaseElement";
import { HeaderBarController } from "./components/HeaderBar";
import { Screen } from "./components/Screen";
import Navigo from "navigo";
import { Pages } from "./pages";


window.onpopstate = () => {
    console.log(window.location.origin)
}

var PagesControl = new Pages() 

function test() {


    let page = new Screen();
    let Flex = new BaseElement('div', {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh"
    })


    let root = document.getElementById('root')

    let HeaderBar = new HeaderBarController('The end of the worlds as we know it')

    root.appendChild(Flex.root)
    Flex.root.appendChild(HeaderBar.root)
    Flex.root.appendChild(page.root)
}

console.log(window.location.origin)
const router = new Navigo('/',  { hash: true });

router
    .on("/", () => {
        router.navigate('/posts/123')
        PagesControl.home()
    })
    .on("/posts/:name", () => {

        document.body.removeChild(document.getElementById('root'))

        let root = document.createElement('div')
        root.id = 'root'
        document.body.appendChild(root)
        test()
    })
    .resolve(window.location.pathname);














