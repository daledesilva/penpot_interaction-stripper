import { Board, Group, Shape } from "@penpot/plugin-types";
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
            
            debug(['action.type', action.type]);
            if (action.type === 'open-url') {
                urlShapes.push(shape);
            }
        });

        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            urlShapes.push(...filterToUrls({ _shapesToFilter: board.children }));
        } else if(penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            urlShapes.push(...filterToUrls({ _shapesToFilter: group.children }));
        }
    });

    return urlShapes;
} 