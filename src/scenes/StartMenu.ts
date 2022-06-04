import Phaser from "phaser";

import playButtonImage from "../static/menu/play.png";
import pieceSpriteSheet from "../static/pieces/full-sheet.png";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    // Load in all necessary assets
    // (buttons, backgrounds, etc.)
    preload() {
        this.load.image("play_btn", playButtonImage);

        this.load.spritesheet("piece_sheet", pieceSpriteSheet, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 79
        });
    }

    create() {
        // const playBtn: Phaser.GameObjects.Image = this.add.image(this.scale.width / 2, this.scale.height / 2, "play_btn");
        // playBtn.setInteractive();

        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, "oypu!", {
            fontFamily: "MavenPro-Bold",
            fontSize: "32px"
        });

        const redPuyoNormal = this.add.image(this.scale.width / 2, this.scale.height / 2 - 0, "piece_sheet", 0);
    }
}