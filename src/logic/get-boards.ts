import { Board, Shape } from "@penpot/plugin-types";

//////////////////////////
//////////////////////////

export function addToBoards(_existingBoards: Board[], _shapes: Shape[]) {

    _shapes.forEach((shape) => {
        if (penpot.utils.types.isBoard(shape)) {
            _existingBoards.push(shape as Board);
        }
    });

    // Remove any duplicates
    const uniqueBoards = _existingBoards.filter((board, index, self) =>
        index === self.findIndex((b) => b.id === board.id)
    );

    _existingBoards.length = 0;
    _existingBoards.push(...uniqueBoards);
}