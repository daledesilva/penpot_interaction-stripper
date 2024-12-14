import { Board, Group, Shape } from "@penpot/plugin-types";
import { addToBoards } from "./get-boards";
import { debug } from "../utils/log-to-console";

export function filterToOverlays(props: {
    _shapesToFilter: Shape[],
}): Shape[] {

    const {
        _shapesToFilter,
    } = props;

    let overlayShapes: Shape[] = [];

    debug(['_shapesToFilter', _shapesToFilter]);

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shape.interactions.forEach((interaction) => {
            const action = interaction.action;
            
            debug(['action.type', action.type]);
            if (action.type === 'open-overlay' || action.type === 'toggle-overlay' || action.type === 'close-overlay') {
                overlayShapes.push(shape);
            }
        });

        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            // Components and any kind of layout is a board. Not like Figma where there are Frames.
            const board = shape as Board;
            overlayShapes.push( ...filterToOverlays({ _shapesToFilter: board.children }) );
        } else if(penpot.utils.types.isGroup(shape)) {  // Does this return true for components?
            const group = shape as Group;
            overlayShapes.push( ...filterToOverlays({ _shapesToFilter: group.children }) );
        }
    });

    debug(['overlayShapes', overlayShapes]);
    return overlayShapes;
}
