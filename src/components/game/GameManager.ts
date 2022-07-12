// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,

import { PieceType } from "~/enums/PieceType";
import BoardTile from "~/interfaces/game/BoardTile";
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

        // Update each falling piece
        // If the piece is no longer falling, remove it from the gravity pieces array
        for (let i = 0; i < this.gravityPieces.length; i++) {
            if (this.gravityPieces[i].update(delta)) {
                this.gravityPieces.splice(i);
                i--;
            }
            
        }

        // When all pieces have stopped falling, check the board for chains
        if (this.gravityPieces.length == 0 && this.activePiece == undefined) {
            this.identifyChains();
            this.checkChains(scene);             
            this.createNewPiece(scene);
        }

        // Update the active piece
        let result = this.activePiece?.update(delta, this.playerMoveInput(), this.playerRotateInput());
        if (!result) {
            if (this.activePiece == undefined 
                || this.activePiece.bottomPiece.boardPos == undefined
                || this.activePiece.topPiece.boardPos == undefined) return;
            // Check the active piece for an overhang
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

    // Identifies each piece with a chain
    identifyChains() {
        let chainId = 0;
        let chains : BoardTile[][] = [];
        for (let y = 0; y < this.board.board.length; y++) {
            for (let x = 0; x < this.board.board[y].length; x++) {
                let vertex : BoardTile = this.board.board[y][x];

                // If the chain id is not -1, then it has already been identified
                if (vertex.chainId != -1) continue;
                // If there is no piece, then it doesn't make sense to check that spot
                if (vertex.piece == undefined) continue;

                let puyoType = vertex.piece.type;
                let chain = this.identifyPiece(x, y, puyoType, chainId);

                if (chain != undefined) {
                    chainId++;
                }

            }
        }
        this.board.printDebug();
    }

    // Checks the piece for a match
    private identifyPiece(x: number, y: number, type: PieceType, chainId: number) : BoardTile[] | undefined {
        // Check if the vertex is valid
        if (x < 0 || y < 0 || x >= this.board.board[0].length || y >= this.board.board.length) return undefined;

        let chain : BoardTile[] = [];

        let vertex = this.board.board[y][x];
        if (vertex.piece == undefined || vertex.piece.type != type || vertex.chainId == chainId) return undefined;

        let puyoType = vertex.piece.type;
        vertex.chainId = chainId;
        chain.push(vertex);

        let p1 = this.identifyPiece(x, y - 1, puyoType, vertex.chainId);
        let p2 = this.identifyPiece(x - 1, y, puyoType, vertex.chainId);
        let p3 = this.identifyPiece(x + 1, y, puyoType, vertex.chainId);
        let p4 = this.identifyPiece(x, y + 1, puyoType, vertex.chainId);

        if (p1 != undefined) chain = chain.concat(p1);
        if (p2 != undefined) chain = chain.concat(p2);
        if (p3 != undefined) chain = chain.concat(p3);
        if (p4 != undefined) chain = chain.concat(p4);

        return chain;
    }

    // Checks each chain for chains of sufficient length
    // Queued up and removed and the same time
    checkChains(scene: Phaser.Scene) {

    }

    // Test function
    createNewPiece(scene: Phaser.Scene) {
        let piece = new Piece(this.pieceSheet, 15);
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