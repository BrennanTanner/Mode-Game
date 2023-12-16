import Player from '../entities/player.mjs';
import Pizza from '../entities/pizza.mjs';
import Gamer from '../entities/enemy.mjs';
import Arrow from '../entities/arrow.mjs';
import Patron from '../entities/patron.mjs';
import Building from '../entities/building.mjs';

const create = {};


create.audio =(scene) =>{
   // Music
   scene.music = scene.sound.add('main-track', {
      volume: 0.1,
      loop: true,
   } );

     // hit sounds
     scene.successSound = scene.sound.add('success-sound');

   // hit sounds
   scene.hitSound = scene.sound.add('hit-sound');

}

create.map = (scene) => {
   const map = scene.make.tilemap({ key: 'tilemap' });
   const city_tiles = map.addTilesetImage('city_tile', 'city_sheet');

   scene.bg = map.createLayer('Base', city_tiles);
   scene.bg.depth = -3000;
   scene.isoPhysics.world.setBounds(
      -350,
      -50,
      0,
      map.widthInPixels - 1780,
      map.heightInPixels + 300,
      1000
   );
   scene.cameras.main.setBounds(
      -map.widthInPixels / 2,
      0,
      map.widthInPixels * 20,
      map.heightInPixels * 20
   );
};

create.buildings = (scene) => {
   //layer 1
   let level1Array = [
      0, 22, 0, -1, -1, 12, 1, 12, -1, 17, 1, 17, -1, 2, 2, 2, 19, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, -1, 9, -1, -1, -1, -1,
      6, -1, 2, -1, 2, -1, -1, -1, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, 0, -1, 9, -1, -1, 15, -1, 2, -1, -1, -1, -1, 2, -1,
      -1, 21, 19, -1, 9, -1, -1, 15, -1, 19, -1, -1, -1, -1, 21, -1, -1, 0, 20,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, -1, -1, 11,
      -1, -1, 16, -1, 2, -1, 13, -1, 13, -1, 0, -1, 19, 0, -1, 11, -1, -1, 16,
      -1, -1, -1, 13, -1, 13, -1, 16, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, 0, 21, -1, -1, -1, -1, 16, -1, -1, -1, 9, -1, -1,
      -1, 15, -1, 21, 1, -1, 0, -1, -1, 16, -1, 3, -1, 19, -1, 3, -1, 2, -1, 20,
      19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 2,
      -1, -1, 18, -1, 21, -1, -1, -1, -1, -1, 4, -1, 20, 19, -1, 2, -1, -1, 17,
      -1, 21, -1, -1, -1, -1, -1, 4, -1, 0, 2, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, 1, -1, 0, -1, 11, -1, 16,
      -1, 20, -1, 1, 0, -1, 20, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1,
      1, 0, -1, -1, -1, -1, 21, -1, 19, -1, 11, -1, 16, -1, 14, -1, 21, 0, -1,
      -1, -1, -1, 21, -1, -1, -1, -1, -1, -1, -1, -1, -1, 20, 0, 0, 4, -1, -1,
      21, 0, 19, 1, -1, 0, 1, 1, 0, 19, 1,
   ];

   let level2Array = [
      20, -1, 14, -1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 19, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 19, -1, -1, -1, -1, 6,
      -1, 2, -1, 2, -1, -1, -1, 1, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, 0, -1, 4, -1, -1, 15, -1, 15, -1, -1, -1, -1, 21, -1,
      -1, 21, 9, -1, 4, -1, -1, 15, -1, 19, -1, -1, -1, -1, 21, -1, -1, 11, 9,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 19, -1, -1, 0, -1,
      -1, 16, -1, 15, -1, 7, -1, 7, -1, -1, -1, 19, 11, -1, 0, -1, -1, 16, -1,
      -1, -1, 7, -1, 7, -1, 11, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, 0, 1, -1, -1, -1, -1, 16, -1, -1, -1, 9, -1, -1, -1,
      15, -1, 1, 1, -1, 11, -1, -1, 16, -1, 3, -1, 9, -1, 3, -1, -1, -1, 19, 9,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 18, -1, -1, 1, -1,
      -1, 15, -1, 7, -1, -1, -1, -1, -1, 4, -1, 18, 9, -1, 1, -1, -1, 2, -1, 7,
      -1, -1, -1, -1, -1, 4, -1, 0, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 16, -1, 16, -1, -1,
      -1, 18, 11, -1, 19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 18,
      16, -1, -1, -1, -1, 21, -1, 19, -1, 16, -1, 16, -1, 14, -1, 7, 11, -1, -1,
      -1, -1, 21, -1, -1, -1, -1, -1, -1, -1, -1, -1, 19, 8, 8, 19, -1, -1, 21,
      8, 3, 2, -1, 8, 17, 17, 8, 3, 17,
   ];

   let level3Array = [
      -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1,
      -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1,
      -1, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, 11, -1, -1, 11, -1, 6, -1, -1, -1, 6, -1,
      -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, 16, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, 8, 8, -1, -1, -1, -1, 0, -1, 12, -1, 8, -1, 12, -1, -1, -1,
   ];

   //level 1
   let tx = -350;
   let ty = -40;
   let i = 0;
   for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 16; x++) {
         if (level1Array[i] >= 0) {
            new Building(scene, tx, ty, 0, level1Array[i]);
         }
         tx += 140;
         i++;
      }
      tx = -350;
      ty += 140;
   }
   //level 2
   tx = -350;
   ty = -40;
   i = 0;
   for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 16; x++) {
         if (level2Array[i] >= 0) {
            new Building(scene, tx, ty, 155, level2Array[i]);
         }
         tx += 140;
         i++;
      }
      tx = -350;
      ty += 140;
   }
   //level 3
   tx = -350;
   ty = -40;
   i = 0;
   for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 16; x++) {
         if (level3Array[i] >= 0) {
            new Building(scene, tx, ty, 225, level3Array[i]);
         }
         tx += 140;
         i++;
      }
      tx = -350;
      ty += 140;
   }
};

create.player = (scene) => {
   scene.player = new Player(scene);
};
create.pizza = (scene) => {
   scene.pizza = new Pizza(scene);
};
create.arrow = (scene) => {
   scene.arrow = new Arrow(scene);
};
create.patron = (scene, x, y, z) => {
   scene.patron = new Patron(scene, x, y, z);
};

create.gamer = (scene, x, y) => {
   scene.gamers.add(new Gamer(scene, x, y));
};

create.building = (scene, x, y, z) => {
   new Building(scene, x, y, z);
};

create.menu = (scene, x, y, items, onClick) => {
   // var exapndOrientation = 'y';
   var easeOrientation = 'y';
   var menu = scene.rexUI.add.menu({
      x: x,
      y: y,
      //orientation: exapndOrientation,
      //subMenuSide: 'right',

      items: items,
      createButtonCallback: function (item, i) {
         return scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x101313),
            text: scene.add
               .text(0, 0, item.name, {
                  fontSize: '10px',
               })
               .setResolution(3),
            icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 2, 0x474c55),
            space: {
               left: 2,
               right: 2,
               top: 2,
               bottom: 2,
               icon: 2,
            },
         });
      },

      // easeIn: 500,
      easeIn: {
         duration: 300,
         orientation: easeOrientation,
      },

      // easeOut: 100,
      easeOut: {
         duration: 100,
         orientation: easeOrientation,
      },

      //expandEvent: 'button.over',
   });

   menu
      .on('button.over', function (button) {
         button.getElement('background').setFillStyle(0x474c55);
      })
      .on('button.out', function (button) {
         button.getElement('background').setFillStyle(0x101313);
      })
      .on('button.click', function (button) {
         onClick(button);
      })
      .on('popup.complete', function (subMenu) {
         console.log('popup.complete');
      })
      .on('scaledown.complete', function () {
         console.log('scaledown.complete');
      });

   return menu;
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
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [26, 27, 30, 8, 6],
      }),
      frameRate: 7,
   });
   scene.anims.create({
      key: 'get-gun-front',
      frames: scene.anims.generateFrameNumbers('player', { frames: [18, 19] }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'aim-front',
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
      frames: scene.anims.generateFrameNumbers('player', {
         frames: [32, 33, 28, 10, 11],
      }),
      frameRate: 7,
   });
   scene.anims.create({
      key: 'get-gun-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [22, 23] }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'aim-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [23] }),
   });
   scene.anims.create({
      key: 'shoot-rear',
      frames: scene.anims.generateFrameNumbers('player', { frames: [24, 25] }),
      frameRate: 5,
   });

   scene.anims.create({
      key: 'aim-down',
      frames: scene.anims.generateFrameNumbers('player', { frames: [42] }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'shoot-down',
      frames: scene.anims.generateFrameNumbers('player', { frames: [43, 44] }),
      frameRate: 5,
   });

   scene.anims.create({
      key: 'aim-up',
      frames: scene.anims.generateFrameNumbers('player', { frames: [45] }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'shoot-up',
      frames: scene.anims.generateFrameNumbers('player', { frames: [46, 47] }),
      frameRate: 5,
   });

   // Define gamer animation
   // front
   scene.anims.create({
      key: 'gamer-walk-front',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [0, 1, 0, 2],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-walk-down',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [6, 7, 6, 8],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-run-front',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [12, 13, 12, 14],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-run-down',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [18, 19, 18, 20],
      }),
      frameRate: 5,
   });
   // rear
   scene.anims.create({
      key: 'gamer-walk-rear',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [3, 4, 3, 5],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-walk-up',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [9, 10, 9, 11],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-run-rear',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [15, 16, 15, 17],
      }),
      frameRate: 5,
   });
   scene.anims.create({
      key: 'gamer-run-up',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [21, 22, 21, 23],
      }),
      frameRate: 5,
   });

   //hit
   scene.anims.create({
      key: 'gamer-hit-front-up',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [24] }),
   });
   scene.anims.create({
      key: 'gamer-hit-front-down',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [25] }),
   });
   scene.anims.create({
      key: 'gamer-hit-rear-up',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [29] }),
   });
   scene.anims.create({
      key: 'gamer-hit-rear-down',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [28] }),
   });
   //fall
   scene.anims.create({
      key: 'gamer-down-front',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [25],
      }),
      frameRate: 0,
   });

   scene.anims.create({
      key: 'gamer-up-front',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [24],
      }),
      frameRate: 0,
   });
   scene.anims.create({
      key: 'gamer-down-rear',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [28],
      }),
      frameRate: 0,
   });

   scene.anims.create({
      key: 'gamer-up-rear',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [29],
      }),
      frameRate: 0,
   });

   //idle
   scene.anims.create({
      key: 'gamer-idle-front',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [0] }),
   });
   //idle
   scene.anims.create({
      key: 'gamer-idle-rear',
      frames: scene.anims.generateFrameNumbers('gamer', { frames: [3] }),
   });

   //flip
   scene.anims.create({
      key: 'gamer-flip-front',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [24, 25, 26, 27],
      }),
      frameRate: 3,
   });
   scene.anims.create({
      key: 'gamer-flip-rear',
      frames: scene.anims.generateFrameNumbers('gamer', {
         frames: [24, 25, 26, 27],
      }),
      frameRate: 3,
   });

   //hit
   scene.anims.create({
      key: 'hit-swipe',
      frames: scene.anims.generateFrameNumbers('hit', {
         frames: [0, 1, 2, 3, 4],
      }),
      frameRate: 10,
   });

   //pizza
   scene.anims.create({
      key: 'pizza-up',
      frames: scene.anims.generateFrameNumbers('pizza', {
         frames: [0],
      }),
   });
   scene.anims.create({
      key: 'pizza-down',
      frames: scene.anims.generateFrameNumbers('pizza', {
         frames: [1],
      }),
   });

   //car
   scene.anims.create({
      key: 'car-up',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [0],
      }),
   });
   scene.anims.create({
      key: 'car-run-up',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [0],
      }),
   });
   scene.anims.create({
      key: 'car-down',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [4],
      }),
   });
   scene.anims.create({
      key: 'car-run-down',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [4],
      }),
   });
   scene.anims.create({
      key: 'car-side',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [2],
      }),
   });
   scene.anims.create({
      key: 'car-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [3],
      }),
   });
   scene.anims.create({
      key: 'car-walk-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [3],
      }),
   });
   scene.anims.create({
      key: 'car-run-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [3],
      }),
   });
   scene.anims.create({
      key: 'car-idle-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [3],
      }),
   });
   scene.anims.create({
      key: 'car-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [1],
      }),
   });
   scene.anims.create({
      key: 'car-walk-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [1],
      }),
   });
   scene.anims.create({
      key: 'car-run-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [1],
      }),
   });
   scene.anims.create({
      key: 'car-up-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [5],
      }),
   });
   scene.anims.create({
      key: 'car-down-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [6],
      }),
   });
   scene.anims.create({
      key: 'car-up-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [7],
      }),
   });
   scene.anims.create({
      key: 'car-down-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [8],
      }),
   });
   scene.anims.create({
      key: 'car-flip-front',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [8, 1, 7, 1],
         frameRate: 2,
      }),
   });
   scene.anims.create({
      key: 'car-flip-rear',
      frames: scene.anims.generateFrameNumbers('car', {
         frames: [5, 3, 6, 3],
         frameRate: 2,
      }),
   });

   //Arrows
   scene.anims.create({
      key: 'arrow-rear',
      frames: scene.anims.generateFrameNumbers('arrow', {
         frames: [0]
      }),
   });
   scene.anims.create({
      key: 'arrow-down',
      frames: scene.anims.generateFrameNumbers('arrow', {
         frames: [1]
      }),
   });
   scene.anims.create({
      key: 'arrow-up',
      frames: scene.anims.generateFrameNumbers('arrow', {
         frames: [2]
      }),
   });
   scene.anims.create({
      key: 'arrow-front',
      frames: scene.anims.generateFrameNumbers('arrow', {
         frames: [3]
      }),
   });
   scene.anims.create({
      key: 'arrow-side',
      frames: scene.anims.generateFrameNumbers('arrow', {
         frames: [4]
      }),
   });

      //patron
      scene.anims.create({
         key: 'patron-front',
         frames: scene.anims.generateFrameNumbers('patron', {
            frames: [0]
         }),
      });
      scene.anims.create({
         key: 'patron-down',
         frames: scene.anims.generateFrameNumbers('patron', {
            frames: [1]
         }),
      });
      scene.anims.create({
         key: 'patron-rear',
         frames: scene.anims.generateFrameNumbers('patron', {
            frames: [2]
         }),
      });
      scene.anims.create({
         key: 'patron-up',
         frames: scene.anims.generateFrameNumbers('patron', {
            frames: [3]
         }),
      });

};

export default create;
