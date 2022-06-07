import Phaser from "phaser";

// Scenes
import StartMenu from "./scenes/StartMenu";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080
    },
    physics: {
    },
    scene: [StartMenu],
    parent: "game"
}

export default new Phaser.Game(config);