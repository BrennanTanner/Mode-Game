import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric3.5';
import preload from '../utils/preloads.mjs';
import create from '../utils/creates.mjs';
import Player from '../entities/player.mjs';

class TestScene extends Phaser.Scene {
   constructor() {
      const sceneConfig = {
         key: 'TestScene',
         mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' },
      };

      super(sceneConfig);
      // declare objects
      this.player;
      this.platforms;
      this.cursors;
   }

   preload() {
      this.load.scenePlugin({
         key: 'IsoPlugin',
         url: IsoPlugin,
         sceneKey: 'iso',
      });

      this.load.scenePlugin({
         key: 'IsoPhysics',
         url: IsoPhysics,
         sceneKey: 'isoPhysics',
      });

      //get canvas
      this.canvas = this.sys.game.canvas;

      // load tiles
      preload.images(this);
      preload.sprites(this);

      this.load.crossOrigin = 'anonymous';

      this.load.image('ground', '/images/test/cube.png');
   }

   create() {
      create.map(this);
      create.animations(this);

      this.isoPhysics.world.gravity.setTo(0, 0, -500);
      this.isoPhysics.projector.origin.setTo(0.5, 0.3);
      this.graphics = this.add.graphics({ x: 0, y: 0 });

      create.player(this);
      this.platforms = this.add.group();

      for (let i = 0; i < 3; i++) {
         const cube = this.add.isoSprite(50 * i, 250, 0, 'ground');
         this.platforms.add(cube);
         this.isoPhysics.world.enable(cube);
         cube.body.collideWorldBounds = true;
         cube.body.bounce.set(0, 0, 0);
      }

      this.isoPhysics.world.enable(this.platforms);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(
         Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      const camera = this.cameras.main;

      camera.postFX.addTiltShift(0.3, 1.0, 0, 0.5, 1);
   }

   update() {
      this.isoPhysics.world.collide(this.platforms, this.player.body);

      this.player.update(this);
   }
}

export default TestScene;
