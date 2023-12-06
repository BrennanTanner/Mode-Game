//loads images (no anims, but more light weight than sprites)
const preload = {};

preload.images = (scene) => {
   // city tiles
   scene.load.image('city_sheet', '/images/tiles/cityTiles-250x190.png');
   scene.load.tilemapTiledJSON('tilemap', '/json/maps/map1.tmj');
};

preload.sprites = (scene) => {
   //player
   scene.load.spritesheet('player', '/images/player/spritesheet-guy.png', {
      frameWidth: 33,
      frameHeight: 33,
   });
};

export default preload;
