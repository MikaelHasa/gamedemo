import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Horse } from '../Horse';

export class Game extends Scene
{
  Horses: Horse[] = [];
  Gameover: boolean = false;
  SelectedMap: { map: string; walls: string };

  walls: Phaser.Physics.Arcade.StaticGroup;
  carrots: Phaser.Physics.Arcade.StaticGroup;

  constructor()
  {
    super('Game');
  }

  preload(): void
  {

    this.load.image('tiles', 'assets/maps/greenfield/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/greenfield/greenfield.json');

    // Load horse assets and carrot
    this.load.image('orangehors', 'assets/horses/orangehors.png');
    this.load.image('bluehors', 'assets/horses/bluehors.png');
    this.load.image('pinkhors', 'assets/horses/pinkhors.png');
    this.load.image('redhors', 'assets/horses/redhors.png');
    this.load.image('carrot', 'assets/horses/carrot.png');

  }

/*
Add after fixing new maps
  handleMapSelection = (mapName: string) =>
  {
    switch (mapName)
    {
      case 'greenfield':
        this.SelectedMap = { map: 'map-gf', walls: 'walls-gf' };
        break;
      case 'desert':
        this.SelectedMap = { map: 'map-d', walls: 'walls-d' };
        break;
      default:
        console.warn('Unknown map selected:', mapName);
    }

    this.scene.restart({ SelectedMap: this.SelectedMap });

    
  }
*/

  create(): void{

    const map = this.add.tilemap('map');
    const tiles: any = map.addTilesetImage('spritesheet', 'tiles');
    const groundLayer: any = map.createLayer('bg', tiles);
    const wallLayer: any = map.createLayer('walls', tiles);

    this.carrots = this.physics.add.staticGroup();
    const carrotLayer = map.getObjectLayer('carrot');
    if (carrotLayer) {
      carrotLayer.objects.forEach(obj => {
        this.carrots.create((obj.x || 0) + (obj.width || 0) / 2, (obj.y || 0) - (obj.height || 0) / 2, 'carrot');
      });
    }

    wallLayer.setCollisionBetween(8, 8);

    const horseLayer = map.getObjectLayer('horse');
    if (horseLayer) {
      horseLayer.objects.forEach(obj => {
        const horseTypeProperty = obj.properties?.find((property: any) => property.name === 'horseType');
        const horseType = horseTypeProperty?.value;
        if (!horseType) {
          return;
        }

        const horseTextureKey = `${horseType}hors`;
        const horseX = (obj.x || 0) + (obj.width || 0) / 2;
        const horseY = (obj.y || 0) - (obj.height || 0) / 2;
        const horse = new Horse(this, horseX, horseY, horseTextureKey);

        horse.start();
        this.physics.add.collider(horse, wallLayer);
        this.Horses.push(horse);
      });

      for (let i = 0; i < this.Horses.length; i++) {
        this.physics.add.collider(this.Horses[i], this.carrots);
        for (let j = i + 1; j < this.Horses.length; j++) {
          this.physics.add.collider(this.Horses[i], this.Horses[j]);
        }
      }
    }
  }
}