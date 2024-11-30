import { Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function removeInteractions(shapes: Shape[]) {
    shapes.forEach( (shape) => {
        for(let i=shape.interactions.length-1; i>=0; i--) {
            console.log('shape', shape);
            console.log(shape.interactions[i]);
            shape.interactions[i].remove();
        }
    })
}