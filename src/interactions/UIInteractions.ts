import Phaser from "phaser";
import ButtonText from "~/components/UI/ButtonText";

// Interaction for when the title text is clicked
// Adds extra characters to the title
export function TitleClick(container: ButtonText, text: Phaser.GameObjects.Text) {
    if (text.text.length > 15) {
        if (text.text[4] == '?' && text.text[5] == '!') text.text = "OYPU!";
        else if (text.text[0] == 'O') text.text = "oypu!";
        else if (text.text[4] == '!') text.text = "oypu?";
        else text.text = "oypu?!";
    }
    else if (text.text[4] == '?' && text.text[5] == '!') {
        if (text.text.length % 2 == 1) text.text += "!";
        else text.text += "?";
    }
    else if (text.text[4] == '!') text.text += "!";
    else text.text += "?";
}

// Changes the scene to the game
export function GoToGame() {
    alert("go to game!");
}