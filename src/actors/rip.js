import Phaser from 'phaser';

export default class Rip extends Phaser.GameObjects.Sprite {
	constructor(scene, { x, y }) {
		super(scene, x, y);

		this.setTexture('rip');
		this.setPosition(x, y);
		this.setAngle(5);
		this.setVisible(false);
	}

	showRip() {
		this.setVisible(true);
	}
}
