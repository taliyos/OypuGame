import Phaser from "phaser";
import ButtonText from "../components/UI/ButtonText";

import Button from "../components/UI/Button";

import pieceSpriteSheet from "../static/pieces/full-sheet.png";
import {
    playButtonText, playButtonImage, statsButtonText, statsButtonImage,
    settingsButtonText, settingsButtonImage, titleTextStyleA, titleTextStyleB, titleTextStyleC
} from "../constants/StartMenuUI";
import { GoToGame, TitleClick } from "../interactions/UIInteractions";

export default class StartMenu extends Phaser.Scene {
    playButton: Button | undefined;
    statsButton: Button | undefined;
    settingsButton: Button | undefined;
    titleText: Button | undefined;
    
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
        this.playButton = new Button({ x: this.scale.width / 2 - 64, y: 400 }, new ButtonText(playButtonText, GoToGame), playButtonImage);
        this.statsButton = new Button({ x: this.scale.width / 2 - 62, y: 525 }, new ButtonText(statsButtonText, GoToGame), statsButtonImage);
        this.settingsButton = new Button({ x: this.scale.width / 2 - 64, y: 650 }, new ButtonText(settingsButtonText, GoToGame), settingsButtonImage);

        this.playButton.add(Phaser.Math.Vector2.ZERO, this);
        this.statsButton.add(Phaser.Math.Vector2.ZERO, this);
        this.settingsButton.add(Phaser.Math.Vector2.ZERO, this);



        // Title Text
        this.titleText = new Button({ x: this.scale.width/2, y: 150 }, new ButtonText({
            text: "oypu!",
            normalStyle: titleTextStyleA,
            hoverStyle: titleTextStyleB,
            clickedStyle: titleTextStyleC,
            origin: { x: 0.5, y: 0.5 },
            offset: undefined,
        }, TitleClick));

        this.titleText.add(Phaser.Math.Vector2.ZERO, this);
    }

    update() {

    }
}