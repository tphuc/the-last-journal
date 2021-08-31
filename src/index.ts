import { BaseElement } from "./components/BaseElement";
import { HeaderBarController } from "./components/HeaderBar";
import { Screen } from "./components/Screen";
import Navigo from "navigo";
import { Pages } from "./pages";
import { firestore } from './firebase'
const data = require('./testdata.json')



const clean = () => {
    document.body.removeChild(document.getElementById('root'))
    let root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
}





const router = new Navigo('/',  { hash: true });

var PagesControl = new Pages(router) 

router
    .on("/", ({data}) => {
    //    if(router.getCurrentLocation().url != ''){
    //        router.navigate(router.getCurrentLocation().url)
    //    }
        clean()
        PagesControl.home()
    })
    .on("/posts/:name", ({data}) => {


        clean()
        PagesControl.renderPost(data.name)
    })
    .resolve(window.location.pathname);














