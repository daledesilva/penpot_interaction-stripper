import { Board, Group, Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToHasInteractions(shapes: Shape[]): Shape[] {
    const shapesWithInteractions: Shape[] = [];

    shapes.forEach( (shape) => {

        if(shape.interactions.length) {
            shapesWithInteractions.push(shape);
        }

        // If it contains other shapes, recursively check it's children
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            const childShapesWithInteractions = filterToHasInteractions(board.children);
            shapesWithInteractions.push(...childShapesWithInteractions);
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            const childShapesWithInteractions = filterToHasInteractions(group.children);
            shapesWithInteractions.push(...childShapesWithInteractions);
        }
    })

    return shapesWithInteractions;
}