import TileResolver from "./tileResolver.js";

export default function createBackgroundLayer(level,tiles,sprites){
    const buffer = document.createElement('canvas');
    const resolver = new TileResolver(tiles);
    buffer.width = 256+16;
    buffer.height = 240;

    const context = buffer.getContext('2d');
    function redraw(startIndex,endIndex){
        context.clearRect(0,0,buffer.width,buffer.height);
        for(let x = startIndex ; x <= endIndex ; ++x){
            const col = tiles.grid[x];
            col && col.forEach((tile,y)=>{
                if (sprites.animations.has(tile.name)){
                    sprites.drawAnim(tile.name,context,x - startIndex,y,level.totalTime)
                }else {
                    sprites.drawTile(tile.name, context, x - startIndex, y)
                }
            })
        }
    }
    return(context,camera)=> {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        // if(drawFrom !== startIndex || drawTo !== endIndex) {
            redraw(drawFrom,drawTo);
        //}
        context.drawImage(buffer,-camera.pos.x%16,-camera.pos.y);
    }
}

export function createSpriteLayer(entities , width =64 ,height = 64){
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width =width;
    spriteBuffer.height = height;
    const spriteBufferContext =  spriteBuffer.getContext('2d');
    return (context,camera)=>{
        entities.forEach(entity=>{
            spriteBufferContext.clearRect(0,0,width,height);
            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
            )
        })
    }
}

export function createCollisionLayer(level){
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x,y){
        resolvedTiles.push({x,y});
        return getByIndexOriginal.call(tileResolver,x,y)
    };
    return (context,camera)=>{

    resolvedTiles.forEach(({x,y})=>{
        context.strokeStyle ='blue';
        context.strokeRect(
            x * tileSize - camera.pos.x,
            y * tileSize - camera.pos.y,
            tileSize,
            tileSize
        );
        context.stroke();
    });
    level.entities.forEach((entity)=>{
        const {size:{x:w,y:h}} = entity;

        context.strokeStyle ='red';
        context.strokeRect(
            entity.bounds.left - camera.pos.x,
            entity.bounds.top - camera.pos.y,
            w,
            h);
        context.stroke();
        });
    resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw){

    return (context,fromCamera)=>{
        const {pos:{x , y},size} = cameraToDraw;
        context.strokeStyle = 'purple';
        context.strokeRect(
            x - fromCamera.pos.x,
            y - fromCamera.pos.y,
            size.x,
            size.y);
        context.stroke();
    }
}