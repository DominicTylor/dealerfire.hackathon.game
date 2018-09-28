import Factory from '../actors/factory';
import Task from '../actors/task';

const TICK_IN_DAY = 30000;

export default class TaskFactory extends Factory {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.sprite.setTexture('stone');
        this.sprite.body.setOffset(-37, -20);
        this.sprite.body.setSize(100, 50, false);
        this.currentTaskIndex = 0;

        this.tasks = [
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

        this.tasks.forEach(task => {
            task.parent = this;
        });
    }

    get complete() {
        return this.tasks.every(task => task.complete);
    }

    produce(scene) {
        let task = this.tasks[this.currentTaskIndex];

        this.currentTaskIndex++;

        return task;
    }

    returnBack(task) {
        this.currentTaskIndex--;
    }
}