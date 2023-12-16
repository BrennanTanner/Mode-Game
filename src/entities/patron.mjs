class Patron extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z) {
      super(scene, x, y, z);

      this.scene = scene;
      this.body = scene.add.isoSprite(x, y, z, 'patron');
      this.body.setSize(15, 30);
      this.body.setOrigin(0.5, 1);

      scene.isoPhysics.world.enable(this.body);
      this.body.body.collideWorldBounds = true;
      this.body.body.bounce.set(1, 1, -1);
      this.body.body.immovable = true;

      //this.body.body.moves = false;
      this.name = 'patron';
      // this.body.body.skiptree = true;
   }

   update() {
      if (this.body.body.blocked.up || this.body.body.touching.up) {
         this.body.isoX = 200;
         this.body.isoY = 200;
         this.body.isoZ = 0;
      }

      //this.body.body.center.z = 0
      //this.body.body.reset()
      const angle = Phaser.Math.RadToDeg(
         this.scene.isoPhysics.anglesToXYZ(
            this.scene.player.body,
            this.body.isoX,
            this.body.isoY,
            this.body.isoZ
         ).theta
      );

      if (angle > 45 || angle < -135) {
         this.body.setFlipX(false);
      } else if (angle <= 45 && angle >= -135) {
         this.body.setFlipX(true);
      }
      //down-left or down-right
      if (
         (angle <= 112.5 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -22.5 && angle < 0)
      ) {
         this.body.anims.play('patron-rear', true);
      }
      //side
      else if (
         (angle <= 157.5 && angle > 112.5) ||
         (angle <= -22.5 && angle > -67.5)
      ) {
         this.body.anims.play('patron-rear', true);
      }
      //up-left or up-right
      else if (
         angle < -157.5 ||
         angle > 157.5 ||
         (angle > -112.5 && angle < -67.5)
      ) {
         this.body.anims.play('patron-front', true);
      }
      //up
      else if (angle < -112.5 && angle > -157.5) {
         this.body.anims.play('patron-down', true);
      }
      //down
      else if (angle < 67.5 && angle > 22.5) {
         this.body.anims.play('patron-up', true);
      }
   }
}

export default Patron;
