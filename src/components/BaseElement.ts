import * as CSS from 'csstype'
interface BaseElementCustomEvents { [e: string]: CustomEvent };
interface BaseElementEventLisnters { [e: string]: EventListenerOrEventListenerObject }

/**
 * UI base class
 * @property {HTMLElement} root - HTML element
 */

class BaseElement {

    /*
    * Construct HTML element
    */
    root: HTMLElement;

    /*
    * Creating unique string
    */
    uid: string;


    /*
    * Storing custom events
    */
    private customEvents: BaseElementCustomEvents;

    /*
    * Storing listening events 
    */
    private eventListeners: BaseElementEventLisnters;

    /** 
    * Generate unique ID
    * @return {string}
    **/
    private generateUID(): string {
        const dateStr: string = new Date().valueOf().toString()
        return dateStr.substr(dateStr.length - 3, 3) + Math.random().toString(36).substr(2, 10);
    };

    /**
     * 
     * @param tag - html tag for root element
     */
    constructor(tag?: keyof HTMLElementTagNameMap, intitialStyle?: CSS.Properties) {
        this.root = document.createElement(tag);
        this.uid = this.generateUID();
        this.root.id = this.uid;
        this.customEvents = {};
        this.eventListeners = {};
        Object.assign(this.root.style, intitialStyle)
    };



    /**
    * Register a custom event
    * @param {string} name - Event name
    * @param {CustomEventInit} options -  {bubbles, cancelable, composed, detail}
    * @param {boolean} override - Should override previous event with the same name?
    * 
    * @throws Event is already registered.
    * @returns {CustomEvent}
    **/
    public registerEvent = (name: string, options: CustomEventInit, override?: boolean) => {
        if (this.customEvents[name] && !override) {
            throw Error(`Event ${name} is already registered. Set param override equal true to override.`)
        }
        else {
            const event = new CustomEvent(name, options);
            this.customEvents[name] = event;
            return event
        }
    }


    /**
    Dispatch a custom event registered
    @param {string} name - event name to dispatch
    */
    public dispatch = (name: string) => {
        this.root.dispatchEvent(this.customEvents[name])
    }

    /**
     * Add an event listener. Callback argument will be call when event is dispatched.
     * @param {string}  name - event name to listen
     * @param {EventListenerOrEventListenerObject} callback - event callback
     * @param {boolean | AddEventListenerOptions} options - event listener options
     * 
     */
    public on = (name: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
        this.root.addEventListener(name, callback, options);
        this.eventListeners[name] = callback;
    }

    /**
     * Remove event listener.
     * @param {string} name - event name to stop listen
     */
    public removeEventListener = (name: string) => {
        this.root.removeEventListener(name, this.eventListeners[name])
    }


    public isMouseInBound = (e: MouseEvent): boolean => {
        let {top, left, right, bottom} = this.root.getBoundingClientRect()
        return e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom
    }


}

export {
    BaseElement
}