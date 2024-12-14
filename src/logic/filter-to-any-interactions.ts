import { Shape } from "@penpot/plugin-types";

////////////////////////////////////
////////////////////////////////////

export function filterToAnyInteractions(_shapesToFilter: Shape[]): Shape[] {
    let shapesWithInteractions: Shape[] = [];

    _shapesToFilter.forEach((shape) => {
        if (shape.interactions && shape.interactions.length > 0) {
            shapesWithInteractions.push(shape);
        }
    });

    return shapesWithInteractions;
} 