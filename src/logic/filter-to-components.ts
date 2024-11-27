import { Board, Group, Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToComponents(shapes: Shape[]): Shape[] {
    const components: Shape[] = [];

    shapes.forEach( (shape) => {

        if(shape.isComponentInstance()) {
            components.push(shape);
        }

        // If it contains other shapes, recursively check it's children
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            const childComponents = filterToComponents(board.children);
            components.push(...childComponents);
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            const childComponents = filterToComponents(group.children);
            components.push(...childComponents);
        }
    })

    return components;
}