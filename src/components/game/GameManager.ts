import { GapSize } from "../../constants/GameOptions";
import VectorPos from "~/interfaces/universal/VectorPos";
import PiecePreview from "../UI/PiecePreview";
import ActivePiece from "./ActivePiece";
import Board from "./Board";
import ChainAnalyzer from "./ChainAnalyzer";
import Piece from "./Piece";
import PieceConstructor from "./PieceConstructor";

// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,
// keeping track of the score, managing when the player has control and over what
export default class GameManager {
    board: Board;

    gravityPieces: Piece[];
    activePiece?: ActivePiece;

    gameRun: boolean = true;
    movementInput: integer;
    rotateInput: integer;

    chainAnalyzer: ChainAnalyzer;
    minLength: number = 4;

    pieceConstructor : PieceConstructor;
    piecePreview : PiecePreview;

    constructor(pieceSheet: string) {
        this.gravityPieces = [];
        this.board = new Board(this, { x: 6, y: 12 });
        this.chainAnalyzer = new ChainAnalyzer(this);
        this.pieceConstructor = new PieceConstructor(this.board, pieceSheet);
        this.piecePreview = new PiecePreview("bg");
        this.movementInput = 0;
        this.rotateInput = 0;
    }

    // Phaser scene additions are here since they aren't ready when
    // the GameManager is constructed.
    create(scene: Phaser.Scene) {
        // Create the board and center it
        this.board.createBoard();
        this.board.setBoardPos({ x: scene.scale.width / 2, y: scene.scale.height / 2 });
        
        let previewPos : VectorPos = {
            x: this.board.boardPos.x + (this.board.x + 1) * GapSize.x,
            y: this.board.boardPos.y + 1 * GapSize.y
        }
        this.piecePreview.setPosition(previewPos);
        this.piecePreview.add(scene);
    }

    // Creates a random piece to display on the screen
    test(scene: Phaser.Scene) {
        this.board.drawDebug(scene);

        this.nextPiece(scene);
    }

    update(delta: number, scene: Phaser.Scene) {
        if (!this.gameRun) return;

        // When all pieces have stopped falling, check the board for chains
        // After that, continue to the next piece
        if (this.gravityPieces.length == 0 && this.activePiece == undefined) {
            console.log("chain check");
            this.chainAnalyzer.update();
            // Check for hanging pieces
            if (!this.handleHangingPieces()) this.nextPiece(scene);
        }
        // Update each falling piece
        // If the piece is no longer falling, remove it from the gravity pieces array
        for (let i = 0; i < this.gravityPieces.length; i++) {
            if (this.gravityPieces[i].update(delta)) {
                this.gravityPieces.splice(i, 1);
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
            // removed from the collision map and added to the gravity list
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

    // Uses the next piece, assigning to the currently active piece
    // and updates the PiecePreview to match
    nextPiece(scene: Phaser.Scene) {
        this.activePiece = this.pieceConstructor.useNextPiece();
        // this.piecePreview.update(this.pieceConstructor.getNextPiece(), this.pieceConstructor.getFuturePiece());
    
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