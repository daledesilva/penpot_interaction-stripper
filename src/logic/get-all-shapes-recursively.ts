import { Board, Group, Shape } from "@penpot/plugin-types";

////////////////////////////////////
////////////////////////////////////

export function getAllShapesRecursively(_shapesToFilter: Shape[]): Shape[] {
    let shapes: Shape[] = [];

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shapes.push(shape);
        // Recursively check shapes inside boards and groups
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            shapes.push(...getAllShapesRecursively(board.children));
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            shapes.push(...getAllShapesRecursively(group.children));
        }
    });

    return shapes;
} 