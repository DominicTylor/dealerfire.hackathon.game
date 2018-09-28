import Stuff from './stuff';

export default class Hamburger extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'food';
		this.value = 70;
		this.sprite = scene.physics.add.sprite(x, y, 'hamburger');
		this.sprite.body.immovable = true;
	}
}
