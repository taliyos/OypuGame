import Piece from "./Piece";
import Board from "./Board";
import { GapSize, BufferTime } from "../../constants/GameOptions";
import VectorPos from "~/interfaces/universal/VectorPos";

// Holds two active pieces
export default class ActivePiece {
    bottomPiece: Piece;
    topPiece: Piece;

    linkedBoard: Board;

    rotation: number = 0;
    bufferCounter: number = 0;

    constructor(bottomPiece: Piece, topPiece: Piece, linkedBoard: Board) {
        this.bottomPiece = bottomPiece;
        this.topPiece = topPiece;

        this.linkedBoard = linkedBoard;
        this.calculateSprites();
    }

    
    // Moves the pieces as a group
    // In order to move the pieces, the collision needs to be valid for
    // both the bottom and top piece.
    // The game does not allow for overhangs, so only the piece on the bottom
    // needs to be checked. (Though the piece to check can change depending on the rotation)
    // dir must be -1, 0, or 1
    move(dir: number) {
        if (this.bottomPiece.boardPos == undefined || this.topPiece.boardPos == undefined) return;
        if (dir == 0) return;

        if (this.bufferCounter != 0) {
            this.topPiece.gravity = true;
            this.bottomPiece.gravity = true;
        }

        let piece: Piece;

        if (this.rotation == 0) {
            piece = this.bottomPiece;
        }
        else if (this.rotation == 1) {
            if(dir == 1) piece = this.topPiece;
            else piece = this.bottomPiece;
        }
        else if (this.rotation == 2) {
            piece = this.topPiece;
        }
        else if (this.rotation == 3) {
            if (dir == 1) piece = this.bottomPiece;
            else piece = this.topPiece;
        }
        else {
            console.warn("Rotation: " + this.rotation + " is not being handled by activePiece's move().");
            return;
        }

        if (!this.linkedBoard.checkPieceXCollision(piece.position, dir)) {
            this.bottomPiece.boardPos.x += dir;
            this.bottomPiece.position.x = this.linkedBoard.boardToWorldSpace(this.bottomPiece.boardPos).x;

            this.topPiece.boardPos.x += dir;
            this.topPiece.position.x = this.linkedBoard.boardToWorldSpace(this.topPiece.boardPos).x;

            this.bottomPiece.updatePosition();
            this.topPiece.updatePosition();
        }
    }

    // Rotates the pieces as a group
    // dir must be -1, 0, or 1
    rotate(dir: number) {
        if (dir == 0) return;
        this.rotation += dir;

        if (this.bufferCounter != 0) {
            this.topPiece.gravity = true;
            this.bottomPiece.gravity = true;
        }

        if (this.rotation > 3 ) this.rotation = 0;
        else if (this.rotation < 0) this.rotation = 3;
        // [T] 
        // [B]
        if (this.rotation == 0) {
            // This rotation is always possible since nothing can be above
            // the bottom piece
            // This case catches recursive calls
            this.topPiece.position = {
                x: this.bottomPiece.position.x,
                y: this.bottomPiece.position.y - GapSize.y
            };
        }
        // [B][T]
        else if (this.rotation == 1) {
            // This rotation is not always possible, check to see if it can be done
            if (this.linkedBoard.checkPieceXCollision(this.bottomPiece.position, 1)) {
                // Rotation is impossible try to progress one further
                this.rotate(dir);
                return;
            }
            this.topPiece.position = {
                x: this.bottomPiece.position.x + GapSize.x,
                y: this.bottomPiece.position.y
            }
        } 
        // [B]
        // [T]
        else if (this.rotation == 2) {
            // This rotation is not always possible
            if (this.bottomPiece.boardPos == undefined 
                || this.linkedBoard.checkPieceDownCollision(this.bottomPiece.boardPos)) {
                this.rotate(dir);
                return;
            }
            this.topPiece.position = {
                x: this.bottomPiece.position.x,
                y: this.bottomPiece.position.y + GapSize.y
            }
        } 
        // [T][B]
        else if (this.rotation == 3) {
            // This rotation is not always possible
            if (this.linkedBoard.checkPieceXCollision(this.bottomPiece.position, -1)) {
                this.rotate(dir);
                return;
            }
            this.topPiece.position = {
                x: this.bottomPiece.position.x - GapSize.x,
                y: this.bottomPiece.position.y
            }
        }

        this.topPiece.updatePosition();
        this.calculateSprites();
    }

    // Adds the pieces to the screen
    start(scene: Phaser.Scene) {
        this.addToScene(scene, this.linkedBoard.startCoord);

        this.bottomPiece.startGravity();
        this.topPiece.startGravity();
    }

    addToScene(scene : Phaser.Scene, coord: VectorPos) : Phaser.GameObjects.Image[] {
        let pieces = [];
        
        pieces.push(this.bottomPiece.add(coord, this.linkedBoard, scene));
        pieces.push(this.topPiece.add({
            x: coord.x,
            y: coord.y - 1
        }, this.linkedBoard, scene));

        return pieces;
    }

    // Updates both pieces, performing additional checks for collision
    // and allowing rotation and movement to take place.
    update(delta: number, moveDir: number, rotDir: number): boolean {
        // Update each piece
        let reachedEdgeBottom = this.bottomPiece.update(delta, true);
        let reachedEdgeTop = this.topPiece.update(delta, true);

        if (reachedEdgeBottom || reachedEdgeTop) {
            this.bufferCounter += delta;
            
            // Snap and disable gravity
            this.bottomPiece.bufferStop();
            this.topPiece.bufferStop();

            if (this.bufferCounter >= BufferTime) {
                this.bottomPiece.addToBoard();
                this.topPiece.addToBoard();
                return false;
            }
        }

        // Move the pieces
        this.move(moveDir);
        this.rotate(rotDir);

        return true;
    }

    // Determines which sprite to show so that pieces that are supposed
    // to be connected are connected in the preview and while falling
    private calculateSprites() {
        let topSprite = 0;
        let bottomSprite = 0;
        if (this.topPiece.type == this.bottomPiece.type) {
            if (this.rotation == 0) {
                topSprite = 1;
                bottomSprite = 2;
            }
            else if (this.rotation == 1) {
                topSprite = 8;
                bottomSprite = 4;
            }
            else if (this.rotation == 2) {
                topSprite = 2;
                bottomSprite = 1;
            }
            else if (this.rotation == 3) {
                topSprite = 4;
                bottomSprite = 8;
            }
        }

        this.topPiece.frame = topSprite + 16 * this.topPiece.type;
        this.bottomPiece.frame = bottomSprite + 16 * this.bottomPiece.type;

        this.topPiece.sceneImage?.setFrame(this.topPiece.frame);
        this.bottomPiece.sceneImage?.setFrame(this.bottomPiece.frame);
    }

}