import 'phaser';

export default class SuccessScene extends Phaser.Scene {
    constructor() {
        super('Success');
    }

    preload() {
        this.load.atlas({
            key: 'sleeping',
            textureURL: 'assets/manager/sleeping.png',
            atlasURL: 'assets/manager/sleeping.json'
        });
    }

    create() {
        const view = new View(this);

        this.children.add(view);

        // TODO
        setTimeout(() => {
            this.events.emit('onSceneEvent', 'gameRetry');
        }, 2000);
    }
}

class View extends Phaser.GameObjects.Container {
    constructor() {
        super(...arguments);

        const text = new Phaser.GameObjects.Text(
            this.scene,
            0, 0,
            'Success',
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

        this.add(text);

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

        let manager = this.scene.add.sprite(0, 0).setOrigin(0, 0);

        manager.anims.play('sleep');
    }
}