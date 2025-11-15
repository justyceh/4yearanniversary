import Phaser from "phaser";

export class Dialogue {
    constructor(scene, message, options=[], response1, response2) {
        this.isOpen = false;
        this.scene = scene;
        this.response1 = response1;
        this.response2 = response2;
        this.message = message;
        this.options = options;
        this.textBox = scene.add.rectangle(800, 550, 600, 150, 0x000000, 0.8);
        this.text = scene.add.text(620, 500, message, {
            fontSize: "20px",
            color: "#ffffff",
            wordWrap: {width: 400},
        })
        this.textBox.setVisible(false);
        this.text.setVisible(false);
        this.textBox.setDepth(1000);
        this.text.setDepth(1001);
        this.text.setText(message);
        if (options.length > 0) {
            if (options.length === 1) {
                let optionsText = `\n\n X) ${options[0]}!`;
                this.text.setText(message + optionsText);
            }
            else {
                let optionsText = `\n\n  A)${options[0] }     B)${options[1]}`;
                this.text.setText(message + optionsText);
            }
        }
    }
    show() {
        this.textBox.setVisible(true);
        this.text.setVisible(true);
        this.isOpen = true;
    }
    hide() {
        this.textBox.setVisible(false);
        this.text.setVisible(false);
        this.isOpen = false;
    }
    getResponse(key) {
        if (this.options.length === 0) return null;
        if (key === "A") return this.response1;
        if (key === "B") return this.response2;
        if (key === "X") {
            this.hide();
            return null;
        }
        else return null;
    }

}