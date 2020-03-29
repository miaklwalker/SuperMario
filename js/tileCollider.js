import TileResolver from "./tileResolver.js";


export default class TileCollider{
    constructor(tileMatrix){
        this.tiles = new TileResolver(tileMatrix);
    }
    checkX(entity){
        const {pos:{x:x1,y:y1},size:{x:x2,y:y2}} = entity;
        let x = entity.vel.x > 0 ? x1 + x2 : x1;
        const range = [ x, x, y1, y1+y2];

        const matches = this.tiles.searchByRange(...range);
        matches.forEach(match=>{
            if(match.tile.type !== 'ground')return;
            if(entity.vel.x > 0){
                if( x1 + x2 > match.x1 ){
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0 ;
                }
            } else if(entity.vel.x < 0){
                if(entity.pos.x < match.x2 ){
                    entity.pos.x = match.x2;
                    entity.vel.x = 0 ;
                }
            }
        });
    }
    checkY(entity){
        const {pos:{x:x1,y:y1},size:{x:x2,y:y2}} = entity;
        let y = entity.vel.y > 0 ? y1 + y2 : y1;
        const range = [x1,x1+x2, y, y];
        const matches = this.tiles.searchByRange(...range);
        matches.forEach(match=>{
            if(!match || match.tile.type !== 'ground')return;
            if(entity.vel.y > 0){
                if( entity.pos.y + entity.size.y > match.y1 ){
                    entity.pos.y = match.y1 -  entity.size.y;
                    entity.vel.y = 0 ;

                    entity.obstruct('bottom');
                }
            } else if(entity.vel.y < 0){
                if(entity.pos.y < match.y2 ){
                    entity.pos.y = match.y2;
                    entity.vel.y = 0 ;
                }
            }
        });
    }
}


