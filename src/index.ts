import { BaseElement } from "./components/BaseElement";
import { HeaderBarController } from "./components/HeaderBar";
import { Screen } from "./components/Screen";
import Navigo from "navigo";
import { Pages } from "./pages";
import { firestore } from './firebase'
const data = require('./testdata.json')
window.onpopstate = () => {
    console.log(window.location.origin)
}


const clean = () => {
    document.body.removeChild(document.getElementById('root'))
    let root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
}




console.log(window.location.origin)
const router = new Navigo('/',  { hash: true });

var PagesControl = new Pages(router) 

router
    .on("/", ({data}) => {
        console.log('home', router.getCurrentLocation())
    //    if(router.getCurrentLocation().url != ''){
    //        router.navigate(router.getCurrentLocation().url)
    //    }
        clean()
        PagesControl.home()
    })
    .on("/posts/:name", ({data}) => {
        console.log('post', window.location)

        clean()
        PagesControl.renderPost(data.name)
    })
    .resolve(window.location.pathname);














