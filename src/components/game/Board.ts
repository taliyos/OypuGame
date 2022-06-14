import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";

// Keeps of track of what piece is where
export default class Board {
    x: integer = 6;
    y: integer = 12;
    board: BoardTile[][];

    constructor(size?: VectorPos) {
        if (size) {
            this.x = size.x;
            this.y = size.y;
        }

        this.board = new Array<Array<BoardTile>>();

        this.createBoard();
    }

    createBoard() {
        for (let y = 0; y < this.y; y++) {
            let row: BoardTile[] = new Array<BoardTile>();
            for (let x = 0; x < this.x; x++) {
                row.push({
                    piece: undefined,
                });
            }
            this.board.push(row);
        }
    }

}