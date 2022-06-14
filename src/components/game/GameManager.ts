// Handles the game and it's logic
// Responsible for creating pieces, checking for piece connections,

import Board from "./Board";
import Piece from "./Piece";

// keeping track of the score, managing when the player has control and over what
export default class GameManager {
    pieceSheet: string;
    board: Board;

    gravityPieces: Piece[];

    constructor(pieceSheet: string) {
        this.pieceSheet = pieceSheet;
        this.board = new Board();
        this.gravityPieces = [];
    }

    // Creates a random piece to display on the screen
    test(scene: Phaser.Scene) {
        let piece = new Piece(this.pieceSheet, 15);
        // this.board.board[0][0].piece = piece;
        piece.add({ x: 200, y: 200}, scene);
        piece.startGravity();
        this.gravityPieces.push(piece);

        let piece2 = new Piece(this.pieceSheet, 35);
        piece2.add({ x: 800, y: 300}, scene);
    }

    update(delta: number) {
        for (let i = 0; i < this.gravityPieces.length; i++) {
            this.gravityPieces[i].update(delta);
        }
    }
}