export function createAnim (frames , frameLen){
    return (distance)=>{
        return frames[Math.floor(distance/frameLen)%frames.length]
    }
}