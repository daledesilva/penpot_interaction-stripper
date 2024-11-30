import { Shape } from "@penpot/plugin-types";

//////////////
//////////////

interface RemoveInteractionsFilters {
    click?: boolean,
    mouseEnter?: boolean,
    mouseLeave?: boolean,
    afterDelay?: boolean,
}

export function removeInteractions(shapes: Shape[], filters?: RemoveInteractionsFilters) {
    shapes.forEach( (shape) => {
        for(let i=shape.interactions.length-1; i>=0; i--) {

            // If there are filters, skip if the interaction isn't included
            if(filters) {
                if(shape.interactions[i].trigger == 'click' && !filters.click) continue;
                if(shape.interactions[i].trigger == 'mouse-enter' && !filters.mouseEnter) continue;
                if(shape.interactions[i].trigger == 'mouse-leave' && !filters.mouseLeave) continue;
                if(shape.interactions[i].trigger == 'after-delay' && !filters.afterDelay) continue;
            }

            shape.interactions[i].remove();
        }
    })
}