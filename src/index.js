import 'phaser';
import Config from './config';
import Controller from './scenes/Controller';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import SuccessScene from './scenes/SuccessScene';
import FailScene from './scenes/FailScene';
import './scss/style.scss';
import Manager from './actors/manager';
import Stuff from './actors/stuff';

const wrapper = document.querySelector('.wrapper');
const config = {
    type: Phaser.AUTO,
    parent: wrapper,
    width: Config.WIDTH,
    height: Config.HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        {
            preload: preload,
            create: create,
            update: update
        },
        Controller,
        IntroScene,
        StartScene,
        GameScene,
        SuccessScene,
        FailScene
    ]
};

const game = new Phaser.Game(config);

let manager;
let slave;
let cursors;

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
    this.load.image('stone', 'assets/stone.png');
    this.load.image('hamburger', 'assets/hamburger.png');
    //this.load.spritesheet('manager', 'assets/manager/manager.png', {frameWidth: 800, frameHeight: 1742});
    this.load.atlas({
        key: 'manager',
        textureURL: 'assets/manager/manager.png',
        atlasURL: 'assets/manager/manager.json'
    });
}

function create ()
{
    manager = new Manager(this, 100, 100);
    slave = new Manager(this, 200, 200);

    let me = this;
    let stuff = new Stuff(this, 300, 300);
    let logo = this.add.image(400, 150, 'logo');

    this.physics.add.collider(manager.sprite, slave.sprite, () => manager.interact(manager, slave));
    this.physics.add.collider(manager.sprite, stuff.sprite, () => {
        let burger = new Stuff(me, manager.sprite.x, manager.sprite.y);

        if (!manager.pickup(manager, burger)) {
            burger.destroy();
        };
    });

    slave.sprite.body.immovable = true;

    manager.sprite.body.setCollideWorldBounds(true);

    //this.tweens.add({
    //    targets: logo,
    //    y: 450,
    //    duration: 2000,
    //    ease: 'Power2',
    //    yoyo: true,
    //    loop: -1
    //});
}

function update() {
    manager.update();

    // console.log(cursors.up.isDown, cursors.right.isDown, cursors.down.isDown, cursors.left.isDown);
}