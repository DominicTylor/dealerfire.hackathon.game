import Factory from '../actors/factory';
import Task from '../actors/task';

const TICK_IN_DAY = 3000;

export default class TaskFactory extends Factory {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.sprite.setTexture('tasks');
	    this.sprite.setPosition(295, 640);
        this.sprite.body.setOffset(-37, -20);
        this.sprite.body.setSize(100, 50, false);

        this._tasks = [
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add new header module'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Styles not rendering'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Add new styles for container'),
            new Task(scene, x, y, 3 * TICK_IN_DAY, 'Support new button in form-variants'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Fix menu on prod'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add new widget'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add new spacer widget'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Fix alignment in config'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add menu action buttons'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Remove old modules'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Fix image upload'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add module ACL'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add widget ACL'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Add field ACL'),
            new Task(scene, x, y, 2 * TICK_IN_DAY, 'Add new style to form'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Add multistep support'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Fix form render'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Switch Ember version'),
            new Task(scene, x, y, 1 * TICK_IN_DAY, 'Fix broken modules'),
            new Task(scene, x, y, 3 * TICK_IN_DAY, 'Fix cloned websites')
        ];

        //4test
        this._tasks.length = 3;

        this.tasks = this._tasks.slice();

        this.tasks.forEach(task => {
            task.parent = this;
        });
    }

    get complete() {
        return this._tasks.every(task => task.complete);
    }

    produce(scene) {
        console.log('produce', this.tasks.length);

        return this.tasks.pop();
    }

    returnBack(task) {
        task.sprite.x = this.sprite.x;
        task.sprite.y = this.sprite.y;

        this.tasks.push(task);

        console.log('returnBack', this.tasks.length);
    }
}
