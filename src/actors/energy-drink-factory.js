import Factory from '../actors/factory';
import EnergyDrink from '../actors/energy-drink';

export default class EnergyDrinkFactory extends Factory {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.sprite = scene.physics.add.sprite(x, y);
		this.sprite.body.immovable = true;

		this.sprite.body.setSize(155, 50, false);
	}

	produce(scene) {
		return new EnergyDrink(scene);
	}
}
