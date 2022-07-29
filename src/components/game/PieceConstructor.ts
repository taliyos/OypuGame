import ActivePiece from "./ActivePiece";
import Board from "./Board";
import Piece from "./Piece";

// Creates Pieces, wrapped inside an ActivePiece
export default class PieceConstructor {
    board: Board;
    pieceSheet: string;

    nextPiece : ActivePiece;
    futurePiece: ActivePiece;

    constructor(board: Board, pieceSheet: string) {
        this.board = board;
        this.pieceSheet = pieceSheet;
        this.nextPiece = this.createActivePiece();
        this.futurePiece = this.createActivePiece();
    }

    // Moves the future piece to the next piece, removing the previous next piece
    // A new future piece is created.
    // Returns the next piece
    useNextPiece() : ActivePiece {
        let piece = this.nextPiece;
        this.nextPiece = this.futurePiece;
        this.futurePiece = this.createActivePiece();

        return piece;
    }

    // Returns the next piece
    getNextPiece() : ActivePiece {
        return this.nextPiece;
    }

    // Returns the future piece
    getFuturePiece() : ActivePiece {
        return this.futurePiece;
    }

    // Randomly creates a new active piece, made up of
    // two pieces
    // Returns the created ActivePiece
    private createActivePiece() : ActivePiece {
        let piece1 = new Piece(this.pieceSheet, this.getRandomPiece());
        let piece2 = new Piece(this.pieceSheet, this.getRandomPiece());

        return new ActivePiece(piece1, piece2, this.board);
    }

    // Gets a random piece type
    private getRandomPiece() : integer {
        return Math.floor(Math.random() * 5) * 16;
    }
}