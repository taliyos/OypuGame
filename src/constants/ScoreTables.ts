export function getLayerPower(piecesCleared: number) : number {
    if (piecesCleared >= 4) return 32 + 32 * (piecesCleared - 4);
    return Math.pow(2, piecesCleared + 1);
}

export function getTypePower(uniqueTypes: number) : number {
    if (uniqueTypes == 1) return 0;
    return 3 * 2^(uniqueTypes -  2)
}