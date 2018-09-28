import Phaser from 'phaser';

export default class Message extends Phaser.GameObjects.Sprite {
	constructor(scene, { x, y }) {
		super(scene, x, y);
		this.setTexture();
		this.setPosition(x, y);
		this.setDisplaySize(width, height);
		this.message = '';
		this._state = 'hide';
		this._loopTime = 0;
	}
}
