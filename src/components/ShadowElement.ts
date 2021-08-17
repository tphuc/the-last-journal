import * as CSS from 'csstype'
import { BaseElement } from './BaseElement'


type CSSStyle = { [P in (CSS.Pseudos & CSS.AdvancedPseudos) | string]: CSS.PropertiesHyphen }
type DocumentStyleSheet = { [P in (CSS.Pseudos & CSS.AdvancedPseudos) | string]: CSS.PropertiesHyphen | CSSStyle }
/**
 * UI base class
 * @property {HTMLElement} root - HTML element
 */

interface ElementShadowOptions {
    styleSheet?: DocumentStyleSheet,
    wrapperInitialStyle?: CSS.Properties
}

/**
 * UI Wrapper for BaseElement. The foundation class for creating high-level UI element.
 * Element can be a shadow dom container, and will be able to apply internal css stylesheet on its own.
 * @extends BaseElement
 */
class ShadowElement extends BaseElement {
    isShadowElement: boolean = false;
    private ShadowElement: BaseElement;
    private StyleElement: HTMLStyleElement;
    // private StyleSheet: CSSStyleSheet;
    // private StyleSheetElement: CSSStyleSheet;
    constructor(tag: keyof HTMLElementTagNameMap, intitialStyle?: CSS.Properties, shadowOptions?: ElementShadowOptions) {
        super('div', intitialStyle)
        this.ShadowElement = new BaseElement(tag, shadowOptions.wrapperInitialStyle || {});
        this.isShadowElement = true;
        this.root.attachShadow({ mode: "open" });
        this.root.shadowRoot.appendChild(this.ShadowElement.root)

        this.StyleElement = document.createElement('style');
        this.StyleElement.setAttribute('type', 'text/css');
        this.StyleElement.setAttribute('rel', 'stylesheet');
        
    
        this.root.shadowRoot.appendChild(this.StyleElement);
        this.setStyleSheet(shadowOptions.styleSheet || {})
        Object.assign(this.root.style, intitialStyle || {})



    }


    /**
     * Parse stylesheet object to csstexts.
     * Append to shadow dom as <style> element.
     */
    private setStyleSheet(styles: any): void {
        let str = ``
        const parseStyleObject = (object) => " {\n" + Object.entries(object).map(([k, v]) => `${k} ${typeof v == 'object'? `${parseStyleObject(v)}` : `:${v};` } \n`).join('') + '}\n'
        Object.entries(styles).map(([k, v]) => {
            try{
                this.StyleElement.appendChild(document.createTextNode(k +  parseStyleObject(styles[k])))
                str += k +  parseStyleObject(styles[k])
            }
            catch(e){
                console.warn(e)
            }
        })
    }



    get shadowElementRoot(): HTMLElement {
        return this.ShadowElement.root
    }

}

export {
    ShadowElement
}