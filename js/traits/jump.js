import {Trait} from "../entity.js";

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.3;
        this.velocity = 200;

        this.engageTime = 0;

        this.requestTime = 0;
        this.gracePeriod = 0.1;

        this.speedBoost = 0.3;

        this.ready = false;
    }
    start(){
    this.requestTime = this.gracePeriod
    }
    cancel(){
        this.engageTime = 0 ;
        this.requestTime = 0
    }
    obstruct(entity,side) {
        if(side==="bottom") {
            this.ready = true
        }
    }

    update(entity,deltaTime){
        if( this.requestTime > 0){
            if(this.ready) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
        }
        this.requestTime -= deltaTime;
        if(this.engageTime > 0){
            entity.vel.y = - (this.velocity + Math.abs(entity.vel.x * this.speedBoost) );
            this.engageTime -= deltaTime;
        }
        this.ready = false;
    }
}