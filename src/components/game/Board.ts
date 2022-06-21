import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";

import { GapSize, TileSize } from "../../constants/GameOptions";
import GameManager from "./GameManager";
import Piece from "./Piece";

// Keeps of track of what piece is where
export default class Board {
    x: integer = 6;
    y: integer = 12;
    board: BoardTile[][];
    boardPos: VectorPos = { x: TileSize.x / 2, y: TileSize.y / 2 };
    startCoord: VectorPos = { x: 3, y: -1 };
    gameManager: GameManager;

    constructor(gameManager: GameManager, size?: VectorPos) {
        if (size) {
            this.x = size.x;
            this.y = size.y;
        }

        this.board = new Array<Array<BoardTile>>();
        this.gameManager = gameManager;

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

    // Returns true if there is a piece below the specified position
    // or it is at the bottom of the board
    // Throws an error if the x position is out of bounds | (0 < pos.x < this.x)
    // Throws an error if the y position is out of bounds | (pos.y < this.y)
    checkPieceDownCollision(pos: VectorPos) : boolean {
        // Check if x pos is valid
        if (pos.x < 0 || pos.x >= this.x) {
            throw new Error("Position is out of bounds. X must be between 0 and " + this.x + ".");
        }
        // Check if y pos is valid
        if (pos.y >= this.y) {
            throw new Error("Position is out of bounds. Y can't exceed " + (this.y - 1));
        }

        // Check if pos is at the bottom of the board
        if (pos.y == this.y - 1) return true;

        let downPos: VectorPos = {
            x: pos.x,
            y: pos.y + 1
        };

        // Check if there is a piece at downPos
        if (this.board[downPos.y][downPos.x].piece != undefined) return true;

        return false;
    }

    // Adds the specified piece to the board at the specified location
    // piece can't already be in the board
    // Will throw an error if there is already a piece registered to the
    // specified pos
    addPieceToBoard(piece: Piece, pos: VectorPos) {
        if (pos.y < 0) {
            console.log("GAME OVER");
            this.gameManager.gameOver();
            return;
        }
        if (this.board[pos.y][pos.x].piece != undefined) {
            throw new Error("There is already a piece at (" + pos.x + ", " + pos.y + ")");
        }
        this.board[pos.y][pos.x].piece = piece;
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
        result.x *= 1.000; // Functionally the same as using ".toFixed(3)"
        result.x /= GapSize.x;
        result.x = Math.floor(result.x);

        result.y -= this.boardPos.y;
        result.y *= 1.000;
        result.y /= GapSize.y;
        result.y = Math.floor(result.y);

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