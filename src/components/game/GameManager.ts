// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,

import Board from "./Board";
import Piece from "./Piece";

// keeping track of the score, managing when the player has control and over what
export default class GameManager {
    pieceSheet: string;
    board: Board;

    gravityPieces: Piece[];
    activePieces: Piece[];

    gameRun: boolean = true;
    movementInput: integer;

    constructor(pieceSheet: string) {
        this.pieceSheet = pieceSheet;
        this.gravityPieces = [];
        this.activePieces = [];
        this.board = new Board(this, { x: 6, y: 12 });
        this.movementInput = 0;
    }

    // Phaser scene additions are here since they aren't ready when
    // the GameManager is constructed.
    create(scene: Phaser.Scene) {
        // Create the board and center it
        this.board.createBoard();
        this.board.setBoardPos({ x: scene.scale.width / 2, y: scene.scale.height / 2 });
    }

    // Creates a random piece to display on the screen
    test(scene: Phaser.Scene) {
        let piece = new Piece(this.pieceSheet, 15);
        // this.board.board[0][0].piece = piece;
        piece.add(this.board.startCoord, this.board, scene);
        piece.startGravity();
        this.activePieces.push(piece);
        this.gravityPieces.push(piece);

        //let piece2 = new Piece(this.pieceSheet, 35);
        //piece2.add({ x: 800, y: 300 }, scene);
        this.board.drawDebug(scene);
    }

    update(delta: number, scene: Phaser.Scene) {
        if (!this.gameRun) return;
        for (let i = 0; i < this.gravityPieces.length; i++) {
            this.gravityPieces[i].update(delta);
        }

        // Update the active piece
        for (let i = 0; i < this.activePieces.length; i++) {
            // Try to move the piece
            this.activePieces[i].move(this.playerMoveInput());

            if (!this.activePieces[i].gravity) {
                this.activePieces.splice(i);
                i--;
            }
        }

        if (this.activePieces.length == 0) {
            let piece = new Piece(this.pieceSheet, 15);
            // this.board.board[0][0].piece = piece;
            piece.add(this.board.startCoord, this.board, scene);
            piece.startGravity();
            this.activePieces.push(piece);
            this.gravityPieces.push(piece);
        }
    }

    gameOver() {
        this.gameRun = false;
    }

    // Input

    // Should input be buffered until it can be run?
    playerMoveInput() : number {
        let input = this.movementInput;
        this.movementInput = 0;
        return input;
    }

    moveLeft() {
        this.movementInput = -1;
    }

    moveRight() {
        this.movementInput = 1;
    }
}