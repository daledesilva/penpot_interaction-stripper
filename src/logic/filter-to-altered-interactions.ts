import { Shape } from "@penpot/plugin-types";
import { filterToComponents } from "./filter-to-components";

//////////////
//////////////

export function filterToAlteredInteractions(shapes: Shape[]): Shape[] {
    const componentsWithAlteredInteractions: Shape[] = [];

    const componentBasedShapes = filterToComponents(shapes);

    componentBasedShapes.forEach( (shape) => {
        const sameShapeInMainInstance = shape.componentRefShape();

        // If this is the main instance, there is no source to check against
        if(!sameShapeInMainInstance) return;

        // Iterate through all original interactions to make sure they're the same in the instance.
        for(let i=0; i<=sameShapeInMainInstance.interactions.length; i++) {
            const mainInteraction = sameShapeInMainInstance.interactions[i];
            
            console.log('mainInteraction', mainInteraction);
        }




        // // If it contains other shapes, recursively check it's children
        // if(penpot.utils.types.isBoard(shape)) {
        //     const board = shape as Board;
        //     const childShapesWithInteractions = filterToMissingInteractions(board.children);
        //     componentsWithAlteredInteractions.push(...childShapesWithInteractions);
        // } else if(penpot.utils.types.isGroup(shape)) {
        //     const group = shape as Group;
        //     const childShapesWithInteractions = filterToMissingInteractions(group.children);
        //     componentsWithAlteredInteractions.push(...childShapesWithInteractions);
        // }
    })

    return componentsWithAlteredInteractions;
}