function createMap(scene) {
   const map = scene.make.tilemap({ key: 'tilemap' });
      const city_tiles = map.addTilesetImage('city_tile', 'city_sheet');

   scene.bg = map.createLayer('Base', city_tiles).setScale(2);
   scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

export {createMap};
