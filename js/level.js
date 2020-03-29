import Compositor from "./compositor.js";
import {Matrix} from "./math.js";
import TileCollider from "./tileCollider.js";

export default class Level {
    constructor(){
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollider =  new TileCollider(this.tiles)
    }
    update(deltaTime){
        this.totalTime += deltaTime;
        this.entities.forEach(entity=>{
            entity.update(deltaTime);
                if(entity.vel.x !== 0) {
                    entity.pos.x += entity.vel.x * deltaTime;
                    this.tileCollider.checkX(entity);
                }
                if(entity.vel.y !==0) {
                    entity.pos.y += entity.vel.y * deltaTime;
                    this.tileCollider.checkY(entity)
                }
            entity.vel.y += this.gravity * deltaTime;
        });
    }
}