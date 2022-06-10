import DefaultImage from "~/interfaces/UI/DefaultImage";
import Text from "~/interfaces/UI/Text";

// Default Text Styles
export const normalTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "64px",
    fontStyle: "normal",
    color: "#ffffff",
}

export const hoverTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "64px",
    color: "#ffff00"
}

export const clickedTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "64px",
    color: "#778877",
}

// Title Text Styles
export const titleTextStyleA: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "200px",
    fontStyle: "bold",
    color: "#ffffff",
}

export const titleTextStyleB: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "200px",
    fontStyle: "bold",
    color: "#ffaa11",
}

export const titleTextStyleC: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: "MavenPro",
    fontSize: "200px",
    fontStyle: "bold",
    color: "#10ffaa",
}


// Text and Images
export const playButtonText: Text = {
    text: "play",
    offset: { x: 50, y: 0 },
    normalStyle: normalTextStyle,
    hoverStyle: hoverTextStyle,
    clickedStyle: clickedTextStyle,
    origin: { x: 0, y: 0.5 },
};

export const playButtonImage: DefaultImage = {
    texture: "piece_sheet",
    frame: 1,
    offset: { x: -50, y: 0 },
    scale: { x: 0.5, y: 0.5 },
}

export const statsButtonText: Text = {
    text: "stats",
    offset: { x: 50, y: 0 },
    normalStyle: normalTextStyle,
    hoverStyle: hoverTextStyle,
    clickedStyle: clickedTextStyle,
    origin: { x: 0, y: 0.5 },
}

export const statsButtonImage: DefaultImage = {
    texture: "piece_sheet",
    frame: 3,
    offset: { x: -50, y: 0 },
    scale: { x: 0.5, y: 0.5 },
}

export const settingsButtonText: Text = {
    text: "settings",
    offset: { x: 50, y: 0 },
    normalStyle: normalTextStyle,
    hoverStyle: hoverTextStyle,
    clickedStyle: clickedTextStyle,
    origin: { x: 0, y: 0.5 },
}

export const settingsButtonImage: DefaultImage = {
    texture: "piece_sheet",
    frame: 2,
    offset: { x: -50, y: 0 },
    scale: { x: 0.5, y: 0.5 },
}