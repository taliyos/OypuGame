import Phaser from "phaser";
import UIText from "./UIText";
import Text from "~/interfaces/UI/Text/Text";
import VectorPos from "~/interfaces/universal/VectorPos";
import ColorAnimation from "~/interfaces/animations/ColorAnimation";
import Animation from "~/interfaces/animations/Animation";

// Unlike most other UI components, ColorCycleText maintains a copy of its
// in-scene creation. This allows for ColorCycleText to update itself without
// relying on a reference to be kept explicitly in the scene.
// This functionality isn't needed for "static" components.
export default class ColorCycleText extends UIText implements ColorAnimation, Animation {
    sceneObject: Phaser.GameObjects.Text | null | undefined;
    
    colors: Phaser.Display.Color[] = [];
    speed: number;
    repeat: boolean;
    bounce: boolean;

    startIteration: number = 0;
    endIteration: number = 1;
    time: number = 0;

    constructor(properties: Text, colors: string[], speed: number, animation: Animation) {
        super(properties);
        for (let i = 0; i < colors.length; i++) {
            this.colors.push(Phaser.Display.Color.HexStringToColor(colors[i]));
        }

        this.speed = speed;
        this.repeat = animation.repeat;
        this.bounce = animation.bounce;
    }

    // Add the text to the screen
    add(position: VectorPos, scene: Phaser.Scene) {
        if (this.sceneObject != null) {
            console.warn("AnimatedText can only be added to the scene once.");
        }
        this.sceneObject = (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.normalStyle)).setOrigin(this.origin.x, this.origin.y);
        return this.sceneObject;
    }

    update(delta: number) {
        if (this.sceneObject == null) {
            console.warn("ColorCycleText must be added to the scene before updating.");
            return;
        }
        else if (this.colors.length <=  1) {
            console.warn("ColorCycleText must have at least two colors.");
            return;
        }
        let r = (this.colors[this.endIteration].red - this.colors[this.startIteration].red) * this.time + this.colors[this.startIteration].red;
        let g = (this.colors[this.endIteration].green - this.colors[this.startIteration].green) * this.time + this.colors[this.startIteration].green;
        let b = (this.colors[this.endIteration].blue - this.colors[this.startIteration].blue) * this.time + this.colors[this.startIteration].blue;

        // r = 

        let newColor = new Phaser.Display.Color(r, g, b);

        this.sceneObject.setColor(newColor.rgba);
        this.time += this.speed * delta / 1000.0;
        if (this.time > 1) {
            this.time = 0;
            this.startIteration = this.endIteration;
            this.endIteration++;
            if (this.endIteration >= this.colors.length) {
                this.endIteration = 0;
            }
        }
    }
}