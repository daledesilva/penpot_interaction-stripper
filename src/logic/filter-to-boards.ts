import { Board, Group, Shape } from "@penpot/plugin-types";
import { debug } from "../utils/log-to-console";

export function filterToBoards(shapes: Shape[]): Shape[] {
    let boardShapes: Shape[] = [];

    // Iterate through all shapes
    shapes.forEach((shape) => {
        // Check if the shape is a board
        if (penpot.utils.types.isBoard(shape)) {
            // If it has any interactions, add it to our filtered list
            if (shape.interactions.length > 0) {
                boardShapes.push(shape);
            }
        }

        // Recursively check children of boards and groups
        if (penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            boardShapes.push(...filterToBoards(board.children));
        } else if (penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            boardShapes.push(...filterToBoards(group.children));
        }
    });

    debug(['boardShapes', boardShapes]);
    return boardShapes;
} 