
import { Board, Group, Shape } from "@penpot/plugin-types";
import { addToBoards } from "./get-boards";

//////////////
//////////////

export function filterToNonFlowShapes(props: {
    _shapesToFilter: Shape[],
    _originalUserSelection?: Shape[],
    _boards?: Board[]
}): Shape[] {

    const {
        _shapesToFilter,
        _originalUserSelection,
        _boards: _boardsFromUserSelection = []
    } = props;

    let nonFlowShapes: Shape[] = [];
    const boards: Board[] = [];
    if(_boardsFromUserSelection) boards.push(..._boardsFromUserSelection);
    
    // If the original user selection is passed in, get any boards that are direct children
    if(_originalUserSelection) {
        addToBoards(boards, _originalUserSelection);
    };
    // If any of the shapes to filter are boards, add them to the list
    addToBoards(boards, _shapesToFilter);

    // Iterate through all shapes
    _shapesToFilter.forEach( (shape) => {
    
        shape.interactions.forEach( (interaction) => {
            const action = interaction.action;

            // If the destination is another board in the flow, then it's a flowShape
            if(action.type === 'navigate-to') {
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(!destIsInFlow) nonFlowShapes.push(shape);

            } else if(action.type === 'open-overlay') {
                // TODO: Probably should be optional
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(!destIsInFlow) nonFlowShapes.push(shape);

            } else if(action.type === 'toggle-overlay') {
                // TODO: Probably should be optional
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(!destIsInFlow) nonFlowShapes.push(shape);
                
            } else if(action.type === 'close-overlay') {
                // Including because overlays are irrelevant to the flow
                // TODO: But should be user optional
                nonFlowShapes.push(shape);

            } else if(action.type === 'previous-screen') {
                // TODO: Optionally include back buttons
                nonFlowShapes.push(shape); // Included by default as it can only go back to things in the flow

            } else if(action.type === 'open-url') {
                // TODO: Optionally include external links
            }
            
        });
        
        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            // Components and any kind of layout is a board. Not like Figma where there are Frames.
            const board = shape as Board;
            nonFlowShapes.push( ...filterToNonFlowShapes({ _shapesToFilter: board.children, _boards: boards }) );
        } else if(penpot.utils.types.isGroup(shape)) {  // Does this return true for components?
            const group = shape as Group;
            nonFlowShapes.push( ...filterToNonFlowShapes({ _shapesToFilter: group.children, _boards: boards }) );
        }
    
    });


    // Remove duplicates
    nonFlowShapes = nonFlowShapes.filter( (shape, index, self) => {
        return index === self.findIndex( (t) => t.id === shape.id );
    });

    return nonFlowShapes;
}