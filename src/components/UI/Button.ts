import Phaser from "phaser";
import ButtonText from "./ButtonText";
import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";
import BasicUISprite from "~/interfaces/UI/Sprite/BasicUISprite";
import UISprite from "./UISprite";

export default class Button implements PhaserObject {
    position: VectorPos = { x: 0, y: 0 };
    text: ButtonText | undefined;
    sprite: UISprite | undefined;

    private sceneText?: Phaser.GameObjects.Text;
    private sceneImage?: Phaser.GameObjects.Image; 

    constructor(position: VectorPos, text?: ButtonText, uiSprite?: BasicUISprite) {
        this.position = position;

        if (text == undefined && uiSprite == undefined) {
            console.error("ERROR: A button must have at least an image or text.");
            return;
        }

        if (text != undefined)
            this.text = text;
        if (uiSprite != undefined)
            this.sprite = new UISprite(uiSprite);

        this.generateHitbox();
    }

    // Automatically creates the interactive hitbox based on
    // the image and text offset
    private generateHitbox() {

    }

    // Links interactivity of the button to the game
    private linkInteractivity() {
        // Text interactivity is only possible if there is text on the button
        // Temporary return while testing text feedback
        if (this.text == undefined || this.sceneText == null) return;
        let sceneText : Phaser.GameObjects.Text = this.sceneText;
        let text : ButtonText = this.text;

        // TODO: Modify to include hitbox
        this.sceneText.setInteractive().on("pointerdown", () => {text.pointerDown(sceneText)}) // pointer click down
                                       .on("pointerup",   () => {text.pointerUp(sceneText)})   // pointer click release
                                       .on("pointermove", () => {text.pointerMove(sceneText)}) // not used
                                       .on("pointerover", () => {text.pointerOver(sceneText)}) // hover in
                                       .on("pointerout",  () => {text.pointerOut(sceneText)}); // pointer no longer in text box
    }

    // Adds the button to the Phaser Game
    add(position: VectorPos, scene: Phaser.Scene): void {
        // Add the text to the scene
        if (this.text != undefined) {
            this.sceneText = this.text.add(this.position, scene);
        }

        // Add the button to the scene
        if (this.sprite != undefined) {
            this.sceneImage = this.sprite.add(this.position, scene);
        }

        // Button now "exists" in scene, so make it interactive
        this.linkInteractivity();
    }
}