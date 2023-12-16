import Phaser from 'phaser';
import TestScene from './src/scenes/TestScene.mjs';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const screenHeight = screen.availHeight - 200;
const screenWidth = screen.availWidth;

var config = {
   type: Phaser.AUTO,
   width: 800,
   height: 600,
   pixelArt: true,
   backgroundColor: '#121215',
   scene: [TestScene],
   physics: {
    default: "arcade",
  },
  plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        },
        // ...
        ]
    }
  //  plugins: {
  //    scene: [
  //      { key: 'DebugDrawPlugin', plugin: DebugDrawPlugin, mapping: 'debugDraw' }
  //    ]
  //  }
};

const game = new Phaser.Game(config);
game.scene.start('test', { image: '/public/images/pizza/pizza.png', x: 400, y: 300 });
