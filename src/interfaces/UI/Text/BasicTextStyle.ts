import Phaser from "phaser";

export default interface BasicText {
    text: string;
    offset: Phaser.Math.Vector3;
    textStyle: Phaser.Types.GameObjects.Text.TextStyle;
}