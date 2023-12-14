(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("buildings",
{ "compressionlevel":-1,
 "height":21,
 "infinite":false,
 "layers":[
        {
         "data":[61, 83, 61, 0, 0, 73, 62, 73, 0, 78, 62, 78, 0, 63, 63, 63,
            80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63,
            62, 0, 70, 0, 0, 0, 0, 67, 0, 63, 0, 63, 0, 0, 0, 63,
            62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            61, 0, 70, 0, 0, 76, 0, 63, 0, 0, 0, 0, 63, 0, 0, 82,
            80, 0, 70, 0, 0, 76, 0, 80, 0, 0, 0, 0, 82, 0, 0, 61,
            81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            0, 0, 72, 0, 0, 77, 0, 63, 0, 74, 0, 74, 0, 61, 0, 80,
            61, 0, 72, 0, 0, 77, 0, 0, 0, 74, 0, 74, 0, 77, 0, 0,
            62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61,
            82, 0, 0, 0, 0, 77, 0, 0, 0, 70, 0, 0, 0, 76, 0, 82,
            62, 0, 61, 0, 0, 77, 0, 64, 0, 80, 0, 64, 0, 63, 0, 81,
            80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62,
            0, 0, 63, 0, 0, 79, 0, 82, 0, 0, 0, 0, 0, 65, 0, 81,
            80, 0, 63, 0, 0, 78, 0, 82, 0, 0, 0, 0, 0, 65, 0, 61,
            63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            63, 0, 0, 0, 0, 62, 0, 61, 0, 72, 0, 77, 0, 81, 0, 62,
            61, 0, 81, 0, 0, 0, 0, 61, 0, 0, 0, 0, 0, 0, 0, 62,
            61, 0, 0, 0, 0, 82, 0, 80, 0, 72, 0, 77, 0, 75, 0, 82,
            61, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81,
            61, 61, 65, 0, 0, 82, 61, 80, 62, 0, 61, 62, 62, 61, 80, 62],
         "height":21,
         "id":2,
         "name":"1",
         "offsetx":0,
         "offsety":-65,
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":16,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":1,
 "orientation":"isometric",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":125,
 "tilesets":[
        {
         "columns":60,
         "firstgid":1,
         "grid":
            {
             "height":190,
             "orientation":"isometric",
             "width":250
            },
         "image":"..\/..\/..\/..\/..\/..\/Downloads\/Mode Assest\/cityTiles-250x190.png",
         "imageheight":190,
         "imagewidth":15000,
         "margin":0,
         "name":"city_tile",
         "spacing":0,
         "tilecount":60,
         "tileheight":190,
         "tilewidth":250,
         "wangsets":[
                {
                 "colors":[
                        {
                         "color":"#ff0000",
                         "name":"Pavement",
                         "probability":1,
                         "tile":-1
                        }, 
                        {
                         "color":"#00ff00",
                         "name":"Sidewalk",
                         "probability":1,
                         "tile":-1
                        }],
                 "name":"Unnamed Set",
                 "tile":-1,
                 "type":"mixed",
                 "wangtiles":[
                        {
                         "tileid":0,
                         "wangid":[1, 1, 1, 1, 2, 1, 2, 1]
                        }, 
                        {
                         "tileid":1,
                         "wangid":[2, 2, 2, 2, 2, 1, 2, 2]
                        }, 
                        {
                         "tileid":2,
                         "wangid":[2, 2, 2, 2, 2, 2, 2, 1]
                        }, 
                        {
                         "tileid":3,
                         "wangid":[2, 1, 2, 2, 2, 2, 2, 2]
                        }, 
                        {
                         "tileid":4,
                         "wangid":[2, 2, 2, 2, 2, 1, 1, 1]
                        }, 
                        {
                         "tileid":5,
                         "wangid":[1, 1, 2, 2, 2, 2, 2, 1]
                        }]
                }]
        }, 
        {
         "columns":23,
         "firstgid":61,
         "grid":
            {
             "height":211,
             "orientation":"isometric",
             "width":250
            },
         "image":"..\/..\/images\/buildings\/cityTiles_sheet.png",
         "imageheight":211,
         "imagewidth":5750,
         "margin":0,
         "name":"building_tile",
         "spacing":0,
         "tilecount":23,
         "tileheight":211,
         "tiles":[
                {
                 "id":0
                }, 
                {
                 "id":11
                }, 
                {
                 "id":8
                }, 
                {
                 "id":16
                }, 
                {
                 "id":14
                }, 
                {
                 "id":20
                }, 
                {
                 "id":4
                }, 
                {
                 "id":3
                }, 
                {
                 "id":9
                }, 
                {
                 "id":6
                }, 
                {
                 "id":2
                }, 
                {
                 "id":15
                }, 
                {
                 "id":12
                }, 
                {
                 "id":18
                }, 
                {
                 "id":17
                }, 
                {
                 "id":1
                },
            
                {
                 "id":21
                }, 
                {
                 "id":7
                }, 
                {
                 "id":5
                }, 
                {
                 "id":13
                }, 
                {
                 "id":10
                }, 
                {
                 "id":19
                }, 
                {
                 "id":22
                }],
         "tilewidth":250
        }],
 "tilewidth":250,
 "type":"map",
 "version":"1.10",
 "width":16
});