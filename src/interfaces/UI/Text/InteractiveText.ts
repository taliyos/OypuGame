import Phaser from "phaser";
import ButtonText from "~/components/UI/ButtonText";

// Interface with the prototypes for interactive text
export default interface InteractiveText {
    clickedAction: Function;
    
    pointerDown(text: Phaser.GameObjects.Text): void;
    pointerUp(text: Phaser.GameObjects.Text): void;
    pointerMove(text: Phaser.GameObjects.Text): void;
    pointerOver(text: Phaser.GameObjects.Text): void;
    pointerOut(text: Phaser.GameObjects.Text): void;
}