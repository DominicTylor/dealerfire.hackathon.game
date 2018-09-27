import Phaser from 'phaser';

export default class Worker extends Phaser.GameObjects.Sprite {
	constructor(scene, {
		x,
		y,
		width,
		height,
		spriteName,
		characteristics: {
			foodLossRate,
			energyLossRate
		}
	}) {
		super(scene, x, y);
		this.setTexture(spriteName);
		this.setPosition(x, y);
		this.setDisplaySize(width, height);
		this._spriteName = spriteName;
		this._tempY = y;
		this._scaleSide = 1;
		this._loopTime = 0;
		this._hunger = 100;
		this._energy = 100;
		this._task = 0;
		this._foodLossRate = foodLossRate;
		this._energyLossRate = energyLossRate;
		this._state = 'live';

        // scene.physics.add.existing(this);
        // this.body.immovable = true;
	}

	consume({ type, value }) {
		console.log(type, value)

		switch(type) {
			case 'food':
				this._setHungry(value);

				return true;
			case 'coffee':
			case 'energyDrink':
				this._setEnergy(value);

				return true;
			case 'task': {
				if (this._task > 0) {
					return false;
				}

				this._setTask(value);

				return false;
			}
		}
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		switch (this._state) {
			case 'live': {
				if (this._task > 0) {
					this._normalWorkingAnimation();
				} else {
					this._showMessage('notTask');
				}

				break;
			}

			case 'dead':
				this._deadAnimation();

				break;
		}

		this._updateParam();

		this._loopTime = this._loopTime > 30 ? 0 : this._loopTime + 1;
	}

	_updateParam() {
		const h = this._hunger;
		const e = this._energy;
		const t = this._task;

		if (h > 0 && e > 0) {
			if (h > 0) {
				this._hunger = h - 20 / this._foodLossRate;
			}

			if (h < 20) {
				this._showMessage('foodLow');
			}

			if (e > 0) {
				this._energy = e - 10 / this._energyLossRate;
			}

			if (e < 20) {
				this._showMessage('energyLow');
			}

			if (t > 0) {
				--this._task;
			}
		} else {
			this._state = 'dead';
		}
	}

	_normalWorkingAnimation() {
		if (!(this._loopTime % 10)) {
			this.setY(this._tempY === this.y ? this.y - 2 : this._tempY);
		}

		if (!(this._loopTime % 15)) {
			let side = this._scaleSide;
			let angle = this.angle;

			if (angle > side && angle > 0) {
				this._scaleSide = -2;
				side = -1;
			} else if (angle < side && angle < 0) {
				this._scaleSide = 2;
				side = 1;
			}

			this.setAngle(angle + side);
		}
	}

	_showMessage(message) {
		console.log(`${this._spriteName} ${message}`);
	}

	_deadAnimation() {
		console.log(`${this._spriteName} dead`);
	}

	_setHungry(value) {
		this._energy = Math.max(value, 100);
	}

	_setEnergy(value) {
		this._energy = Math.max(value, 100);
	}

	_setTask(value) {
		this._task = value;
	}
}
