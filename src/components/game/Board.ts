import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";

import { TileSize } from "../../constants/GameOptions";

// Keeps of track of what piece is where
export default class Board {
    x: integer = 6;
    y: integer = 12;
    board: BoardTile[][];
    boardPos: VectorPos = { x: TileSize.x / 2, y: TileSize.y / 2};

    constructor(size?: VectorPos) {
        if (size) {
            this.x = size.x;
            this.y = size.y;
        }

        this.board = new Array<Array<BoardTile>>();

        this.createBoard();
    }

    // Creates the board
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

    // Sets the board's position on the screen
    setBoardPos(boardPos: VectorPos) {
        // Adjust the position so that it utilizes the center of the screen
        boardPos.x -= (this.x / 2) * TileSize.x;
        boardPos.y -= (this.y / 2) * TileSize.y;

        // Update boardPos
        this.boardPos = boardPos;
    }

    // Draws a debug version of the board to the screen
    // Checkboard pattern to test how the board can be interacted with
    drawDebug(scene: Phaser.Scene) {
        let color = 255;
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                if (color == 255) color = 100;
                else color = 255;
                console.log(x + "::" + y);
                scene.add.rectangle(this.boardPos.x + x * 80, this.boardPos.y + y * 80, 72, 72, color).setOrigin(0.5);
            }
            if (color == 255) color = 100;
            else color = 255;
        }
    }

}