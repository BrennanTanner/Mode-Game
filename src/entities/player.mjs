class Player extends Phaser.Physics.Arcade.Sprite {
   constructor(scene) {
      super(scene);

      //modes
      this.invincible = false;
      this.loaded = true;

      this.shadow = scene.add.isoSprite(256, 256, 100, 'player');
      this.body = scene.add.isoSprite(256, 256, 100, 'player');

      this.shadow
         .setTintFill(0x000000)
         .setSize(15, 35)
         .setScale(2)
         .setOrigin(0.5, 1);
      this.shadow.scaleY = 1;
      this.shadow.preFX.addBlur(1, 1, 1, 1, 0x000000);
      this.shadow.setAlpha(0.6).setAngle(-65);

      scene.cameras.main.startFollow(this.body);
      scene.isoPhysics.world.enable(this.body);

      this.body.setScale(2).setOrigin(0.5, 1);

      //this.body.anims.timeScale = 0.5
      console.log(this.body.anims);
      //scene.isoPhysics.angleToPointer(this);
      this.body.body.collideWorldBounds = true;
      //this.body.body.bounce.set(1, 1, 0.2);
      this.body.anims.play('idle-front', true);
   }

   update(scene) {
      // console.log(scene.input.mousePointer.worldX+ " " + scene.input.mousePointer.worldY)
      this.controls(scene);
      this.animations();
      scene.graphics.clear();
      this.body.body.debugRender(scene.graphics);
      this.shadow.isoX = this.body.isoX - 5;
      this.shadow.isoY = this.body.isoY - 5;
      this.shadow.isoZ = 0;
      this.shadow.setScale(
         (1000 - Math.sqrt(this.body.isoZ * this.body.isoZ)) * 0.001
      );

      //console.log(Math.sqrt(this.body.isoZ*this.body.isoZ))
   }

   animations() {
      //do this
      const vel = this.body.body.velocity;

      this.body.anims.currentAnim.key;

      if (vel.z < 10 && vel.z > -10) {
         if (this.body.anims.currentAnim.key) {
            // this.body.anims.playAfterRepeat('land-front', true);
         }
         if ((vel.x > 0 && vel.y == 0) || (vel.x == 0 && vel.y > 0)) {
            this.body.anims.play('run-front', true);
            this.body.setFlipX(false);
            if (vel.x == 0 && vel.y > 0) {
               this.body.setFlipX(true);
            }
         } else if ((vel.x < 0 && vel.y == 0) || (vel.x == 0 && vel.y < 0)) {
            this.body.anims.play('run-rear', true);
            this.body.setFlipX(false);
            if (vel.x < 0 && vel.y == 0) {
               this.body.setFlipX(true);
            }
         } else if ((vel.x > 0 && vel.y < 0) || (vel.x < 0 && vel.y > 0)) {
            this.body.anims.play('run-front', true);
            this.body.setFlipX(false);
            if (vel.x < 0 && vel.y > 0) {
               this.body.setFlipX(true);
            }
         } else if (vel.y < 0 && vel.x < 0) {
            this.body.anims.play('run-up', true);
         } else if (vel.x > 0 && vel.y > 0) {
            this.body.anims.play('run-down', true);
         } else {
            this.body.anims.play('idle-front', true);
            this.shadow.isoZ = this.body.isoZ;
         }
      } else if (vel.z > -10) {
         if (
            (vel.x < 0 && vel.y < 0) ||
            (vel.x == 0 && vel.y < 0) ||
            (vel.x < 0 && vel.y == 0)
         ) {
            this.body.anims.play('up-rear', true);
         } else {
            this.body.anims.play('up-front', true);
         }
      } else if (vel.z < 10) {
         if (
            (vel.x < 0 && vel.y < 0) ||
            (vel.x == 0 && vel.y < 0) ||
            (vel.x < 0 && vel.y == 0)
         ) {
            this.body.anims.play('down-rear', true);
         } else {
            this.body.anims.play('down-front', true);
         }
      }
   }
   controls(scene) {
      this.body.body.velocity.y = 0;
      this.body.body.velocity.x = 0;
      if (scene.cursors.left.isDown) {
         //left
         this.body.body.velocity.y = 150;
         this.body.body.velocity.x = -150;

         if (scene.cursors.up.isDown) {
            //left-up
            this.body.body.velocity.x = -225;
            this.body.body.velocity.y = 0;
         } else if (scene.cursors.down.isDown) {
            //left-down
            this.body.body.velocity.x = 0;
            this.body.body.velocity.y = 225;
         }
      } else if (scene.cursors.right.isDown) {
         //right
         this.body.body.velocity.x = 150;
         this.body.body.velocity.y = -150;
         if (scene.cursors.up.isDown) {
            //right-up
            this.body.body.velocity.y = -225;
            this.body.body.velocity.x = 0;
         } else if (scene.cursors.down.isDown) {
            //right-down
            this.body.body.velocity.x = 225;
            this.body.body.velocity.y = 0;
         }
      } else if (scene.cursors.up.isDown) {
         //up
         this.body.body.velocity.x = -150;
         this.body.body.velocity.y = -150;
      } else if (scene.cursors.down.isDown) {
         //down
         this.body.body.velocity.x = 150;
         this.body.body.velocity.y = 150;
      }

      if (scene.spaceKey.isDown) {
         //jump
         this.body.body.velocity.z = 150;
      }
   }
}

export default Player;
