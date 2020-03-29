import {loadLevel} from "./js/loaders.js";
import createMario from "./js/mario.js";
import Timer from "./js/timer.js";
import setupKeyboard from "./js/input.js";
import Camera from "./js/camera.js";




const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario,level])=>{
        const camera = new Camera();


        mario.pos.set(64,180);

        level.entities.add(mario);

        const input = setupKeyboard(mario);
        input.listenTo(window);

        const timer = new Timer(1/60);
        timer.update = function update(deltaTime) {
            if(mario.pos.x > 100) {
                camera.pos.x = mario.pos.x - 100;
            }
                level.update(deltaTime);
                level.comp.draw(context,camera);

            };
        timer.start();
    });