import { Shape } from "@penpot/plugin-types";

/////////////////////////////////
/////////////////////////////////

export function filterToBoards(shapes: Shape[]): Shape[] {
    let boardShapes: Shape[] = [];

    // Iterate through all shapes
    shapes.forEach((shape) => {
        if (penpot.utils.types.isBoard(shape)) {
            if (shape.interactions.length > 0) {
                boardShapes.push(shape);
            }
        }
    });

    return boardShapes;
} 