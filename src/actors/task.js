import Stuff from './stuff';
import Config from '../config';

export default class Task extends Stuff {
    constructor(scene, x, y, value, title) {
        super(scene, x, y);

        this.title = title;
        this._progress = 0;
        this.parent = null;
        this.type = 'task';
        this.points = value;
        this.value = value * Config.TICK_IN_DAY;

        this.sprite = scene.physics.add.sprite(x, y, 'task');
        this.sprite.body.immovable = true;
    }

    get complete() {
        return this._progress >= this.value;
    }

    set progress(value) {
        this._progress = value;

        if (this.complete) {
            this.sprite.destroy();
        }
    }

    get progress() {
        return this._progress;
    }

    hide() {
        this.sprite.setVisible(false);
    }

    destroy() {
        if (this.parent && !this.complete) {
            this.sprite.setVisible(true);
            this.parent.returnBack(this);
        } else {
            this.sprite.destroy();
        }
    }
}
