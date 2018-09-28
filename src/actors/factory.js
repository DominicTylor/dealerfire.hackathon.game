export default class Factory {
	constructor(scene, x, y) {
		this.sprite = scene.physics.add.sprite(x, y);
		this.sprite.body.immovable = true;
	}

	produce(scene) {
		throw new Error('Override method');
	}
}