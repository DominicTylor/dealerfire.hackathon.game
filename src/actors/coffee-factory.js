import Factory from '../actors/factory';
import Coffee from '../actors/coffee';

export default class CoffeeFactory extends Factory {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.sprite = scene.physics.add.sprite(x, y);
		this.sprite.body.immovable = true;

		this.sprite.body.setSize(155, 50, false);
	}

	produce(scene) {
		return new Coffee(scene);
	}
}
