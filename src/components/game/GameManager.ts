// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,

import { PieceType } from "~/enums/PieceType";
import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";
import ActivePiece from "./ActivePiece";
import Board from "./Board";
import ChainAnalyzer from "./ChainAnalyzer";
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

    chainAnalyzer: ChainAnalyzer;
    minLength: number = 4;

    constructor(pieceSheet: string) {
        this.pieceSheet = pieceSheet;
        this.gravityPieces = [];
        this.board = new Board(this, { x: 6, y: 12 });
        this.chainAnalyzer = new ChainAnalyzer(this);
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

        // Update each falling piece
        // If the piece is no longer falling, remove it from the gravity pieces array
        for (let i = 0; i < this.gravityPieces.length; i++) {
            if (this.gravityPieces[i].update(delta)) {
                this.gravityPieces.splice(i);
                i--;
            }
        }

        // When all pieces have stopped falling, check the board for chains
        // After that, continue to the next piece
        if (this.gravityPieces.length == 0 && this.activePiece == undefined) {
            this.chainAnalyzer.update();
            this.createNewPiece(scene);
        }

        // Update the active piece
        let result = this.activePiece?.update(delta, this.playerMoveInput(), this.playerRotateInput());
        if (!result) {
            if (this.activePiece == undefined 
                || this.activePiece.bottomPiece.boardPos == undefined
                || this.activePiece.topPiece.boardPos == undefined) return;

            // Check the active piece for an overhang
            // Both the top and bottom pieces are checked independently
            // If there is no collision below the piece, then that piece is
            // removmed from the collision map and added to the gravity list
            if (!this.board.checkPieceDownCollision(this.activePiece?.bottomPiece.boardPos)) {
                this.activePiece.bottomPiece.removeFromBoard();
                this.gravityPieces.push(this.activePiece.bottomPiece);
                this.activePiece.bottomPiece.startGravity();
            }

            if (!this.board.checkPieceDownCollision(this.activePiece?.topPiece.boardPos)) {
                this.activePiece.topPiece.removeFromBoard();
                this.gravityPieces.push(this.activePiece.topPiece);
                this.activePiece.topPiece.startGravity();
            }

            this.activePiece = undefined;
        }
    }

    // Temporary function
    // To be replaced with the piece constructor class
    createNewPiece(scene: Phaser.Scene) {
        let piece = new Piece(this.pieceSheet, 0);
        let piece2 = new Piece(this.pieceSheet, 16);
        this.activePiece = new ActivePiece(piece, piece2, this.board);
        this.activePiece.start(scene);
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