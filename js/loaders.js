import createBackgroundLayer, {createSpriteLayer} from "./layers.js";
import Level from "./level.js";
import SpriteSheet from "./spritesheet.js";
import {createAnim} from "./animation.js";

/**
 * @function loadImage
 * @param url The Url to load the image from
 * @returns {Promise<HTMLImageElement>} A HTMLImageElement that is loaded from url
 */
export default function loadImage(url){
    return new Promise(resolve=>{
        const image = new Image();
        image.addEventListener('load',()=>{
            resolve(image);
        });
        image.src=url;
    })
}

function loadJSON(url) {
    return fetch(url).then(response => response.json());
}

export function loadSpriteSheet (sheetName){
    return loadJSON(`sprites/${sheetName}.json`)
        .then((levelSpec)=> Promise.all([
                levelSpec,
                loadImage(levelSpec["imgURL"])
            ])).then(([{tileW,tileH,tiles,frames,animations}, image])=>{
                    const sprites = new SpriteSheet(image, tileW, tileH);
                    if(tiles) {
                        tiles.forEach(({name, index}) => sprites.defineTile(name, ...index));
                    }
                    if(frames) {
                        frames.forEach(({name, rect}) => sprites.define(name, ...rect));
                    }
                    if(animations) {
                        animations.forEach(({name,frames,frameLen})=>{
                            const animation = createAnim(frames,frameLen);
                            sprites.defineAnim(name,animation);
                        })

                    }
                    return sprites;
                }
        )
}


export function loadLevel (name) {
    return loadJSON(`levels/${name}.json`)
        .then(({backgrounds,spriteSheet})=> Promise.all([
                {backgrounds,spriteSheet},
                loadSpriteSheet(spriteSheet),
    ]))
        .then(([{backgrounds},backgroundSprites])=>{
        const level = new Level();

        createTiles(level,backgrounds);

        const backgroundLayer = createBackgroundLayer(level,backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);
        return level;
    })

}


function createTiles(level,backgrounds){
const algorithms = {
    "4"(background,[xStart,xLength,yStart,yLength]){
         const xEnd = xStart + xLength;
         const yEnd = yStart + yLength;
         for(let x = xStart ; x < xEnd ; ++x){
             for (let y = yStart ; y < yEnd ; ++y){
                 level.tiles.set(x,y,{
                     name:background['tile'],
                     type:background['type']
                 })
             }
         }
     },
    "2"(background,[x,y]){
        this[4](background,[x,1,y,1])
    },
    "3"(background,[xStart,xLength,yStart]){
        this["4"](background,[xStart,xLength,yStart,1])
    }
};
    backgrounds.forEach(background=>{
        const callback = (range)=>algorithms[range.length](background,range);
        background.ranges.forEach(callback);
    });
}