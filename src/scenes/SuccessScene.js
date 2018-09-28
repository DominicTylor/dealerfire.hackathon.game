import 'phaser';

export default class SuccessScene extends Phaser.Scene {
    constructor() {
        super('Success');
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
    }
}