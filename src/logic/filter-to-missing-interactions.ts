import { Board, Group, Shape } from "@penpot/plugin-types";
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
        
        // If the number of interactions are altered in the instance, it's altered.
        if(shape.interactions.length < sameShapeInMainInstance.interactions.length) {
            componentsWithMissingInteractions.push(shape);
            return;
        }

        // TODO: Should this look deeper? - What's the user's expectation?
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

    return componentsWithMissingInteractions;
}