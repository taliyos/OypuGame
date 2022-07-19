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

        // When all pieces have stopped falling, check the board for chains
        // After that, continue to the next piece
        if (this.gravityPieces.length == 0 && this.activePiece == undefined) {
            console.log("chain check");
            this.chainAnalyzer.update();
            // Check for hanging pieces
            if (!this.handleHangingPieces()) this.createNewPiece(scene);
        }

        // Update each falling piece
        // If the piece is no longer falling, remove it from the gravity pieces array
        for (let i = 0; i < this.gravityPieces.length; i++) {
            if (this.gravityPieces[i].update(delta)) {
                this.gravityPieces.splice(i);
                i--;
            }
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

    // Checks to see if there are pieces floating in the air
    // If there are, those pieces are added to the gravity array
    // Returns true when there is at least one hanging piece
    // False otherwise
    private handleHangingPieces() : boolean {
        // Array of integers to indicate empty columns
        // If the loop runs into one of these columns, it should be skipped
        let emptyColumns : integer[] = [];
        let hangingPiece : boolean = false;
        for (let y = this.board.absoluteY - 1; y >= 0; y--) {
            for (let x = 0; x < this.board.x; x++) {
                if (emptyColumns.includes(x)) continue;
                let piece = this.board.board[y][x].piece;
                if (piece == undefined) {
                    //console.log(piece);
                    emptyColumns.push(x);
                    //console.log("col: " + x + ", " + y + " is undefined");
                    for (let subY = y - 1; subY >= 0; subY--) {
                        let subPiece = this.board.board[subY][x].piece;
                        if (subPiece == undefined) continue;
                        //console.log(x + ", " + subY + " added overhang to gravity");
                        //console.log(subPiece);
                        subPiece.startGravity();
                        this.gravityPieces.push(subPiece);
                        subPiece.removeFromBoard();
                        hangingPiece = true;
                    }
                }
            }
        }
        return hangingPiece;
    }
}