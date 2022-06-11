// Interface with the prototypes for an interactive ui sprite
// The idea is to allow the sprite to swap when certain events occur
export default interface InteractiveUISprite {
    pointerDown(image: Phaser.GameObjects.Image): void;
    pointerUp(image: Phaser.GameObjects.Image): void;
    pointerMove(image: Phaser.GameObjects.Image): void;
    pointerOver(image: Phaser.GameObjects.Image): void;
    pointerOut(image: Phaser.GameObjects.Image): void;
}