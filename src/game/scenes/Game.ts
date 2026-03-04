import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Horse } from '../Horse';

export class Game extends Scene
{
  Horse: Horse;
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
    // Load map assets
    this.load.image('map-gf', 'assets/maps/map_greenfield.png');
    this.load.image('walls-gf', 'assets/maps/walls_greenfield.png');
    this.load.image('map-d', 'assets/maps/map_desert.png');
    this.load.image('walls-d', 'assets/maps/walls_desert.png');

    this.load.image('tiles', 'assets/maps/greenfield/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/greenfield/greenfield.json');

    // Load horse assets and carrot
    this.load.image('horseo', 'assets/horses/orangehors.png');
    this.load.image('horsep', 'assets/horses/pinkhors.png');
    this.load.image('horseb', 'assets/horses/bluehors.png');
    this.load.image('horser', 'assets/horses/redhors.png');
    this.load.image('carrot', 'assets/horses/carrot.png');

  }

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
  create(): void{
    //this.walls = this.physics.add.staticGroup();
    this.carrots = this.physics.add.staticGroup();
    //EventBus.on('map-selected', this.handleMapSelection, this);
    //this.add.image(512, 384, this.SelectedMap.map);
    //this.walls.create(512, 384, 'horser');
    
    const map = this.add.tilemap('map');
    const tiles: any = map.addTilesetImage('spritesheet', 'tiles');
    const groundLayer: any = map.createLayer('bg', tiles);
    const wallLayer: any = map.createLayer('walls', tiles);
    
    this.carrots.create(100, 350, 'carrot');
    
    this.Horse = new Horse(this, 100, 50, 'horseo');
    this.Horse.start();

    this.physics.add.collider(this.Horse, wallLayer);
    wallLayer.setCollisionBetween(8, 8);
  }
}