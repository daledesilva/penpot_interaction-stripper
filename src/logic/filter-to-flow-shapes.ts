import { Board, Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToFlowShapes({
    _shapesToFilter,
    _boards,
}: {
    _shapesToFilter: Shape[],
    _boards: Board[]
}): Shape[] {

    let flowShapes: Shape[] = [];

    _shapesToFilter.forEach((shape) => {

        shape.interactions.forEach((interaction) => {
            const action = interaction.action;

            // If the destination is another board in the flow, then it's a flowShape
            if (action.type === 'navigate-to') {
                const destIsInFlow = _boards.some((board) => board.id === action.destination.id);
                if (destIsInFlow) flowShapes.push(shape);
            }

        });

    });

    return flowShapes;
}