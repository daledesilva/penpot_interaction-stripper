import { Board, Group, Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToNonComponents(shapes: Shape[]): Shape[] {
    const components: Shape[] = [];

    shapes.forEach( (shape) => {

        if(!shape.isComponentInstance()) {
            components.push(shape);
        }

        // If it contains other shapes, recursively check it's children
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            const childNonComponents = filterToNonComponents(board.children);
            components.push(...childNonComponents);
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            const childNonComponents = filterToNonComponents(group.children);
            components.push(...childNonComponents);
        }
    })

    return components;
}