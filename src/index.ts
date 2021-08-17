import { BaseElement } from "./components/BaseElement";
import { HeaderBarController } from "./components/HeaderBar";
import { Page } from "./components/Page";

let page = new Page();

let Flex = new BaseElement('div', {
    display:"flex",
    flexDirection:"column",
    width:"100vw",
    height:"100vh"
})


let root = document.getElementById('root')

let HeaderBar = new HeaderBarController('The end of the worlds as we know it')

root.appendChild(Flex.root)
Flex.root.appendChild(HeaderBar.root)
Flex.root.appendChild(page.root)


