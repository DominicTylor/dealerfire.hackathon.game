import 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('start', 'assets/start.png');
        this.load.image('bg', 'assets/office.png');
        this.load.image('rip', 'assets/rip.png');
        this.load.image('hamburger', 'assets/hamburger.png');
        this.load.image('message1', 'assets/messages/message1.png');
        this.load.image('message2', 'assets/messages/message2.png');
        this.load.image('coffee', 'assets/coffee.png');
        this.load.image('energy-drink', 'assets/energy.png');
        this.load.image('transparent', 'assets/transparent_tile.png');
        this.load.image('task', 'assets/task.png');
        this.load.image('tasks', 'assets/tasks.png');

        this.load.image('table4', 'assets/office/table1.png');
        this.load.image('table2', 'assets/office/table2.png');
        this.load.image('table3', 'assets/office/table3.png');
        this.load.image('table1', 'assets/office/table4.png');

        this.load.image('worker1', 'assets/workers/worker1.png');
        this.load.image('worker2', 'assets/workers/worker2.png');
        this.load.image('worker3', 'assets/workers/worker3.png');
        this.load.image('worker4', 'assets/workers/worker4.png');

        this.load.audio('fail', 'assets/audio/fail.mp3');
        this.load.audio('win', 'assets/audio/win.mp3');
        this.load.audio('intro', 'assets/audio/intro.mp3');
        this.load.audio('game', 'assets/audio/game.mp3');
        this.load.audio('get', 'assets/audio/get.mp3');
        this.load.audio('drink', 'assets/audio/drink.mp3');
        this.load.audio('rip', 'assets/audio/rip.mp3');
        this.load.audio('eat', 'assets/audio/eat.mp3');

        this.load.atlas({
            key: 'manager',
            textureURL: 'assets/manager/manager.png',
            atlasURL: 'assets/manager/manager.json'
        });

        this.load.atlas({
            key: 'sleeping',
            textureURL: 'assets/manager/sleeping.png',
            atlasURL: 'assets/manager/sleeping.json'
        });
        this.load.atlas({
            key: 'trash',
            textureURL: 'assets/manager/trash_can.png',
            atlasURL: 'assets/manager/trash_can.json'
        });
    }

    create() {
        this.view = new View(this);

        this.children.add(this.view);

        this.input.keyboard.on('keyup', this.keyup, this);
    }

    keyup(e) {
        if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            this.view.destroy();

            this.view = null;

            this.input.keyboard.off('keyup', this.keyup, this);

            this.events.emit('onSceneEvent', 'gameStart');
        }
    }
}

class View extends Phaser.GameObjects.Container {
    constructor() {
        super(...arguments);

        const bg = new Phaser.GameObjects.Graphics(this.scene, 0, 0);
        bg.fillStyle(0xf8f0e5, 1);
        bg.fillRect(
            0, 0,
            this.scene.game.config.width, this.scene.game.config.height
        );
        this.add(bg);

        const img = new Phaser.GameObjects.Image(this.scene, 0, 0, 'start');
        img.setPosition(
            this.scene.game.config.width >> 1,
            this.scene.game.config.height >> 1
        );
        this.add(img);

        const text = new Phaser.GameObjects.Text(
            this.scene,
            0, 0,
            'Engineering Manager\nTycoon Simulator',
            {
                fontSize: 40,
                fill: '#ff0000',
                wordWrap: true,
                wordWrapWidth: 200,
                align: 'center'
            }
        );
        text.setOrigin(0.5);
        text.setPosition(
            img.x,
            img.y - (img.height >> 1) - 40
        );

        this.add(text);

        const enter = new Phaser.GameObjects.Text(
            this.scene,
            0, 0,
            'Press Enter to continue',
            {
                fontSize: 20,
                fill: '#bbb'
            }
        );
        enter.setOrigin(0.5);
        enter.setPosition(
            img.x,
            img.y + (img.height >> 1) + 20
        );

        this.add(enter);
    }
}