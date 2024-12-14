import { Shape } from "@penpot/plugin-types";
import { filterToComponents } from "./filter-to-components";

//////////////
//////////////

export function filterToMissingInteractions(shapes: Shape[]): Shape[] {
    const componentsWithMissingInteractions: Shape[] = [];

    const componentBasedShapes = filterToComponents(shapes);

    componentBasedShapes.forEach( (shape) => {
        const sameShapeInMainInstance = shape.componentRefShape();

        // If this is the main instance, there is no source to check against
        if(!sameShapeInMainInstance) return;
        
        // If the number of interactions in the instance are less than the source.
        // TODO: Should actually compare each one as the number might be the same but one might be added and one might be removed.
        if(shape.interactions.length < sameShapeInMainInstance.interactions.length) {
            componentsWithMissingInteractions.push(shape);
            return;
        }
    })

    return componentsWithMissingInteractions;
}