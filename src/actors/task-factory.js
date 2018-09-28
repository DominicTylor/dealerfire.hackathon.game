import Factory from '../actors/factory';
import Task from '../actors/task';

export default class TaskFactory extends Factory {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.sprite.setTexture('tasks');
	    this.sprite.setPosition(295, 640);
        this.sprite.body.setOffset(-37, -20);
        this.sprite.body.setSize(100, 50, false);

        this._tasks = [
            new Task(scene, x, y, 1, 'Add new header module'),
            new Task(scene, x, y, 2, 'Styles not rendering'),
            new Task(scene, x, y, 2, 'Add new styles for container'),
            new Task(scene, x, y, 3, 'Support new button in form-variants'),
            new Task(scene, x, y, 1, 'Fix menu on prod'),
            new Task(scene, x, y, 1, 'Add new widget'),
            new Task(scene, x, y, 1, 'Add new spacer widget'),
            new Task(scene, x, y, 2, 'Fix alignment in config'),
            new Task(scene, x, y, 1, 'Add menu action buttons'),
            new Task(scene, x, y, 2, 'Remove old modules'),
            new Task(scene, x, y, 2, 'Fix image upload'),
            new Task(scene, x, y, 1, 'Add module ACL'),
            new Task(scene, x, y, 1, 'Add widget ACL'),
            new Task(scene, x, y, 2, 'Add field ACL'),
            new Task(scene, x, y, 2, 'Add new style to form'),
            new Task(scene, x, y, 1, 'Add multistep support'),
            new Task(scene, x, y, 1, 'Fix form render'),
            new Task(scene, x, y, 2, 'Switch Ember version'),
            new Task(scene, x, y, 1, 'Fix broken modules'),
            new Task(scene, x, y, 3, 'Fix cloned websites')
        ];

        this.tasks = this._tasks.slice();

        this.tasks.forEach(task => {
            task.parent = this;
        });
    }

    get complete() {
        return this._tasks.every(task => task.complete);
    }

    get pointsFinished() {
        return this._tasks.reduce((acc, task) => {
            acc += task.complete ? task.points : 0;

            return acc;
        }, 0);
    }

    get tasksFinished() {
        return this._tasks.reduce((acc, task) => {
            acc += task.complete ? 1 : 0;

            return acc;
        }, 0);
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
