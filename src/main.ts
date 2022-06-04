import Phaser from "phaser";

// Scenes
import StartMenu from "./scenes/StartMenu";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
    },
    scene: [StartMenu],
    parent: "game"
}

export default new Phaser.Game(config);