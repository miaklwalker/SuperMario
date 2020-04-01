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

export function loadJSON(url) {
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




