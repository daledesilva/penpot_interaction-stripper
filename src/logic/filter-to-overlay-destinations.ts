import { Shape } from "@penpot/plugin-types";

////////////////////////////////////
////////////////////////////////////

export function filterToOverlays(props: {
    _shapesToFilter: Shape[],
}): Shape[] {

    const {
        _shapesToFilter,
    } = props;

    let overlayShapes: Shape[] = [];

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shape.interactions.forEach((interaction) => {
            const action = interaction.action;
            if (action.type === 'open-overlay' || action.type === 'toggle-overlay' || action.type === 'close-overlay') {
                overlayShapes.push(shape);
            }
        });
    });

    return overlayShapes;
}
