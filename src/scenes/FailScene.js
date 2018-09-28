import 'phaser';

export default class FailScene extends Phaser.Scene {
    constructor() {
        super('Fail');
    }

    preload() {
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
        const view = new View(this);

        this.children.add(view);

        // TODO
        setTimeout(() => {
            this.events.emit('onSceneEvent', 'gameRetry');
        }, 2000);

        this.view = view;
    }

    update() {
        this.view.update();
    }
}

class View extends Phaser.GameObjects.Container {
    constructor() {
        super(...arguments);

        const text = new Phaser.GameObjects.Text(
            this.scene,
            0, 0,
            'Fail',
            {
                fontSize: 40,
                fill: '#ff0000'
            }
        );
        text.setOrigin(0.5);
        text.setPosition(
            this.scene.game.config.width >> 1,
            this.scene.game.config.height >> 1
        );

        this.scene.anims.create({
            key: 'sleep',
            frames: [{
                key: 'sleeping',
                frame: 'sleeping_1',
                duration: 5
            }, {
                key: 'sleeping',
                frame: 'sleeping_2',
                duration: 5
            }, {
                key: 'sleeping',
                frame: 'sleeping_3',
                duration: 5
            }],
            frameRate: 1,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'stink',
            frames: [{
                key: 'trash',
                frame: 'trash_1',
                duration: 500
            }, {
                key: 'trash',
                frame: 'trash_2',
                duration: 500
            }],
            frameRate: 5,
            repeat: -1
        });

        let trashCan = this.scene.add.sprite(0, 0).setOrigin(0, 0);
        let manager = this.scene.add.sprite(0, 0).setOrigin(0, 0);

        trashCan.anims.play('stink');
        manager.anims.play('sleep');

        trashCan.setAlpha(0);

        this.trashCan = trashCan;

        this.add(text);
    }

    update() {
        if (this.trashCan.alpha < 1) {
            this.trashCan.setAlpha(this.trashCan.alpha + 0.002);
        }
    }
}