import { PieceType } from "~/enums/PieceType";
import BoardTile from "~/interfaces/game/BoardTile";
import VectorPos from "~/interfaces/universal/VectorPos";
import GameManager from "./GameManager";

export default class ChainAnalyzer {
    manager: GameManager;
    chainId: integer = 0;

    constructor(manager : GameManager) {
        this.manager = manager;
    }

    // Analyzes the board for chains, destroying chains that are large enough
    // Pieces are updated to match their position in the chain
    update() {
        const chains : Map<number, { chain: VectorPos[], type: number }> = this.identifyChains();
        const validChains : Map<number, {chain: VectorPos[], type: number }> = this.getValidChains(chains);

        let piecesCleared = 0;
        let uniqueTypes = new Set<Number>();
        chains.forEach((value) => {
            piecesCleared += value.chain.length;
            uniqueTypes.add(value.type);
        });


        let stats = {
            totalChains: validChains.size,
            piecesCleared: piecesCleared,
            types: uniqueTypes.size,
        }

        this.destroyChains(validChains);

        return stats;
    }

    // Identifies and assigns each chain with a unique chainId
    private identifyChains() : Map<number, {chain: VectorPos[], type: number}> {
        let identifiedChains = new Map<number, {chain: VectorPos[], type: number }>();

        for (let y = 0; y < this.manager.board.board.length; y++) {
            for (let x = 0; x < this.manager.board.board[y].length; x++) {
                let vertex : BoardTile = this.manager.board.board[y][x];
                // If there is no piece, then it doesn't make sense to check that spot
                if (vertex.piece == undefined) continue;
                
                vertex.piece.updateSprite();

                // If the chain id is not -1, then it has already been identified
                if (vertex.chainId != -1) continue;

                let puyoType = vertex.piece.type;
                let chain = this.identifyPiece(x, y, puyoType, this.chainId);
                if (chain != undefined) identifiedChains.set(this.chainId, {chain: chain, type: puyoType });

                this.chainId++;

            }
        }
        return identifiedChains;
    }

    // Recursively checks adjacent pieces to construct a chain
    private identifyPiece(x: number, y: number, type: PieceType, chainId: number) : VectorPos[] | undefined {
        // Check if the vertex is valid
        if (x < 0 || y < 0 || x >= this.manager.board.board[0].length || y >= this.manager.board.board.length) return undefined;

        let chain : VectorPos[] = [];

        let vertex = this.manager.board.board[y][x];
        // Chains don't persist over gaps and aren't of different types
        if (vertex.piece == undefined || vertex.piece.type != type || vertex.chainId == chainId) return undefined;

        let puyoType = vertex.piece.type;
        vertex.chainId = chainId;
        chain.push({ x: x, y: y });

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

    // Returns the map of chains with length greater than or equal than the required
    private getValidChains(chains : Map<number, {chain: VectorPos[], type: number }>) : Map<number, { chain: VectorPos[], type: number }> {
        let validChains = new Map<number, { chain: VectorPos[], type: number }>();

        chains.forEach((value, key) => {
            if (value.chain.length >= this.manager.minLength) {
                validChains.set(key, { chain: value.chain, type: value.type } );
            }
        });

        return validChains;
    }

    // Destroys all chains that are specified
    // Does so by looping through each value and removing all references to the piece
    private destroyChains(chains : Map<number, {chain: VectorPos[], type: number}>) {
        if (chains.size == 0) return;

        chains.forEach((value, key) => {
            for (let i = 0; i < value.chain.length; i++) {
                // Remove piece render from screen
                this.manager.board.board[value.chain[i].y][value.chain[i].x].piece?.sceneImage?.destroy();
                // Remove piece reference in board (ie. the collision map)
                this.manager.board.board[value.chain[i].y][value.chain[i].x].piece?.removeFromBoard();
                // Reset board position chain id
                this.manager.board.board[value.chain[i].y][value.chain[i].x].chainId = -1;
            }
        })

        this.resetChains();
    }

    // Resets the board's chain IDs to -1
    private resetChains() {
        for (let y = 0; y < this.manager.board.board.length; y++) {
            for (let x = 0; x < this.manager.board.board[y].length; x++) {
                this.manager.board.board[y][x].chainId = -1;
            }
        }
        this.chainId = 0;
    }

}