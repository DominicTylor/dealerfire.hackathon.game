import Factory from '../actors/factory';
import EnergyDrink from '../actors/energy-drink';

export default class EnergyDrinkFactory extends Factory {
	produce(scene) {
		return new EnergyDrink(scene);
	}
}
