import ActivePiece from "./ActivePiece";
import Board from "./Board";
import Piece from "./Piece";

// Creates Pieces, wrapped inside an ActivePiece
export default class PieceConstructor {
    board: Board;
    pieceSheet: string;

    constructor(board: Board, pieceSheet: string) {
        this.board = board;
        this.pieceSheet = pieceSheet;
    }

    createActivePiece() : ActivePiece {
        
        let piece = new Piece(this.pieceSheet, this.getRandomPiece());
        let piece2 = new Piece(this.pieceSheet, this.getRandomPiece());

        return new ActivePiece(piece, piece2, this.board);
    }

    private getRandomPiece() : integer {
        return Math.floor(Math.random() * 5) * 16;
    }
}