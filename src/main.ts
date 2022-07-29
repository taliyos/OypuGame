import Phaser from "phaser";

// Scenes
import StartMenu from "./scenes/StartMenu";
import OfflineGame from "./scenes/OfflineGame";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080
    },
    physics: {
    },
    scene: [OfflineGame],
    parent: "game"
}

export default new Phaser.Game(config);