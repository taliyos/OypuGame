import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";

import { GapSize, TileSize } from "../../constants/GameOptions";;
import GameManager from "./GameManager";
import Piece from "./Piece";

// Keeps of track of what piece is where
export default class Board {
    x: integer = 6;
    y: integer = 12;
    absoluteY: integer = 14;
    board: BoardTile[][];
    boardPos: VectorPos = { x: TileSize.x / 2, y: TileSize.y / 2 };
    startCoord: VectorPos = { x: 3, y: -1 };
    gameManager: GameManager;

    constructor(gameManager: GameManager, size?: VectorPos) {
        if (size) {
            this.x = size.x;
            this.y = size.y;
            // We need two extra rows that are "invisible" above the screen
            this.absoluteY = this.y + 2;
        }

        this.board = new Array<Array<BoardTile>>();
        this.gameManager = gameManager;

        this.createBoard();
    }

    // Creates the board
    createBoard(): void {
        for (let y = 0; y < this.absoluteY; y++) {
            let row: BoardTile[] = new Array<BoardTile>();
            for (let x = 0; x < this.x; x++) {
                row.push({
                    piece: undefined,
                    chainId: -1
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
    // pos must be in terms of visible space, not absolute
    checkPieceDownCollision(pos: VectorPos) : boolean {
        // Check if x pos is valid
        if (pos.x < 0 || pos.x >= this.x) {
            throw new Error("Position is out of bounds. X must be between 0 and " + this.x + ".");
        }
        // Check if y pos is valid
        if (pos.y >= this.y) {
            throw new Error("Position is out of bounds. Y can't exceed " + (this.absoluteY - 1));
        }

        // Check if pos is at the bottom of the board
        if (pos.y == this.y - 1) return true;

        let downPos: VectorPos = {
            x: pos.x,
            y: pos.y + 1
        };

        // Check if there is a piece at downPos
        if (this.board[this.boardToAbsoluteY(downPos.y)][downPos.x].piece != undefined) return true;

        return false;
    }

    // Checks to see if there is a piece in the direction specified.
    // --------------------------
    // dir must be either -1 or 1
    // pos must be in world space coordinates
    // Returns true if there is a piece in the direction specified
    // Returns false otherwise
    checkPieceXCollision(pos: VectorPos, dir: integer) : boolean {
        let boardPos = this.worldSpaceToBoard(pos, true);
        // Check if x boardPos is valid
        if (boardPos.x < 0 || boardPos.x >= this.x) {
            throw new Error("Position is out of bounds. It's " + boardPos.x + ", but x must be between 0 and " + this.x + ".");
        }
        // Check if y boardPos is valid
        if (boardPos.y >= this.y) {
            throw new Error("Position is out of bounds. Y can't exceed " + (this.y - 1));
        }

        if (boardPos.x + dir < 0 || boardPos.x + dir >= this.x) return true;

        // Check for cases where the piece is up against a wall
        if ((boardPos.x == this.x - 1 && dir == 1) || (boardPos.x == 0 && dir == -1)) return true;

        // Check for cases where there is another piece next to it
        if (this.board[this.boardToAbsoluteY(boardPos.y)][boardPos.x + dir].piece != undefined) return true;

        return false;
    }

    // Adds the specified piece to the board at the specified location
    // piece can't already be in the board
    // Will throw an error if there is already a piece registered to the
    // specified pos (won't if the piece is itself)
    addPieceToBoard(piece: Piece, pos: VectorPos) {
        if (pos.y < 0) {
            console.log("GAME OVER");
            this.gameManager.gameOver();
            return;
        }
        if (this.board[this.boardToAbsoluteY(pos.y)][pos.x].piece == piece) {
            return;
        }
        if (this.board[this.boardToAbsoluteY(pos.y)][pos.x].piece != undefined) {
            throw new Error("There is already a piece at (" + pos.x + ", " + pos.y + ")");
        }
        this.board[this.boardToAbsoluteY(pos.y)][pos.x].piece = piece;
    }

    removePieceFromBoard(pos: VectorPos) {
        this.board[this.boardToAbsoluteY(pos.y)][pos.x].piece = undefined;
    }
    
    getPiece(pos: VectorPos) : Piece | undefined {
        if (pos.x < 0 || pos.x >= this.x) return undefined;
        let yPos = this.boardToAbsoluteY(pos.y);
        if (yPos < 0 || yPos >= this.absoluteY) return undefined;
        return this.board[yPos][pos.x].piece;
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
    // The optional "ahead" parameter determines how the y position is interpreted
    // With ahead set to true, the function will consider the piece's y position
    // on the board as in the next space (down visually or higher in terms of the stored structure)
    worldSpaceToBoard(coord: VectorPos, ahead: boolean = false): VectorPos {
        let result: VectorPos = { x: coord.x, y: coord.y };

        result.x -= this.boardPos.x;
        result.x *= 1.000; // Functionally the same as using ".toFixed(3)"
        result.x /= GapSize.x;
        result.x = Math.floor(result.x);

        result.y -= this.boardPos.y;
        result.y *= 1.000;
        result.y /= GapSize.y;

        if (!ahead)
            result.y = Math.floor(result.y);
        else
            result.y = Math.ceil(result.y);

        return result;
    }

    // Converts between the visible board and the absolute board's y
    // coordinate.
    boardToAbsoluteY(y: number): number {
        return y + 2;
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

    // Prints the board to the console using chainIds
    // Uses an array because javascript refuses to print
    // duplicate lines
    printDebug() {
        let lines = [];
        for (let y = 0; y < this.absoluteY; y++) {
            let line = "";
            for (let x = 0; x < this.x; x++) {
                if (x != 0) line += ", ";
                line += this.board[y][x].chainId;
            }
            lines.push(line);
        }
        console.log(lines);

    }

}