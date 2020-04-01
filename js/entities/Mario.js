import {loadSpriteSheet} from "../loaders.js";
import Entity from "../entity.js";
import Go from "../traits/go.js";
import Jump from "../traits/jump.js";


const WALKING_SPEED= 1/2000;
const RUNNING_SPEED = 1/5000;

export default function loadMario (){
    return loadSpriteSheet('mario').then(createMarioFactory)
}

function createMarioFactory (sprite) {
    const runAnim = sprite.animations.get('run');
    function routeFrame(mario) {
        if (!mario.jump.ready) {
            return "jump";
        }
        if (mario.go.distance > 0) {
            if (mario.vel.x > 0 &&
                mario.go.dir < 0 ||
                mario.vel.x < 0 &&
                mario.go.dir > 0) {
                return "brake";
            }
            return runAnim(mario.go.distance)
        }
        return "idle";
    }
    function setTurboState(turboOn){
        this.go.dragFactor = turboOn ? RUNNING_SPEED : WALKING_SPEED;
    }
    function drawMario (context){
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }
    return ()=> {
        const mario = new Entity();
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}