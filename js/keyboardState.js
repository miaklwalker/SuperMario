
const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor(){
        this.keyStates =  new Map();
        // Holds the call back function for a given keycode;
        this.keyMap = new Map();
    }
    addMapping(code,callback){
        this.keyMap.set(code,callback);
    }
    handleEvent(event){
        const {code} = event;
        if(!this.keyMap.has(code)){
            return false;
        }
        event.preventDefault();
        const keyState =  event.type === 'keydown' ? PRESSED : RELEASED ;
        if(this.keyStates.get(code) === keyState){
            return;
        }
        this.keyStates.set(code,keyState);
        this.keyMap.get(code)(keyState);
    }
    listenTo(window){
        ['keyup','keydown'].forEach(type=>{
            window.addEventListener(type,(event)=>{
                this.handleEvent(event)
            });
        });
    }
}