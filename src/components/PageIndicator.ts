import { Color } from "../../src/configs/Color";
import { BaseElement } from "./BaseElement";



class PageIndicator extends BaseElement {

    Percentage: BaseElement;
    IndicateNumber: BaseElement;

    constructor(maxPage = 2){
        super('div', {
            position:"absolute",
            backgroundColor: Color.Dark1,
            width:'100%',
            bottom:0,
            right:0,
            padding:"10px 10px",
            display:"flex",
            alignItems:'center',
            justifyContent:"space-between"
        })


        this.Percentage = new BaseElement('div', {
            flex:1,
            height:'3px',
            backgroundColor:Color.Dark2
        });

        this.IndicateNumber = new BaseElement('span',{
            fontSize:'12px',
            paddingLeft:"5px",
            color: Color.Primary1
        })
        this.IndicateNumber.root.innerText = `6/${maxPage}`
        this.root.appendChild(this.Percentage.root)
        this.root.appendChild(this.IndicateNumber.root)

    }
}


export { 
    PageIndicator
}