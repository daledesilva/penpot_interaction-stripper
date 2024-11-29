import { Board, Group, Shape } from "@penpot/plugin-types";
import { filterToComponents } from "./filter-to-components";

//////////////
//////////////

export function filterToAddedInteractions(shapes: Shape[]): Shape[] {
    const componentsWithAddedInteractions: Shape[] = [];

    const componentBasedShapes = filterToComponents(shapes);

    componentBasedShapes.forEach( (shape) => {
        const sameShapeInMainInstance = shape.componentRefShape();

        // If this is the main instance, there is no source to check against
        if(!sameShapeInMainInstance) return;
        
        // If the number of interactions in the instance are more than the source.
        // TODO: Should actually compare each one as the number might be the same but one might be added and one might be removed.
        if(shape.interactions.length > sameShapeInMainInstance.interactions.length) {
            componentsWithAddedInteractions.push(shape);
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

    return componentsWithAddedInteractions;
}