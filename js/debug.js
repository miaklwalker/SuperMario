
export default function setupMouseControl (canvas,entity, camera) {
    let lastEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            const {offsetX: x1, offsetY: y1} = event;
            const {pos: {x: x2, y: y2}} = camera;
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    x1+x2,
                    y1+y2);
            }else if(event.buttons === 2
                    && lastEvent
                    && lastEvent.buttons === 2
                    && lastEvent.type === 'mousemove'){
                camera.pos.x -= event.offsetX - lastEvent.offsetX;

            }
            lastEvent = event;
        })
    })
    canvas.addEventListener('contextmenu',e=>{
        e.preventDefault();
    })
}