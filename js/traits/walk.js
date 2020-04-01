import {Sides, Trait} from "../entity.js";

export default class Walk extends Trait{
    constructor(){
        super('walk')
        this.speed = -30
    }
    obstruct(entity,side){
        if(side!==Sides.BOTTOM){
            this.speed *= -1
        }
    }
    update(entity){
        entity.vel.x = this.speed;
    }
}

