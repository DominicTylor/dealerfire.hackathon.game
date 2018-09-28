export default class Timer {
	constructor(config) {
		this.ticksInDay = config.ticksInDay;
		this.currentTick = 0;
	}

	get day() {
		return Math.ceil(this.currentTick / this.ticksInDay);
	}

	get fullDays() {
		return Math.floor(this.currentTick / this.ticksInDay);
	}

	update() {
		this.currentTick++;
	}
}
