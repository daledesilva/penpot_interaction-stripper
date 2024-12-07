
import { Board, Group, Shape } from "@penpot/plugin-types";
import { debug } from "../utils/log-to-console";

//////////////
//////////////

export function filterToFlowShapes(_shapes: Shape[], _boards: Board[] = []): Shape[] {
    const flowShapes: Shape[] = [];
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
                if(destIsInFlow) flowShapes.push(shape);

            } else if(action.type === 'open-overlay') {
                // TODO: Probably should be optional
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(destIsInFlow) flowShapes.push(shape);

            } else if(action.type === 'toggle-overlay') {
                // TODO: Probably should be optional
                const destIsInFlow = boards.some( (board) => board.id === action.destination.id );
                if(destIsInFlow) flowShapes.push(shape);
                
            } else if(action.type === 'close-overlay') {
                // TODO: Could this only close overlays in the flow?
                // Not sure if should be optional.
                // const destIsInFlow = boards.some( (board) => board.id === action.destination?.id );
                // if(destIsInFlow) flowShapes.push(shape);
                flowShapes.push(shape);

            } else if(action.type === 'previous-screen') {
                // TODO: Optionally include back buttons
                flowShapes.push(shape); // Included by default as it can only go back to things in the flow

            } else if(action.type === 'open-url') {
                // TODO: Optionally include external links
            }
            
        });
        
        // Iterate through all shapes inside the shape
        if(penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            flowShapes.push( ...filterToFlowShapes(board.children, boards) );
        } else if(penpot.utils.types.isGroup(shape)) {  // Does this return true for components?
            const group = shape as Group;
            flowShapes.push( ...filterToFlowShapes(group.children, boards) );
        }
        // } else if(shape.componentHead() === shape) {
        //     // It's the root of a component instance
        //     const group = shape as Group;
        //     flowShapes.push( ...filterToFlowShapes(group.children, boards) );
        // }
        // components?
    
    });


    // TODO: remove duplicates in flowShapes


    
    debug(['boards', boards]);
    debug(['flowShapes', flowShapes]);

    return flowShapes;
}


// shapes.forEach( (shape) => {

    //     if(!shape.isComponentInstance()) {
    //         components.push(shape);
    //     }

    //     // If it contains other shapes, recursively check it's children
    //     if(penpot.utils.types.isBoard(shape)) {
    //         const board = shape as Board;
    //         const childNonComponents = filterToNonComponents(board.children);
    //         components.push(...childNonComponents);
    //     } else if(penpot.utils.types.isGroup(shape)) {
    //         const group = shape as Group;
    //         const childNonComponents = filterToNonComponents(group.children);
    //         components.push(...childNonComponents);
    //     }
    // })