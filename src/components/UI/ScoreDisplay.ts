import { GapSize } from "../../constants/GameOptions";
import VectorPos from "~/interfaces/universal/VectorPos";
import Board from "../game/Board";
import UIText from "./UIText";

export default class ScoreDisplay {
    uiText : UIText;
    scoreLength : number;
    position: VectorPos;

    constructor(board: Board, style: Phaser.Types.GameObjects.Text.TextStyle, scoreLength: number = 8) {
        this.position = board.boardToWorldSpace({ x: board.x * 2, y: board.y + 0.5 });

        this.scoreLength = scoreLength;
        this.uiText = new UIText({
            text: this.getScoreText(0),
            offset: { x: 0, y: 0 },
            origin: { x: 0.658, y: 0.3 },
            normalStyle: style,
            hoverStyle: style,
            clickedStyle: style
        });
    }

    add(scene: Phaser.Scene) {
        this.uiText.add(this.position, scene);
    }

    update(score: number) {
        this.uiText.updateText(this.getScoreText(score));
    }

    getScoreText(score: number) : string {
        let length = score.toString().length;
        let scoreText = "";
        for (let i = 0; i < this.scoreLength - length; i++) {
            scoreText += "0";
        }
        scoreText += score;
        return scoreText;
    }
}