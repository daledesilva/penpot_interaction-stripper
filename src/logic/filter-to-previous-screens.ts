import { Shape } from "@penpot/plugin-types";
import { debug } from "../utils/log-to-console";

export function filterToPreviousScreens(props: {
    _shapesToFilter: Shape[],
}): Shape[] {

    const {
        _shapesToFilter,
    } = props;

    let previousScreenShapes: Shape[] = [];

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shape.interactions.forEach((interaction) => {
            const action = interaction.action;
            
            debug(['action.type', action.type]);
            if (action.type === 'previous-screen') {
                previousScreenShapes.push(shape);
            }
        });
    });

    return previousScreenShapes;
} 