export class Horse extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, horseType: string) {
  
    super(scene, x, y, horseType);
    
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.setCollideWorldBounds(true);
    this.setBounce(1);
  }

  start(): void {
    
    const speed = 200;
    const angle = Phaser.Math.Between(0, 360);
    const velocity = this.scene.physics.velocityFromAngle(angle, speed);
    this.setVelocity(velocity.x, velocity.y);
  }

}