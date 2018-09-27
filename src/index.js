import 'phaser';

const config = {
    type: Phaser.AUTO,
    parent: 'Temuraz tycoon',
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload () {
    this.load.image('logo', 'assets/logo.png');
}

function create () {
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });
}
