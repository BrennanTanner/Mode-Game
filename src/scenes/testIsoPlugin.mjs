
import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric3.5';

class IsoCollisionExample extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoCollisionExample',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('cube', '/images/player/cube.png');
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });

    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics'
    });
  }

  create() {
    this.isoGroup = this.add.group();

    // Apply some gravity on our cubes
    this.isoPhysics.world.gravity.setTo(0, 0, -500);

    this.isoPhysics.projector.origin.setTo(0.5, 0.3);
    this.graphics = this.add.graphics({ x: 0, y: 0 })
    // Add some first cubes to our scene
    this.spawnCubes();
  }

  update() {
    // Collide cubes against each other
    this.isoPhysics.world.collide(this.isoGroup);
    this.graphics.clear();
    this.isoGroup.children.each((cube)=>{cube.body.debugRender(this.graphics);})
    
    // Moooore cuuuubes
    if (this.input.activePointer.justDown) {
      this.spawnCube();
      
    }
  }

  spawnCubes() {
    let cube;
    for (let xx = 256; xx > 0; xx -= 64) {
      for (let yy = 256; yy > 0; yy -= 64) {
        // Add a cube which is way above the ground
        cube = this.add.isoSprite(xx, yy, 100, 'cube');

        this.isoGroup.add(cube);
        
        // const cubephysics = this.physics.add.existing(cube)

        this.isoPhysics.world.enable(cube);
        cube.body.collideWorldBounds = true;
        cube.body.bounce.set(1, 1, 0.2);
      

        const randomX = Math.trunc((Math.random() * 100 - 50));
        const randomY = Math.trunc((Math.random() * 100 - 50));
        cube.body.velocity.setTo(randomX, randomY, 0);
      }
    }
  }

  
  spawnCube1() {
        // Add a cube which is way above the ground
        this.cube = this.add.isoSprite(256, 256, 100, 'cube');
        
        // const this.cubephysics = this.physics.add.existing(this.cube)

        this.isoPhysics.world.enable(this.cube);
        this.cube.body.collideWorldBounds = true;
        this.cube.body.bounce.set(1, 1, 0.2);
      

        const randomX = Math.trunc((Math.random() * 100 - 50));
        const randomY = Math.trunc((Math.random() * 100 - 50));
        this.cube.body.velocity.setTo(randomX, randomY, 0);
      }
      spawnCube2() {
        // Add a cube which is way above the ground
        this.cube2 = this.add.isoSprite(256, 256, 100, 'cube');
        
        // const this.cube2physics = this.physics.add.existing(this.cube2)

        this.isoPhysics.world.enable(this.cube2);
        this.cube2.body.collideWorldBounds = true;
        this.cube2.body.bounce.set(1, 1, 0.2);
      

        const randomX = Math.trunc((Math.random() * 100 - 50));
        const randomY = Math.trunc((Math.random() * 100 - 50));
        this.cube2.body.velocity.setTo(randomX, randomY, 0);
      }
    }

export default IsoCollisionExample