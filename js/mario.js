import Entity from "./entity.js";
import Jump from "./traits/jump.js";
import Go from "./traits/go.js";
import {loadSpriteSheet} from "./loaders.js";
import {createAnim} from "./animation.js";
//
// const WALKING_SPEED= 1/2000;
// const RUNNING_SPEED = 1/5000;
//
// export default function createMario (){
//     return loadSpriteSheet('mario')
//         .then(sprite=>{
//             const mario = new Entity();
//             mario.size.set(14,16);
//
//             mario.addTrait(new Go());
//             mario.go.dragFactor = WALKING_SPEED;
//             mario.addTrait(new Jump());
//
//             mario.turbo = (turboOn)=> mario.go.dragFactor = -turboOn ? RUNNING_SPEED : WALKING_SPEED;
//             const runAnim = createAnim(['run-1','run-2','run-3'],6);
//
//             function routeFrame(mario) {
//                 if(!mario.jump.ready){
//                     return "jump";
//                 }
//                 if (mario.go.distance > 0) {
//                     if (mario.vel.x > 0 &&
//                         mario.go.dir < 0 ||
//                         mario.vel.x < 0 &&
//                         mario.go.dir > 0) {
//                         return "brake";
//                     }
//                     return runAnim(mario.go.distance)
//                 }
//                 return "idle";
//             }
//             mario.draw = function drawMario (context){
//                 sprite.draw(routeFrame(this),context,0,0,this.go.heading < 0)
//             };
//
//             return mario;
//         })
// }