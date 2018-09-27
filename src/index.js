import 'phaser';
import Config from './config';
import Controller from './scenes/Controller';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import SuccessScene from './scenes/SuccessScene';
import FailScene from './scenes/FailScene';
import Worker from './actors/worker';
import './scss/style.scss';

const wrapper = document.querySelector('.wrapper');
const config = {
    type: Phaser.AUTO,
    parent: Config.APP_ID,
    width: Config.WIDTH,
    height: Config.HEIGHT,
    scene: [
        Controller,
        IntroScene,
        StartScene,
        GameScene,
        SuccessScene,
        FailScene
    ]
};

const game = new Phaser.Game(config);

function preload () {
    this.load.image('worker1', 'assets/workers/worker1.png');
	this.load.image('worker2', 'assets/workers/worker2.png');
	this.load.image('worker3', 'assets/workers/worker3.png');
	this.load.image('worker4', 'assets/workers/worker4.png');
}

function create () {
    this.add.existing(new Worker(this, {
	    x: 135,
	    y: 250,
	    spriteName: 'worker1',
	    width: 70,
	    height: 160
    }));
	this.add.existing(new Worker(this, {
		x: 465,
		y: 250,
		spriteName: 'worker2',
		width: 70,
		height: 160
	}));
	this.add.existing(new Worker(this, {
		x: 135,
		y: 450,
		spriteName: 'worker3',
		width: 70,
		height: 160
	}));
	this.add.existing(new Worker(this, {
		x: 465,
		y: 450,
		spriteName: 'worker4',
		width: 70,
		height: 160
	}));
}
