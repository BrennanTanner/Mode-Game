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

      //get canvas
      this.canvas = this.sys.game.canvas;

      // load tiles
      preload.images(this);
      preload.sprites(this);

      this.load.crossOrigin = 'anonymous';

      this.load.image('ground', '/images/test/cube.png');
   }

   create() {
      create.map(this);
      create.animations(this);
      this.isoPhysics.world.gravity.setTo(0, 0, -500);
      this.isoPhysics.projector.origin.setTo(0.5, 0.3);
      this.graphics = this.add.graphics({ x: 0, y: 0 });

      create.player(this);
      create.pizza(this);
      this.platforms = this.add.group();
      
      this.gamers = this.add.group({
         classType: Gamer,
         maxSize: 200,
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

      this.cars.create(256, 256, 100);

      for (let i = 0; i < 2; i++) {
         this.gamers.create(50 * i, 50 * i);
      }

      // this.gamers.create(250, 250)
      //new Gamer(this, 250, 250)
      for (let i = 0; i < 3; i++) {
         const cube = this.add.isoSprite(50 * i, 250, 0, 'ground');
         this.platforms.add(cube);
        this.isoPhysics.world.enable(cube);
         cube.body.collideWorldBounds = true;
         cube.body.bounce.set(0, 0, 0);
         cube.body.name="cube"
      }

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(
         Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      const camera = this.cameras.main;

      camera.postFX.addTiltShift(0.3, 1.0, 0, 0.5, 1);
   }

   update() {
      this.isoPhysics.world.collide(this.platforms, this.player.body);
      this.isoPhysics.world.collide(this.platforms, this.pizza.body);
      this.isoPhysics.world.collide(this.player.body, this.pizza.body, this.changeHolder.bind(this));

      //cars
      this.cars.children.each((car) => {
         this.isoPhysics.world.collide( this.platforms, car.body);
      });
      this.cars.children.each((car) => {
         this.isoPhysics.world.collide(car.body, this.player.body);
      });

      this.cars.children.each((car) => {
         this.isoPhysics.world.collide(
            car.body,
            this.pizza.body,
             this.changeHolder.bind(this)
         );
      });

   
      //gamers
      this.isoPhysics.world.collide(this.gamers)
      this.isoPhysics.world.collide(this.platforms)

      this.gamers.children.each((gamer) => {
         this.isoPhysics.world.collide( this.platforms, gamer.body);
      });
      this.gamers.children.each((gamer) => {
         this.isoPhysics.world.collide(gamer.body, this.player.body);
      });

      this.gamers.children.each((gamer) => {
         this.isoPhysics.world.collide(
            gamer.body,
            this.pizza.body,
             this.changeHolder.bind(this)
         );
      });
      //hits
      this.hits.children.each((hit) => {
         this.isoPhysics.world.collide(
            hit.body,
            this.player.body,
            this.hitPlayer.bind(this),null,this
           
         );
      });
      this.player.update(this);
      this.pizza.update(this);
   }

    hitPlayer(hit) {
      this.player.hit = true;
      this.pizza.holder = false;
      hit.hasHit = true;
   }

   changeHolder(grabber, pizza) {

     this.pizza.holder = grabber;
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
