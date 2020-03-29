/**
 *@class SpriteSheet
 * @param {HTMLImageElement}  Image source to create a sprite sheet.
 * @param {number} width A number representing the width of the sprites
 * @param {number} height A number representing the height of the sprites
 *
 */
export default class SpriteSheet {
    constructor(image,width,height){
        this.image = image;
        this.width = width ;
        this.height = height;
        this.tiles = new Map();
        this.animations = new Map();
    }
    defineAnim(name,animation){
        this.animations.set(name,animation)
    }
    define(name, x , y , width , height ){
        const buffers = [false,true].map(flip=>{
            const {image} = this;
            const buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            const context = buffer.getContext('2d');
            if(flip) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }
            context.drawImage(
                image,
                x,
                y,
                width,height,
                0,
                0,
                width,
                height);
            return buffer;
        });
        this.tiles.set(name,buffers);
    }
    defineTile(name,x,y){
        this.define(name , x*this.width,  y*this.height , this.width , this.height)
    }
    draw(name,context,x,y , flip = false){
        const buffer = this.tiles.get(name)[flip?1:0];
        context.drawImage(buffer,x,y);
    }
    drawTile(name,context,x,y){
        this.draw(name,context,x * this.width , y  * this.height);
    }
    drawAnim(name,context,x,y,distance){
        const anim = this.animations.get(name);
        this.drawTile(anim(distance),context, x, y);
    }
}