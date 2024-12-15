import { Shape } from "@penpot/plugin-types";

//////////////////////////
//////////////////////////

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
            
            if (action.type === 'previous-screen') {
                previousScreenShapes.push(shape);
            }
        });
    });

    return previousScreenShapes;
} 