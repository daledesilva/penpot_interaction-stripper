import { Shape } from "@penpot/plugin-types";
import { TriggerType } from "../app";
import { debug } from "../utils/log-to-console";

//////////////
//////////////

interface RemoveInteractionsFilters {
    shapes: Shape[],
    triggerTypes: TriggerType,
}

export function removeInteractions({shapes, triggerTypes}: RemoveInteractionsFilters) {
    debug(['removing interactions']);
    debug(['shapes', shapes]);
    debug(['triggerTypes', triggerTypes]);

    shapes.forEach( (shape) => {
        for(let i=shape.interactions.length-1; i>=0; i--) {
            if(triggerTypes === 'any interactions') {
                shape.interactions[i].remove();
            } else if(triggerTypes === 'clicks' && shape.interactions[i].trigger == 'click') {
                shape.interactions[i].remove();
            } else if(triggerTypes === 'mouse enters' && shape.interactions[i].trigger == 'mouse-enter') {
                shape.interactions[i].remove();
            } else if(triggerTypes === 'mouse leaves' && shape.interactions[i].trigger == 'mouse-leave') {
                shape.interactions[i].remove();
            } else if(triggerTypes === 'after delays' && shape.interactions[i].trigger == 'after-delay') {
                shape.interactions[i].remove();
            }
        }
    })
}