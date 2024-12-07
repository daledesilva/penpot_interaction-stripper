
import { Board, Group, Shape } from "@penpot/plugin-types";

//////////////
//////////////

export function filterToNonFlowShapes(_shapes: Shape[], _boards: Board[] = []): Shape[] {
    let nonFlowShapes: Shape[] = [];
    const boards: Board[] = [];
    if(_boards) boards.push(..._boards);
    
    // Iterate through all shapes and find any that are boards
    _shapes.forEach( (shape) => {
        if(penpot.utils.types.isBoard(shape)) {
            boards.push(shape);
        }
    });

    // Iterate through all shapes
    _shapes.forEach( (shape) => {
    
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
            nonFlowShapes.push( ...filterToNonFlowShapes(board.children, boards) );
        } else if(penpot.utils.types.isGroup(shape)) {  // Does this return true for components?
            const group = shape as Group;
            nonFlowShapes.push( ...filterToNonFlowShapes(group.children, boards) );
        }
    
    });


    // Remove duplicates
    nonFlowShapes = nonFlowShapes.filter( (shape, index, self) => {
        return index === self.findIndex( (t) => t.id === shape.id );
    });

    return nonFlowShapes;
}