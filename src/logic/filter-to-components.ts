import { Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToComponents(shapes: Shape[]): Shape[] {
    const components: Shape[] = [];

    shapes.forEach( (shape) => {
        // if shape is, or is inside, a library component instance
        if(shape.isComponentInstance()) {
            components.push(shape);
        }
    })

    return components;
}