import Factory from '../actors/factory';
import Hamburger from '../actors/hamburger';

export default class HamburgerFactory extends Factory {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.sprite = scene.physics.add.sprite(x, y);
		this.sprite.body.immovable = true;
		this.sprite.body.setSize(155, 50, false);
	}

	produce(scene) {
		return new Hamburger(scene);
	}
}
