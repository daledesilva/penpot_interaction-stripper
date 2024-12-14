
import { Board, Group, Shape } from "@penpot/plugin-types";
import { addToBoards } from "./get-boards";

//////////////
//////////////

export function filterToFlowShapes(props: {
    _shapesToFilter: Shape[],
    _originalUserSelection?: Shape[],
    _boards?: Board[]
}): Shape[] {
    
    const {
        _shapesToFilter,
        _originalUserSelection,
        _boards: _boardsFromUserSelection = []
    } = props;

    let flowShapes: Shape[] = [];
    const boards: Board[] = [];
    if(_boardsFromUserSelection) boards.push(..._boardsFromUserSelection);
    
    // If the original user selection is passed in, get any boards that are direct children
    if(_originalUserSelection) {
        addToBoards({_existingBoards: boards, _shapes: _originalUserSelection});
    };
    // If any of the shapes to filter are boards, add them to the list
    addToBoards({_existingBoards: boards, _shapes: _shapesToFilter});


    // Iterate through all shapes
    _shapesToFilter.forEach( (shape) => {
    
        shape.interactions.forEach( (interaction) => {
            const action = interaction.action;

            // If the destination is another board in the flow, then it's a flowShape
            if(action.type === 'navigate-to') {
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(destIsInFlow) flowShapes.push(shape);
            }
            
        });
        
        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            // Components and any kind of layout is a board. Not like Figma where there are Frames.
            const board = shape as Board;
            flowShapes.push( ...filterToFlowShapes({ _shapesToFilter: board.children, _boards: boards }) );
        } else if(penpot.utils.types.isGroup(shape)) {  // Does this return true for components?
            const group = shape as Group;
            flowShapes.push( ...filterToFlowShapes({ _shapesToFilter: group.children, _boards: boards }) );
        }
    
    });


    // Remove duplicates
    flowShapes = flowShapes.filter( (shape, index, self) => {
        return index === self.findIndex( (t) => t.id === shape.id );
    });

    // console.log('flowShapes', flowShapes.map(shape => shape.name));
    return flowShapes;
}