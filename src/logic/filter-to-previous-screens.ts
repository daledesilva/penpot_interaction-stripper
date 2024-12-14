import { Board, Group, Shape } from "@penpot/plugin-types";
import { addToBoards } from "./get-boards";
import { debug } from "../utils/log-to-console";

export function filterToPreviousScreens(props: {
    _shapesToFilter: Shape[],
}): Shape[] {

    const {
        _shapesToFilter,
    } = props;

    let previousScreenShapes: Shape[] = [];

    debug(['_shapesToFilter', _shapesToFilter]);

    // Iterate through all shapes
    _shapesToFilter.forEach((shape) => {
        shape.interactions.forEach((interaction) => {
            const action = interaction.action;
            
            debug(['action.type', action.type]);
            if (action.type === 'previous-screen') {
                previousScreenShapes.push(shape);
            }
        });

        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            previousScreenShapes.push(...filterToPreviousScreens({ _shapesToFilter: board.children }));
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            previousScreenShapes.push(...filterToPreviousScreens({ _shapesToFilter: group.children }));
        }
    });

    debug(['previousScreenShapes', previousScreenShapes]);
    return previousScreenShapes;
} 