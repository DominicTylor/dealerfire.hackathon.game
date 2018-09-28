import Stuff from './stuff';

export default class EnergyDrink extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'energy-drink';
		this.value = 20;
		this.sprite = scene.physics.add.sprite(x, y, 'energy-drink');
		this.sprite.body.immovable = true;
	}
}
