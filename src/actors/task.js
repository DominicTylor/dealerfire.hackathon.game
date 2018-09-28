import Stuff from './stuff';

export default class Task extends Stuff {
    constructor(scene, x, y, value, title) {
        super(scene, x, y);

        this.title = title;
        this.progress = 0;
        this.parent = null;
        this.type = 'task';
        this.value = value;
    }

    get complete() {
        return this.progress >= this.value;
    }

    destroy() {
        if (this.parent) {
            this.parent.returnBack(this);
        }
    }
}