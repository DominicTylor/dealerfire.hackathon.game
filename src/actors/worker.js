import Phaser from 'phaser';

export default class Worker extends Phaser.GameObjects.Sprite {
	constructor(scene, {
		x = 0,
		y = 0,
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
		this._food = 100;
		this._energy = 100;
		this._task = 0;
		this._hasTask = false;
		this._foodLossRate = foodLossRate;
		this._energyLossRate = energyLossRate;
		this._state = 'live';

        // scene.physics.add.existing(this);
        // this.body.immovable = true;
	}

	consume({ type, value }) {
		switch(type) {
			case 'food':
				this._setFood(value);

				return true;
			case 'coffee':
			case 'energyDrink':
				this._setEnergy(value);

				return true;
			case 'task': {
				if (this._hasTask) {
					return false;
				}

				this._setTask(value);

				return true;
			}
		}
	}

	update() {
		switch (this._state) {
			case 'live': {
				if (this._hasTask) {
					this._normalWorkingAnimation();
				} else {
					this._showMessage('noTask');
				}

				this._updateParam();

				break;
			}

			case 'dying':
				this._dyingAnimation();

				break;
		}

		this._loopTime = this._loopTime > 300 ? 0 : this._loopTime + 1;
	}

	_updateParam() {
		const f = this._food;
		const e = this._energy;
		const t = this._task;

		if (f > 0 && e > 0) {
			if (f > 0) {
				this._food = f - 20 / this._foodLossRate;

				if (f < 20) {
					this._showMessage('foodLow');
				}
			}

			if (e > 0) {
				this._energy = e - 10 / this._energyLossRate;

				if (e < 20) {
					this._showMessage('energyLow');
				}
			}

			if (t > 0) {
				--this._task;
			} else if (this._hasTask) {
				this._hasTask = false;
				this._sendTaskDone();
			}
		} else {
			this._state = 'dying';
		}
	}

	_normalWorkingAnimation() {
		if (!(this._loopTime % 20)) {
			this.setY(this._tempY === this.y ? this.y - 2 : this._tempY);
		}

		if (!(this._loopTime % 30)) {
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

	_dyingAnimation() {
		console.log(`${this._spriteName} dead`);

		this._sendWorkerDead();
		this._state = 'dead';
	}

	_setFood(value) {
		this._food = Math.max(value, 100);
	}

	_setEnergy(value) {
		this._energy = Math.max(value, 100);
	}

	_setTask(value) {
		this._hasTask = true;
		this._task = value;
	}

	_showMessage(message) {
		switch(message) {
			case 'foodLow':
				this.parentContainer.showMessage('🍔');

				break;

			case 'energyLow':
				this.parentContainer.showMessage('⚡');

				break;

			case 'noTask':
				this.parentContainer.showMessage('📑');

				break;
		}
	}

	_sendTaskDone() {
		this.scene.events.emit('onSceneEvent', 'taskDone');
	}

	_sendWorkerDead() {
		this.scene.events.emit('onSceneEvent', 'workerDead');
	}
}
