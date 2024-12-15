import { Shape } from "@penpot/plugin-types";
import { debug } from "../utils/log-to-console";

////////////////////////////////////
////////////////////////////////////

export function filterToUrls(props: {
    _shapesToFilter: Shape[],
}): Shape[] {

    const {
        _shapesToFilter,
    } = props;

    let urlShapes: Shape[] = [];

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shape.interactions.forEach((interaction) => {
            const action = interaction.action;
            
            if (action.type === 'open-url') {
                urlShapes.push(shape);
            }
        });
    });

    return urlShapes;
} 