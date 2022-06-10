import Phaser from "phaser";
import ButtonText from "./ButtonText";
import DefaultImage from "~/interfaces/UI/DefaultImage";
import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";

export default class Button implements PhaserObject {
    position: VectorPos = { x: 0, y: 0 };
    text: ButtonText | undefined;
    image: DefaultImage | undefined;

    private sceneText?: Phaser.GameObjects.Text;
    private sceneImage?: Phaser.GameObjects.Image; 

    constructor(position: VectorPos, text?: ButtonText, image?: DefaultImage) {
        this.position = position;
        if (text != undefined)
            this.text = text;
        if (image != undefined)
            this.image = image;

        if (text == null && image == null) {
            console.error("ERROR: A button must have at least an image or text.");
            return;
        }

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
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene) {
        // Add the text to the scene
        if (this.text != undefined) {
            this.sceneText = this.text.add(this.position, scene);
        }

        // Add the button to the scene
        if (this.image != undefined) {
            this.sceneImage = scene.add.image(this.position.x + this.image.offset.x, this.position.y + this.image.offset.y, this.image.texture, this.image.frame)
                .setOrigin(0.5).setScale(this.image.scale.x, this.image.scale.y);
        }

        // Button now "exists" in scene, so make it interactive
        this.linkInteractivity();
    }
}