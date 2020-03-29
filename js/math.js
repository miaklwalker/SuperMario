


export class Vec2 {
    constructor(x,y) {
        this.set(x,y);
    }
    set(x,y){
        this.x = x;
        this.y = y;
    }
    add(vector){
        this.addX(vector);
        this.addY(vector);
        return vector
    }
    equals(vec){
        return this.x === vec.x && this.y === vec.y;

    }
    addX(vector){
        this.x += vector.x;
        return vector
    }
    addY(vector){
        this.y += vector.y;
        return vector
    }
}

export class Matrix {
    constructor() {
        this.grid = []
    }
    forEach(callback){
        this.grid.forEach((column,x)=>{
            column.forEach((value,y)=>{
                callback(value,x,y);
            })
        });
    }
    set(x,y,value){
        if(!this.grid[x]){
            this.grid[x]=[];
        }
        this.grid[x][y] = value;
    }
    get(x,y){
        const col = this.grid[x];
        if(col){
            return col[y];
        }
        return undefined;
    }
}