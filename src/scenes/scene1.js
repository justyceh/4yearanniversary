import Phaser from "phaser";
import walkSpriteSheet from "../assets/walk.png";
import Player from "../objects/Player";
import skyBackground from "../assets/sky.jpg";
import mcqueenImage from "../assets/mcqueen.png";
import groundImage from "../assets/redblock.png";
import Npc from "../objects/Npc";
import npcSpriteSheet from "../assets/idle.png";
import { Dialogue } from "../objects/Dialogue";

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
    this.quest = new Dialogue(this, "Are you following me?", ["Yes", "No"], "I knew it! But it's fine cause your cute and I love you!", "Wow you cant admit it even 4 years later huh? But it's fine cause your cute and I love you");
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
        let response = "";
        this.npc.sprite.setFrame(2);
        
        this.startNpcConversation();
      }
    });
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

     startNpcConversation() {
      this.input.keyboard.removeAllListeners("keydown-A");
      this.input.keyboard.removeAllListeners("keydown-B");
      this.quest.show();
      this.input.keyboard.once("keydown-A", () => this.handleChoice("A", this.quest));
      this.input.keyboard.once("keydown-B", () => this.handleChoice("B", this.quest));
     }
     
     handleChoice(key, currentQuest) {

      this.input.keyboard.removeAllListeners("keydown-A");
      this.input.keyboard.removeAllListeners("keydown-B");
      this.input.keyboard.removeAllListeners("keydown-X");
      let result = currentQuest.getResponse(key);
      currentQuest.hide();
      let followUpText = key === "A" ? currentQuest.getResponse("A") : currentQuest.getResponse("B");

      this.afterQuest = new Dialogue(this, followUpText, ["What are you doing here?", "What's going on?"], "Surpise!!! It's our 4 year anniversary! Now go walk into those school doors sweetie!", "Surpise!!! Happy 4 years my love, your so amazing so I know u can beat this game, go up to the doors!");
      this.afterQuest.show();

      this.input.keyboard.once("keydown-A", () => this.handleChoice2("A", this.afterQuest));
      this.input.keyboard.once("keydown-B", () => this.handleChoice2("B", this.afterQuest));

      this.input.keyboard.once("keydown-X", () => {
      this.afterQuest.hide();
    });

     }
     handleChoice2(key, currentQuest) {
      let result = currentQuest.getResponse(key);
      currentQuest.hide();
      let followUpText = key === "A" ? currentQuest.getResponse("A") : currentQuest.getResponse("B");

      this.afterQuest = new Dialogue(this, followUpText, ["Okay Bye!!!"], "Surpise!!! It's our 4 year anniversary! Now go walk into those school doors sweetie!", "Surpise!!! Happy 4 years my love, your so amazing so I know u can beat this game, go up to the doors!");
      this.afterQuest.show();
      this.input.keyboard.once("keydown-X", () => {
      this.afterQuest.hide();
    });

     }
}
