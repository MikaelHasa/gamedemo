import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {

  private platform?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('map', 'assets/map_greenfield.png');
    this.load.image('walls', 'assets/walls_greenfield.png');
    //this.load.image('horse_r', 'assets/horse_red.png');
    //this.load.image('horse_g', 'assets/horse_green.png');
    this.load.image('horseb', 'assets/bluehorse.png');
  }

  create() {
    this.add.image(512, 384, 'map');
    this.player = this.physics.add.sprite(100, 50, 'horseb');
  
    this.platform = this.physics.add.staticGroup();
    const walls = this.add.image(512, 384, 'walls') as Phaser.Physics.Arcade.Sprite;
    
    walls
    .setScale(1)
    .refreshBody();
    
    this.platform.add(walls);
    


  }

  override update() {

  }
}
