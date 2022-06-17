import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";

import { GapSize, TileSize } from "../../constants/GameOptions";

// Keeps of track of what piece is where
export default class Board {
    x: integer = 6;
    y: integer = 12;
    board: BoardTile[][];
    boardPos: VectorPos = { x: TileSize.x / 2, y: TileSize.y / 2 };
    startCoord: VectorPos = { x: 3, y: -1 };

    constructor(size?: VectorPos) {
        if (size) {
            this.x = size.x;
            this.y = size.y;
        }

        this.board = new Array<Array<BoardTile>>();

        this.createBoard();
    }

    // Creates the board
    createBoard(): void {
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
    setBoardPos(boardPos: VectorPos): void {
        // Adjust the position so that it utilizes the center of the screen
        boardPos.x -= (this.x / 2) * TileSize.x;
        boardPos.y -= (this.y / 2) * TileSize.y;

        // Update boardPos
        this.boardPos = boardPos;
    }

    // HELPERS

    // Returns the given coordinate in world space coordinates
    boardToWorldSpace(coord: VectorPos): VectorPos {
        let result: VectorPos = { x: coord.x, y: coord.y };
        result.x = result.x * GapSize.x + this.boardPos.x;
        result.y = result.y * GapSize.y + this.boardPos.y;
        return result;
    }

    // Returns the given coordinate in board space coordinates
    worldSpaceToBoard(coord: VectorPos): VectorPos {
        let result: VectorPos = { x: coord.x, y: coord.y };

        result.x -= this.boardPos.x;
        result.x /= GapSize.x;

        result.y -= this.boardPos.y;
        result.y /= GapSize.y;

        return result;
    }

    // DEBUG

    // Draws a debug version of the board to the screen
    // Checkboard pattern to test how the board can be interacted with
    drawDebug(scene: Phaser.Scene): void {
        let color;
        let color1 = Phaser.Display.Color.GetColor(80, 80, 80);
        let color2 = Phaser.Display.Color.GetColor(220, 220, 220);
        color = color2;
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                if (color == color1) color = color2;
                else color = color1;
                scene.add.rectangle(this.boardPos.x + x * GapSize.x, this.boardPos.y + y * GapSize.y, 72, 72, color).setOrigin(0.5);
            }
            if (color == color1) color = color2;
            else color = color1;
        }
    }

}