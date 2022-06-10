import DefaultImage from "~/interfaces/UI/DefaultImage";
import Text from "~/interfaces/UI/Text";

export const playButtonText : Text = {
    text: "play",
    offset: {
        x: 50,
        y: 0
    },
    normalStyle: {
        fontFamily: "MavenPro",
        fontSize: "64px",
        fontStyle: "normal",
        color: "#ffffff",
    },
    hoverStyle: {
        fontFamily: "MavenPro",
        fontSize: "64px",
        color: "#ffff00"
    },
    clickedStyle: {
        fontFamily: "MavenPro",
        fontSize: "64px",
        color: "#778877",
    },
    origin: {
        x: 0,
        y: 0.5
    },
};

export const playButtonImage : DefaultImage = {
    texture: "piece_sheet",
    frame: 1,
    offset: {
        x: -50,
        y: 0,
    },
    scale: {
        x: 0.5,
        y: 0.5
    },
}