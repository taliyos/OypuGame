// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,

import ActivePiece from "./ActivePiece";
import Board from "./Board";
import Piece from "./Piece";

// keeping track of the score, managing when the player has control and over what
export default class GameManager {
    pieceSheet: string;
    board: Board;

    gravityPieces: Piece[];
    activePiece?: ActivePiece;

    gameRun: boolean = true;
    movementInput: integer;
    rotateInput: integer;

    constructor(pieceSheet: string) {
        this.pieceSheet = pieceSheet;
        this.gravityPieces = [];
        this.board = new Board(this, { x: 6, y: 12 });
        this.movementInput = 0;
        this.rotateInput = 0;
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
        this.board.drawDebug(scene);

        let piece = new Piece(this.pieceSheet, 15);
        let piece2 = new Piece(this.pieceSheet, 16);
        this.activePiece = new ActivePiece(piece, piece2, this.board);
        this.activePiece.start(scene);
    }

    update(delta: number, scene: Phaser.Scene) {
        if (!this.gameRun) return;
        for (let i = 0; i < this.gravityPieces.length; i++) {
            this.gravityPieces[i].update(delta);
        }

        this.activePiece?.update(delta, this.playerMoveInput(), this.playerRotateInput());
        /*
        // Update the active piece
        for (let i = 0; i < this.activePieces.length; i++) {
            // Try to move the piece
            this.activePieces[i].move(this.playerMoveInput());

            if (!this.activePieces[i].gravity) {
                this.activePieces.splice(i);
                i--;
            }
        }*/

        /*if (this.activePieces.length == 0) {
            let piece = new Piece(this.pieceSheet, 15);
            // this.board.board[0][0].piece = piece;
            piece.add(this.board.startCoord, this.board, scene);
            piece.startGravity();
            this.activePieces.push(piece);
            this.gravityPieces.push(piece);
        }*/
    }

    gameOver() {
        this.gameRun = false;
    }

    // Input

    // Should input be buffered until it can be run?
    playerMoveInput() : integer {
        let input = this.movementInput;
        this.movementInput = 0;
        return input;
    }

    playerRotateInput() : integer {
        let input = this.rotateInput;
        this.rotateInput = 0;
        return input;
    }

    moveLeft() {
        this.movementInput = -1;
    }

    moveRight() {
        this.movementInput = 1;
    }

    rotLeft() {
        this.rotateInput = -1;
    }

    rotRight() {
        this.rotateInput = 1;
    }
}