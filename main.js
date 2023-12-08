import Phaser from 'phaser';
import TestScene from './src/scenes/TestScene.mjs';
import IsoCollisionExample from './src/scenes/testIsoPlugin.mjs';
import DebugDrawPlugin from 'phaser-plugin-debug-draw';

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
     scene: [
       { key: 'DebugDrawPlugin', plugin: DebugDrawPlugin, mapping: 'debugDraw' }
     ]
   }
};

new Phaser.Game(config);
