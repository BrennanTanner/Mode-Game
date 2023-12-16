import IsoPlugin, { IsoPhysics } from '../Iso-plugin/IsoPlugin';
import preload from '../utils/preloads.mjs';
import create from '../utils/creates.mjs';
import Gamer from '../entities/enemy.mjs';
import Hit from '../entities/hit.mjs';
import Car from '../entities/car.mjs';

class TestScene extends Phaser.Scene {
   constructor() {
      const sceneConfig = {
         key: 'TestScene',
         mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' },
      };

      super(sceneConfig);
      // declare objects
      this.player;
      this.pizza;
      this.platforms;
      this.cursors;
      this.keys;
   }

   preload() {
      this.loadingBar();
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

      this.load.plugin(
         'rexoutlinepipelineplugin',
         'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js',
         true
      );

      //get canvas
      this.canvas = this.sys.game.canvas;

      // load tiles
      preload.images(this);
      preload.sprites(this);
      preload.audio(this);

      this.load.crossOrigin = 'anonymous';

      this.load.image('ground', '/images/test/cube.png');

      this.pizzasDelivered = 0;
      //       var menu = new Menu(this, config);
      // this.add.existing(menu)
   }

   create() {
      create.audio(this);
      
      this.music.play();

      create.map(this);
      create.animations(this);
      this.isoPhysics.world.gravity.setTo(0, 0, -500);
      this.isoPhysics.projector.origin.setTo(0.5, 0.3);
      this.graphics = this.add.graphics({ x: 0, y: 0 });

      this.postFxPlugin = this.plugins.get('rexoutlinepipelineplugin');

      this.buildings = this.add.group();
      create.buildings(this);
      create.player(this);
      create.pizza(this);
      create.arrow(this);
      create.patron(this, -300, 980, 0);
      

      this.scorebg= this.rexUI.add.roundRectangle(310, 166, 180, 20, 10, 0x80101313).setScrollFactor(0)

      this.score = this.add
         .text(230, 160, `Pizzas Delivered: ${this.pizzasDelivered}`, {
            fontSize: '10px',
         })
         .setResolution(3).setScrollFactor(0);
         this.scorebg.depth = 5000;
         this.score.depth = 5001;
         this.tip = this.add
         .text(230, 420, `press Q to use the Mode gun`, {
            fontSize: '10px',
         })
         .setResolution(3).setScrollFactor(0);
         this.tip = this.add
         .text(80, 60, `Press E to spawn a Pizza`, {
            fontSize: '10px',
         }).setResolution(3);
         this.tip.depth = 10000;
         this.scorebg.depth = 5000;
         this.score.depth = 5001;
      this.platforms = this.add.group();

      this.gamers = this.add.group({
         classType: Gamer,
         maxSize: 30,
         runChildUpdate: true,
      });
      this.hits = this.add.group({
         classType: Hit,
         maxSize: 20,
         runChildUpdate: true,
      });

      this.cars = this.add.group({
         classType: Car,
         maxSize: 20,
         runChildUpdate: true,
      });

      //this.cars.create(256, 256, 100);

      for (let i = 0; i < 100; i++) {
         this.gamers.create(Phaser.Math.Between(
            1,
            this.isoPhysics.world.bounds.widthY
         )-1, 75 * i);
      }

      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = {
         EKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
         QKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
         WKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
         AKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
         SKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
         DKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
         spaceKey: this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
         ),
      };
      const camera = this.cameras.main;
      camera.setZoom(2);

      //camera.postFX.addTiltShift(0.3, 1.0, 0, 0.5, 1);
   }

   update() {
      this.isoPhysics.world.collide(this.buildings, this.player.body);
      this.isoPhysics.world.collide(this.buildings, this.pizza.body);

      this.isoPhysics.world.collide(this.buildings, this.gamers);

      //console.log(this.buildings)
      this.buildings.children.each((building) => {
         this;
         building.update(this);
      });
      this.isoPhysics.world.collide(this.platforms, this.player.body);
      this.isoPhysics.world.collide(this.platforms, this.pizza.body);
      this.isoPhysics.world.collide(
         this.pizza.body,
         this.player.body,
         this.changeHolder.bind(this)
      );

      //cars

      this.isoPhysics.world.collide(this.platforms, this.cars);

      this.isoPhysics.world.collide(this.cars, this.player.body);

      this.isoPhysics.world.collide(this.cars, this.buildings);

      this.isoPhysics.world.collide(this.cars, this.pizza.body);

      //gamers
      this.isoPhysics.world.collide(this.gamers);
      this.isoPhysics.world.collide(this.platforms);

      this.isoPhysics.world.collide(this.cars, this.gamers);

      this.isoPhysics.world.collide(this.platforms, this.gamers);

      this.isoPhysics.world.collide(this.gamers, this.player.body);

      this.isoPhysics.world.collide(
         this.gamers,
         this.pizza.body,
         this.changeHolder,
         null,
         this
      );

      this.isoPhysics.world.collide(
         this.patron.body,
         this.pizza.body,
         this.deliverPizza,
         null,
         this
      );

      //hits
      this.hits.children.each((hit) => {
         this.isoPhysics.world.collide(
            hit.body,
            this.player.body,
            this.hitPlayer,
            null,
            this
         );
      });
      this.player.update(this);
      this.pizza.update(this);
      this.arrow.update(this);
      this.patron.update(this);
   }

   hitPlayer(hit) {
      this.player.hit = true;
      if (this.pizza.holder.name == 'player') {
         this.pizza.holder = false;
      }

      if(this.player.body.holdingPizza){
      this.player.body.holdingPizza = false;
      }
      hit.hasHit = true;
      this.hitSound.play({ volume: 3});
   }

   changeHolder(pizza, grabber) {
      if (this.pizza.holder) {
         this.pizza.holder.holdingPizza = false;
      }

      this.pizza.holder = grabber;
      grabber.holdingPizza = true;
   }

   deliverPizza(patron, pizza) {
      patron.body.x = Phaser.Math.Between(
         0,
         this.isoPhysics.world.bounds.widthX
      );
      patron.body.y = Phaser.Math.Between(
         0,
         this.isoPhysics.world.bounds.widthY
      );

      this.pizza.holder.holdingPizza = false;

      this.pizza.destroy();
      create.pizza(this);
      
      this.pizzasDelivered++;
      this.score.setText(`Pizzas Delivered: ${this.pizzasDelivered}`)
      this.successSound.play({ volume: 2 });
   }

   loadingBar() {
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      var width = this.cameras.main.width / 2;
      var height = this.cameras.main.height / 2;

      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width - 160, height - 10, 320, 50);

      var loadingText = this.make.text({
         x: width,
         y: height - 30,
         text: 'Loading...',
         style: {
            font: '20px monospace',
            fill: '#ffffff',
         },
      });
      loadingText.setOrigin(0.5, 0.5);

      var percentText = this.make.text({
         x: width,
         y: height + 15,
         text: '0%',
         style: {
            font: '18px monospace',
            fill: '#ffffff',
         },
      });
      percentText.setOrigin(0.5, 0.5);

      var assetText = this.make.text({
         x: width,
         y: height + 60,
         text: '',
         style: {
            font: '18px monospace',
            fill: '#ffffff',
         },
      });
      assetText.setOrigin(0.5, 0.5);

      this.load.on('progress', function (value) {
         percentText.setText(parseInt(value * 100) + '%');
         progressBar.clear();
         progressBar.fillStyle(0xffffff, 1);
         progressBar.fillRect(width - 150, height, 300 * value, 30);
      });

      this.load.on('fileprogress', function (file) {
         assetText.setText('Loading asset: ' + file.key);
      });
      this.load.on('complete', function () {
         progressBar.destroy();
         progressBox.destroy();
         loadingText.destroy();
         percentText.destroy();
         assetText.destroy();
      });
   }
}

export default TestScene;
