import {loadLevel} from "./js/loaders/level.js";
import loadMario from "./js/entities/Mario.js";
import Timer from "./js/timer.js";
import setupKeyboard from "./js/input.js";
import Camera from "./js/camera.js";
import loadGoomba from "./js/entities/Goomba.js";
import loadKoopa from "./js/entities/koopa.js";
import {createCollisionLayer} from "./js/layers.js";








const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMario(),
    loadLevel('1-1'),
    loadGoomba(),
    loadKoopa(),
]).then(([createMario,level,createGoomba,createKoopa])=>{
        const camera = new Camera();
        const mario = createMario();

        const goomba = createGoomba();
        goomba.pos.x = 220;
        level.entities.add(goomba);

        const koopa = createKoopa();
        koopa.pos.x = 360;
        level.entities.add(koopa);

        level.comp.layers.push(createCollisionLayer(level));

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