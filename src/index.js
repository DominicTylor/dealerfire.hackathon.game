import 'phaser';
import Worker from './actors/worker';
import './scss/style.scss';

const wrapper = document.querySelector('.wrapper');
const config = {
	type: Phaser.AUTO,
    parent: wrapper,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create
    }
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
