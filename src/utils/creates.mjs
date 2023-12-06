import Player from '../entities/player.mjs';

const create = {};

create.map = (scene) => {
   const map = scene.make.tilemap({ key: 'tilemap' });
   const city_tiles = map.addTilesetImage('city_tile', 'city_sheet');

   scene.bg = map.createLayer('Base', city_tiles).setScale(2);
   scene.isoPhysics.world.setBounds(
      0,
      0,
      17,
      map.widthInPixels,
      map.heightInPixels,
      500
   );
   scene.cameras.main.setBounds(
      -map.widthInPixels / 2,
      0,
      map.widthInPixels * 2,
      map.heightInPixels * 2
   );
};

create.player = (scene) => {
   scene.player = new Player(scene);
};

create.animations = (scene) => {
   //define player animations

   //front
   scene.anims.create({
      key: 'run-front',
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [12, 13, 12, 14],
      }),
      frameRate: 5,
      repeat: -1,
   });
   scene.anims.create({
      key: 'run-down',
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [36, 37, 36, 38],
      }),
      frameRate: 5,
      repeat: -1,
   });
   scene.anims.create({
      key: 'run-up',
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [39, 40, 39, 41],
      }),
      frameRate: 5,
      repeat: -1,
   });
   scene.anims.create({
      key: 'idle-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [0] }),
   });
   scene.anims.create({
      key: 'sit-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [2] }),
   });
   scene.anims.create({
      key: 'up-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [7] }),
   });
   scene.anims.create({
      key: 'down-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [8] }),
   });
   scene.anims.create({
      key: 'land-front',
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [6],
         frameRate: 1,
         repeat: 5,
      }),
   });
   scene.anims.create({
      key: 'hit-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [30] }),
   });
   scene.anims.create({
      key: 'hit-fall-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [31] }),
   });
   scene.anims.create({
      key: 'lay-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [1] }),
   });
   scene.anims.create({
      key: 'get-up-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [26, 27] }),
      frameRate: 2,
   });
   scene.anims.create({
      key: 'get-gun-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [18, 19] }),
      frameRate: 2,
   });
   scene.anims.create({
      key: 'hold-gun-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [19] }),
   });
   scene.anims.create({
      key: 'shoot-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [20, 21] }),
      frameRate: 5,
   });

   //rear
   scene.anims.create({
      key: 'run-rear',
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [15, 16, 15, 17],
      }),
      frameRate: 5,
      repeat: -1,
   });
   scene.anims.create({
      key: 'idle-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [3] }),
   });
   scene.anims.create({
      key: 'sit-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [5] }),
   });
   scene.anims.create({
      key: 'up-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [9] }),
   });
   scene.anims.create({
      key: 'down-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [10] }),
   });
   scene.anims.create({
      key: 'land-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [11] }),
   });
   scene.anims.create({
      key: 'hit-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [28] }),
   });
   scene.anims.create({
      key: 'hit-fall-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [29] }),
   });
   scene.anims.create({
      key: 'lay-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [4] }),
   });
   scene.anims.create({
      key: 'get-up-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [32, 33] }),
      frameRate: 2,
   });
   scene.anims.create({
      key: 'get-gun-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [22, 23] }),
      frameRate: 2,
   });
   scene.anims.create({
      key: 'hold-gun-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [23] }),
   });
   scene.anims.create({
      key: 'shoot-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [24, 25] }),
      frameRate: 5,
   });
};

export default create;
