//loads images (no anims, but more light weight than sprites)
const preload = {};

preload.audio = (scene) => {
   // music
   scene.load.audio('main-track','/audio/main.mp3');
   
   // success
   scene.load.audio('success-sound', '/audio/success.wav');

   // hit sounds
   scene.load.audio('hit-sound', '/audio/hi.wav');

}

preload.images = (scene) => {
   // city tiles
   scene.load.image('city_sheet', '/images/tiles/cityTiles-250x190.png');

   scene.load.tilemapTiledJSON('tilemap', '/json/maps/map1.tmj');
};

preload.sprites = (scene) => {
   //buildings
   scene.load.spritesheet(
      'building_sheet',
      '/images/buildings/cityTiles_sheet.png',
      { frameWidth: 250, frameHeight: 211 }
   );

   //player
   scene.load.spritesheet('player', '/images/player/spritesheet-guy.png', {
      frameWidth: 33,
      frameHeight: 33,
   });

   //Gamer
   scene.load.spritesheet('gamer', '/images/citizen/citizen-sheet.png', {
      frameWidth: 33,
      frameHeight: 33,
   });
   //Gamer Hit
   scene.load.spritesheet('hit', '/images/citizen/hit.png', {
      frameWidth: 35,
      frameHeight: 32,
   });
   //pizza
   scene.load.spritesheet('pizza', '/images/pizza/pizza.png', {
      frameWidth: 16,
      frameHeight: 16,
   });
   //car
   scene.load.spritesheet('car', '/images/vehicles/car_red.png', {
      frameWidth: 33,
      frameHeight: 33,
   });
   //arrow
   scene.load.spritesheet('arrow', '/images/arrow/arrow.png', {
      frameWidth: 18,
      frameHeight: 18,
   });
      //patron
      scene.load.spritesheet('patron', '/images/citizen/patron.png', {
         frameWidth: 33,
         frameHeight: 33,
      });
};

export default preload;
