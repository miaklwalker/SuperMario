import {loadSpriteSheet} from "../loaders.js";
import Entity from "../entity.js";
import Walk from "../traits/walk.js";




export default function loadGoomba (){
    return loadSpriteSheet('goomba').then(createGoombaFactory)
}

function createGoombaFactory (sprite) {
    console.log(sprite);
    const walkAnim = sprite.animations.get('walk');
    function drawGoomba (context){
        return sprite.draw(walkAnim(this.lifetime),context,0,0);
    }
    return function createGoomba (){
        const goomba = new Entity();
        goomba.size.set(16,16);
        goomba.vel.x = -30;
        goomba.addTrait(new Walk());

        goomba.draw = drawGoomba;
        return goomba
    }
}