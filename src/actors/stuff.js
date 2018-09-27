export default class Stuff {
	constructor(scene, x, y) {
		this.type = null;
		this.sprite = null;
		this.value = 0;
	}

	destroy() {
		this.sprite.destroy();
		this.value = 0;
	}
}