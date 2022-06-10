import Phaser from "phaser";
import ButtonText from "../components/ButtonText";

import Button from "../components/Button";

import pieceSpriteSheet from "../static/pieces/full-sheet.png";
import {
    playButtonText, playButtonImage, statsButtonText, statsButtonImage,
    settingsButtonText, settingsButtonImage, titleTextStyleA, titleTextStyleB, titleTextStyleC
} from "../constants/StartMenuUI";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    // Load in all necessary assets
    // (buttons, backgrounds, etc.)
    preload() {
        this.load.spritesheet("piece_sheet", pieceSpriteSheet, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 79
        });
    }

    create() {
        // Title
        

        // Menu Buttons
        let playButton = new Button(this.scale.width / 2 - 64, 400, new ButtonText(playButtonText), playButtonImage);
        let statsButton = new Button(this.scale.width / 2 - 62, 525, new ButtonText(statsButtonText), statsButtonImage);
        let settingsButton = new Button(this.scale.width / 2 - 64, 650, new ButtonText(settingsButtonText), settingsButtonImage);

        playButton.add(Phaser.Math.Vector2.ZERO, this);
        statsButton.add(Phaser.Math.Vector2.ZERO, this);
        settingsButton.add(Phaser.Math.Vector2.ZERO, this);



        // Title Text
        const titleText = new ButtonText({
            text: "oypu!",
            normalStyle: titleTextStyleA,
            hoverStyle: titleTextStyleB,
            clickedStyle: titleTextStyleC,
            offset: { x: this.scale.width/2, y: 150 },
            origin: { x: 0.5, y: 0.5 },
        })

        const addedText = titleText.add(Phaser.Math.Vector2.ZERO, this);
        titleText.linkInteractivity(addedText);
    }
}