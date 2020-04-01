import {loadSpriteSheet} from "../loaders.js";
import Entity from "../entity.js";
import Walk from "../traits/walk.js";




export default function loadKoopa (){
    return loadSpriteSheet('koopa').then(createKoopaFactory)
}

function createKoopaFactory (sprite) {
    const walkAnim = sprite.animations.get('walk');
    function drawKoopa (context){
        return sprite.draw(walkAnim(this.lifetime),context,0,0,this.vel.x < 0 );
    }
    return function createKoopa (){
        const koopa = new Entity();
        koopa.size.set(16,16);
        koopa.offset.y = 8;
        koopa.vel.x = -30;
        koopa.addTrait(new Walk());

        koopa.draw = drawKoopa;
        return koopa
    }
}