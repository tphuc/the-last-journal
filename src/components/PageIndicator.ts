import { Color } from "../../src/configs/Color";
import { BaseElement } from "./BaseElement";



class PageIndicator extends BaseElement {

    Percentage: BaseElement;
    PercentageBar: BaseElement;
    IndicateNumber: BaseElement;
    currentPage = 1;
    total = 0;

    constructor(total = 3){
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

        this.total = total;

        this.Percentage = new BaseElement('div', {
            position:"relative",
            flex:1,
            height:'3px',
            backgroundColor:Color.Dark2,
            width:"100%",
        });

        this.PercentageBar = new BaseElement('div', {
            position:"absolute",
            top:0,
            width:0,
            height:'100%',
            transition:"width 0.6s ease",
            backgroundColor: Color.Primary1
        })

        this.IndicateNumber = new BaseElement('span',{
            fontSize:'12px',
            paddingLeft:"5px",
            color: Color.Primary1
        })
        this.Percentage.root.appendChild(this.PercentageBar.root)
       
        this.root.appendChild(this.Percentage.root)
        this.root.appendChild(this.IndicateNumber.root)
        this.updatePercentage()

    }

    updatePercentage = () => {
        this.IndicateNumber.root.innerText = `${this.currentPage} / ${this.total}`
        this.PercentageBar.root.style.width = `${ this.total ? this.currentPage / this.total * 100 : 100}%`
    }
}


export { 
    PageIndicator
}