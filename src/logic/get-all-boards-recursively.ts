import { Board, Group, Shape } from "@penpot/plugin-types";

//////////////////////////
//////////////////////////

export function getAllBoardsRecursively(_shapes: Shape[]): Board[] {
    let boards: Board[] = [];

    _shapes.forEach((shape) => {
        if (penpot.utils.types.isBoard(shape)) {
            const board = shape as Board;
            boards.push(board);
            boards.push(...getAllBoardsRecursively(board.children));
        } else if (penpot.utils.types.isGroup(shape)) {
            const group = shape as Group;
            boards.push(...getAllBoardsRecursively(group.children));
        }
    });

    return boards;
}