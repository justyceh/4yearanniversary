import Phaser from "phaser";
import walkSpriteSheet from "../assets/walk.png";
import Player from "../objects/Player";
import skyBackground from "../assets/sky.jpg";
import mcqueenImage from "../assets/mcqueen.png";
import groundImage from "../assets/redblock.png";
import Npc from "../objects/Npc";
import npcSpriteSheet from "../assets/idle.png";

export default class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.spritesheet("player", walkSpriteSheet, {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("npc", npcSpriteSheet, {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.image("background", skyBackground);
    this.load.image("mcqueen", mcqueenImage);
    this.load.image("ground", groundImage);
  }

  create() {
    this.dialogueBox = this.add.rectangle(800, 550, 600, 150, 0x000000, 0.8);
    this.dialogueText = this.add.text(620, 500, "", {
    fontSize: "20px",
    color: "#ffffff",
    wordWrap: { width: 400 }
    });

// Hide at start
    this.dialogueBox.setVisible(false);
    this.dialogueText.setVisible(false);
    this.dialogueBox.setDepth(1000);
    this.dialogueText.setDepth(1001);

    this.nearNpc = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(500, 200, "mcqueen");
    this.player = new Player(this, 100, 500, "player");
    this.npc = new Npc(this, 400, 500, "npc");
    
    let topWall = this.add.zone(600, 375, 1200, 50);
    this.physics.add.existing(topWall, true);
    this.physics.add.collider(this.player.sprite, topWall);
    this.physics.add.collider(this.player.sprite, this.npc.sprite);

    this.input.keyboard.on("keydown-E", () => {
      if (this.nearNpc) {
        this.npc.sprite.setFrame(2);
        this.npc.sprite.refreshBody();
         this.showDialogue("Hey! Are you following me?", ["Yes", "No"]);
      }
    });
  }

  showDialogue(text, choices) {
    // Create the dialogue box
    this.dialogueBox.setVisible(true);
    this.dialogueText.setVisible(true);

    this.dialogueText.setText(
        text + "\n\n" + `A) ${choices[0]}     B) ${choices[1]}`
    );

    // Add listeners for choices
     this.input.keyboard.once("keydown-A", () => {
     this.handleChoice(choices[0]);
    });

     this.input.keyboard.once("keydown-B", () => {
     this.handleChoice(choices[1]);
    });

}

showDialogue2(text) {
    // Create the dialogue box
    this.dialogueBox.setVisible(true);
    this.dialogueText.setVisible(true);

    this.dialogueText.setText(
        text
    );

    // Add listeners for choices
     this.input.keyboard.once("keydown-E", () => {
     this.handleChoice("Close");
    });

     

}

handleChoice(choice) {
    this.dialogueBox.setVisible(false);
    this.dialogueText.setVisible(false);

    console.log("Player chose:", choice);


    if (choice === "Yes") {
      this.showDialogue2("I knew it! It's okay though because your a cutie! Go click E on the door!");
      return;
    }
    else if (choice === "No") {
      this.showDialogue2("4 Years later and you still cant admit you were following me? Your so cute! Now go click E on the door!");
    }
    else{
      // Do nothing
    }

    // You can trigger quests, dialogue, animations, etc. here
}


    update() {

      const distance = Phaser.Math.Distance.Between(
      this.player.sprite.x,
      this.player.sprite.y,
      this.npc.sprite.x,
      this.npc.sprite.y
    );
      this.nearNpc = distance < 50;
      this.player.update(this.cursors);
     }
}
