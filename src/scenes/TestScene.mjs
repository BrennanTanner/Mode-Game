import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric3.5';
import { loadImages } from '../utils/preloads.mjs';
import { createMap } from '../utils/creates.mjs';

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
      loadImages(this);
      this.load.tilemapTiledJSON('tilemap', '/json/maps/map1.tmj');

      this.load.crossOrigin = 'anonymous';

      this.load.image('player', '/images/player/Asset3.svg');
      this.load.image('ground', '/images/player/cube.png');
   }

   create() {
      createMap(this);

      this.isoPhysics.world.gravity.setTo(0, 0, -500);
      this.isoPhysics.projector.origin.setTo(0.5, 0.3);
      this.graphics = this.add.graphics({ x: 0, y: 0 });

      this.player = this.add.isoSprite(256, 256, 100, 'player');
      this.player.setSize(40, 40, 40).setScale(0.3);

      this.isoPhysics.world.enable(this.player);
      this.player.body.collideWorldBounds = true;
      this.player.body.bounce.set(1, 1, 0.2);

      this.platforms = this.add.group();

      for (let i = 0; i < 3; i++) {
         const cube = this.add.isoSprite(50 *i, 250, 0, 'ground');
         this.platforms.add(cube);
         this.isoPhysics.world.enable(cube);
        cube.body.collideWorldBounds = true;
        cube.body.bounce.set(0,0,0);
      }

     this.isoPhysics.world.enable(this.platforms);
     

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(
         Phaser.Input.Keyboard.KeyCodes.SPACE
      );
   }

   update() {
      this.isoPhysics.world.collide(this.platforms, this.player);
      this.graphics.clear();
      this.player.body.debugRender(this.graphics);

      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if (this.cursors.left.isDown) {
         this.player.body.velocity.y = 100;
         this.player.body.velocity.x = -100;
         if (this.cursors.up.isDown) {
            this.player.body.velocity.y = 0;
         } else if (this.cursors.down.isDown) {
            this.player.body.velocity.x = 0;
         }
      } else if (this.cursors.right.isDown) {
         this.player.body.velocity.x = 100;
         this.player.body.velocity.y = -100;
         if (this.cursors.up.isDown) {
            this.player.body.velocity.x = 0;
         } else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 0;
         }
      } else if (this.cursors.up.isDown) {
         this.player.body.velocity.x = -100;
         this.player.body.velocity.y = -100;
      } else if (this.cursors.down.isDown) {
         this.player.body.velocity.x = 100;
         this.player.body.velocity.y = 100;
      }

      if (this.spaceKey.isDown) {
         this.player.body.velocity.z = 100;
      }
   }
}

export default TestScene;
