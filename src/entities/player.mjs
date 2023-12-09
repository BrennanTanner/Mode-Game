class Player extends Phaser.GameObjects.Sprite {
   constructor(scene) {
      super(scene);

      this.scene = scene;
      //modes
      this.invincible = false;
      this.loaded = true;
      this.facing = 'front';
      this.hit = false;
      this.modeMode = false;
      this.slowMotion = 0.05;

      this.shadow = scene.add.isoSprite(256, 256, 100, 'player');
      this.body = scene.add.isoSprite(256, 256, 100, 'player');

      this.shadow
         .setTintFill(0x000000)
         .setSize(15, 35)
         .setScale(2)
         .setOrigin(0.5, 1)
         .setAlpha(0.3)
         .setAngle(-65);
      this.shadow.scaleY = 0.5;

      scene.cameras.main.startFollow(this.body);

      this.body.setScale(2).setOrigin(0.5, 1).setSize(30, 60);

      scene.isoPhysics.world.enable(this.body);

      this.body.body.collideWorldBounds = true;
      this.body.body.drag.x = 200;
      this.body.body.drag.y = 200;

      this.body.anims.play('idle-front', true);
      console.log(this.scene.isoPhysics);
   }

   update() {
      if (Phaser.Input.Keyboard.JustDown(this.scene.EKey)) {
         // this.scene.physics.world.timeScale = 0.5;
         // this.scene.time.timeScale = 0.5;
         if (this.modeMode) {
            this.scene.isoPhysics.world.bodies.entries.map((body) => {
               body.velocity.x = body.velocity.x / 0.05;
               body.velocity.y = body.velocity.y / 0.05;
               body.velocity.z = body.velocity.z / 0.05;
            });
            this.scene.isoPhysics.world.gravity.z = -500;
         } else {
            this.scene.isoPhysics.world.bodies.entries.map((body) => {
               body.velocity.x = body.velocity.x * 0.05;
               body.velocity.y = body.velocity.y * 0.05;
               body.velocity.z = body.velocity.z * 0.05;
            });
            this.scene.isoPhysics.world.gravity.z = -25;
         }
         this.modeMode = !this.modeMode;
         console.log('mode: ' + this.modeMode);
      }
      this.shadow.anims.play(this.body.anims.currentAnim.key, true);
      this.shadow.setFlipX(this.body.flipX);
      if (this.modeMode) {
         this.modeControls();
         this.modeAnimations();
      } else {
         if (this.hit) {
            this.hitAnimations();
         } else {
            this.runControls(this.scene);
            this.animations();
         }
      }

      this.scene.graphics.clear();
      this.body.body.debugRender(this.scene.graphics);
      this.shadow.isoX = this.body.isoX - 5;
      this.shadow.isoY = this.body.isoY - 5;
      this.shadow.isoZ = 0;
      this.shadow.setScale(
         (1000 - Math.sqrt(this.body.isoZ * this.body.isoZ)) * 0.001
      );

      //console.log(Math.sqrt(this.body.isoZ*this.body.isoZ))
   }

   modeControls() {}
   modeAnimations() {
      const angle = Phaser.Math.RadToDeg(
         this.scene.isoPhysics.angleToPointer(this.body)
      );

      if (angle > 45 || angle < -135) {
         this.body.setFlipX(true);
      } else if (angle <= 45 && angle >= -135) {
         this.body.setFlipX(false);
      }
      //down-left or down-right
      if (
         (angle <= 135 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -45 && angle < 0)
      ) {
         this.body.anims.play('aim-front', true);
      }
      //up-left or up-right
      else if (
         angle < -157.5 ||
         angle > 135 ||
         (angle > -112.5 && angle < -45)
      ) {
         this.body.anims.play('aim-rear', true);

         //up
      } else if (angle < -112.5 && angle > -157.5) {
         this.body.anims.play('aim-up', true);

         //down
      } else if (angle < 67.5 && angle > 22.5) {
         this.body.anims.play('aim-down', true);
      }
   }
   hitAnimations() {
      this.body.body.bounce.set(0, 0, 0.4);
      const vel = this.body.body.velocity;
      if (vel.z < 5 && vel.z > -5) {
         this.body.anims.play(`get-up-${this.facing}`, true);
         if (this.body.anims.getProgress() == 1) {
            this.hit = false;
            this.body.body.bounce.set(0, 0, 0);
         }
      } else {
         if ((vel.x < 0 && vel.y >= 0) || (vel.x < 0 && vel.y < 0)) {
            this.facing = 'front';
         } else if ((vel.x >= 0 && vel.y >= 0) || (vel.x > 0 && vel.y < 0)) {
            this.facing = 'rear';
         }

         if (vel.z < -5) {
            this.body.anims.play(`hit-fall-${this.facing}`, true);
         } else if (vel.z > 5) {
            this.body.anims.play(`hit-${this.facing}`, true);
         }
      }
   }
   animations() {
      const vel = this.body.body.velocity;
      const angle = Phaser.Math.RadToDeg(this.body.body.angle);
      //this.shadow.anims.play(this.body.anims.currentAnim.key, true);

      if (angle > 45 || angle < -135) {
         this.body.setFlipX(true);
      } else if (angle <= 45 && angle >= -135) {
         this.body.setFlipX(false);
      }
      //idle
      if (vel.x == 0 && vel.y == 0 && vel.z < 10 && vel.z > -10) {
         this.body.anims.play(`idle-${this.facing}`, true);
      }
      //down-left or down-right
      else if (
         (angle <= 135 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -45 && angle < 0)
      ) {
         //console.log('1');
         if (vel.z > 10) {
            this.facing = 'front';
            this.body.anims.play('up-front', true);
         } else if (vel.z < -10) {
            this.facing = 'front';
            this.body.anims.play('down-front', true);
         } else {
            this.facing = 'front';
            this.body.anims.play('run-front', true);
         }
      }
      //up-left or up-right
      else if (
         angle < -157.5 ||
         angle > 135 ||
         (angle > -112.5 && angle < -45)
      ) {
         //console.log('2');
         if (vel.z > 10) {
            this.facing = 'rear';
            this.body.anims.play('up-rear', true);
         } else if (vel.z < -10) {
            this.facing = 'rear';
            this.body.anims.play('down-rear', true);
         } else {
            this.facing = 'rear';
            this.body.anims.play('run-rear', true);
         }
      }
      //up
      else if (angle < -112.5 && angle > -157.5) {
         //console.log('3');
         if (vel.z > 10) {
            this.facing = 'rear';
            this.body.anims.play('up-rear', true);
         } else if (vel.z < -10) {
            this.facing = 'rear';
            this.body.anims.play('down-rear', true);
         } else {
            this.facing = 'rear';
            this.body.anims.play('run-up', true);
         }
      }
      //down
      else if (angle < 67.5 && angle > 22.5) {
         //console.log('4');
         if (vel.z > 10) {
            this.facing = 'front';
            this.body.anims.play('up-front', true);
         } else if (vel.z < -10) {
            this.facing = 'front';
            this.body.anims.play('down-front', true);
         } else {
            this.facing = 'front';
            this.body.anims.play('run-down', true);
         }
      }

      //this.shadow.isoZ = this.body.isoZ;
   }
   runControls() {
      this.body.body.velocity.y = 0;
      this.body.body.velocity.x = 0;
      if (this.scene.cursors.left.isDown || this.scene.AKey.isDown) {
         //left
         this.body.body.velocity.y = 150;
         this.body.body.velocity.x = -150;

         if (this.scene.cursors.up.isDown || this.scene.WKey.isDown) {
            //left-up
            this.body.body.velocity.x = -225;
            this.body.body.velocity.y = 0;
         } else if (this.scene.cursors.down.isDown || this.scene.SKey.isDown) {
            //left-down
            this.body.body.velocity.x = 0;
            this.body.body.velocity.y = 225;
         }
      } else if (this.scene.cursors.right.isDown || this.scene.DKey.isDown) {
         //right
         this.body.body.velocity.x = 150;
         this.body.body.velocity.y = -150;
         if (this.scene.cursors.up.isDown || this.scene.WKey.isDown) {
            //right-up
            this.body.body.velocity.y = -225;
            this.body.body.velocity.x = 0;
         } else if (this.scene.cursors.down.isDown || this.scene.SKey.isDown) {
            //right-down
            this.body.body.velocity.x = 225;
            this.body.body.velocity.y = 0;
         }
      } else if (this.scene.cursors.up.isDown || this.scene.WKey.isDown) {
         //up
         this.body.body.velocity.x = -150;
         this.body.body.velocity.y = -150;
      } else if (this.scene.cursors.down.isDown || this.scene.SKey.isDown) {
         //down
         this.body.body.velocity.x = 150;
         this.body.body.velocity.y = 150;
      }

      if (Phaser.Input.Keyboard.JustDown(this.scene.spaceKey)) {
         this.body.body.velocity.z = 250;
      }
   }
}

export default Player;
