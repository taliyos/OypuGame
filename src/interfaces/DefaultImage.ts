// A normal image with no additional properties for interactivity
export default interface DefaultImage {
    texture: string;
    frame?: string | number | undefined;
    offset: Phaser.Math.Vector2;
    scale: Phaser.Math.Vector2;
}