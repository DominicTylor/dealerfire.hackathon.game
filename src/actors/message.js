import Phaser from 'phaser';

export default class Message extends Phaser.GameObjects.Container {
	constructor(scene, { x, y, spriteName, text: { x: textX, y: textY } }) {
		super(scene, x, y);

		this.message = scene.add.text(textX, textY, 'aaa', { fontFamily: 'Arial', fontSize: 18, color: '#000000' });
		this.messageSprite = scene.add.sprite(0, 0, spriteName);

		this.add(this.messageSprite);
		this.add(this.message);

		this.message.setOrigin(0.5);
		this.setPosition(x, y);
		this.setVisible(false);
	}

	showMessage(message) {
		this.message.text += message;
		this.setVisible(true);
	}

	hideMessage() {
		this.message.text = '';
		this.setVisible(false);
	}
}
