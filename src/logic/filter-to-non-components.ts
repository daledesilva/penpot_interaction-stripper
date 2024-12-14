import { Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToNonComponents(shapes: Shape[]): Shape[] {
    const components: Shape[] = [];

    shapes.forEach( (shape) => {
        if(!shape.isComponentInstance()) {
            components.push(shape);
        }
    })

    return components;
}