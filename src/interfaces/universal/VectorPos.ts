// A very simple implementation of a vector2
// that only contains x and y.
// Intended for use in interface definitions to prevent need for
// separating x and y or using Phaser's Vector2
export default interface VectorPos {
    x: number,
    y: number
}