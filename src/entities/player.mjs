import create from '../utils/creates.mjs';

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
      this.drive = false;
      this.car = null;
      this.jumps = 1;
      this.maxJumps = 1;
      this.menu = false;
      

      this.shadow = scene.add.isoSprite(0, 0, 0, 'player');
      this.body = scene.add.isoSprite(-200, 90, 0, 'player');

      this.body.holdingPizza = false;

      this.shadow
         .setTintFill(0x000000)
         .setSize(1)
         .setOrigin(1, 0.5)
         .setAlpha(0.3)
         .setAngle(-60);

      this.shadow.scaleY = 0.1;
      scene.cameras.main.startFollow(this.body);

      this.body.setOrigin(0.5, 1).setSize(30, 60);

      scene.isoPhysics.world.enable(this.body);

      this.body.body.collideWorldBounds = true;
      this.body.body.drag.x = 200;
      this.body.body.drag.y = 200;
      this.body.name = 'player';
      this.body.anims.play('idle-front', true);
      //console.log(this.body);

        //this.scene.physics.world.timeScale = 0.1
      //menu
      this.items = [
         {
            name: 'Double Jump: Off',
         },
         {
            name: 'Big Mode: Off'
         },
      ];

      this.menu = undefined;
      this.body
         .setInteractive()
         .on('pointerup', () => {
            if (this.scene.player.modeMode) {
               if (this.menu === undefined) {
                  this.menu = create.menu(
                     this.scene,
                     this.body.x,
                     this.body.y,
                     this.items,
                     function (button) {
                        switch (button.text) {
                           case 'Double Jump: Off':
                              this.maxJumps = 2;
                              this.menu.children[0].children[2].setText(
                                 'Double Jump: On'
                              );
                              this.items[0].name = 'Double Jump: On';
                              break;
                           case 'Double Jump: On':
                              this.maxJumps = 1;
                              this.menu.children[0].children[2].setText(
                                 'Double Jump: Off'
                              );
                              this.items[0].name = 'Double Jump: Off';
                              break;
                           case 'Big Mode: Off':
                              this.body.setSize(45, 90);
                              
                              this.body.setScale(3);
                              //this.body.body.velocity.z = 0;
                              
                              this.menu.children[1].children[2].setText(
                                 'Big Mode: On'
                              );
                              this.items[1].name = 'Big Mode: On';
                              break;

                           case 'Big Mode: On':
                              
                              this.body.setSize(15, 30);
                              
                              this.body.setScale(1);
                              //this.body.body.velocity.z = 0;
                              this.menu.children[1].children[2].setText(
                                 'Big Mode: Off'
                              );
                              this.items[1].name = 'Big Mode: Off';
                              break;

                           case 'Car Mode: Off':
                              this.sprite = 'car';
                              
                              this.menu.children[2].children[2].setText(
                                 'Car Mode: On'
                              );
                              this.items[2].name = 'Car Mode: On';
                              break;

                           case 'Car Mode: On':
                              this.sprite = 'gamer';
                              this.menu.children[2].children[2].setText(
                                 'Car Mode: Off'
                              );
                              this.items[2].name = 'Car Mode: Off';
                              break;
                           default:
                              break;
                        }
                     }.bind(this)
                  );
               } else {
                  if (this.menu.scene) {
                     this.menu.collapse();
                  }
                  this.menu = undefined;
               }
            }
         })
         .on('pointerover', () => {
            if (this.scene.player.modeMode) {
               this.scene.postFxPlugin.add(this.body, {
                  thickness: 3,
                  outlineColor: 0x15c7c3,
               });
            }
         })
         .on('pointerout', () => {
            this.scene.postFxPlugin.remove(this.body);
         });
        
   }

   update() {
      
      
      if (this.drive) {
         this.body.isoX = this.car.body.isoX;
         this.body.isoY = this.car.body.isoY;
         this.body.isoZ = this.car.body.isoZ;
         this.driveControls();
      } else {
         if (this.menu) {
            this.menu.x = this.body.x;
            this.menu.y = this.body.y;
            if (!this.scene.player.modeMode) {
               if (this.menu.scene) {
                  this.menu.collapse();
               }
               this.menu = undefined;
               this.scene.postFxPlugin.remove(this.body);
            }
         }
         if ((this.body.body.blocked.down || this.body.body.touching.down) && this.jumps < this.maxJumps){
            this.jumps++;
         }
         if (Phaser.Input.Keyboard.JustDown(this.scene.keys.QKey)) {
            // this.scene.physics.world.timeScale = 0.5;
            // this.scene.time.timeScale = 0.5;
         
            if (this.modeMode) {
               this.scene.music.rate = 1
               //this.scene.shader.active=false;
               this.scene.isoPhysics.world.bodies.entries.map((body) => {
                  body.velocity.x = body.velocity.x / 0.05;
                  body.velocity.y = body.velocity.y / 0.05;
                  body.velocity.z = body.velocity.z / 0.05;
               });
               this.scene.isoPhysics.world.gravity.z = -500;
            } else {
               this.scene.music.rate = .5
               // this.scene.shader.active=true;
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
               this.driveControls();
            }
         }

         this.shadow.isoX = this.body.isoX - 5;
         this.shadow.isoY = this.body.isoY - 5;
         this.shadow.isoZ = 0;
         this.shadow.setScale(
            (800 - Math.sqrt(this.body.isoZ * this.body.isoZ)) * 0.001
         );
      }
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
      this.body.body.bounce.set(0, 0, 0.5);
      const vel = this.body.body.velocity;
      if (vel.z < 25 && vel.z > -25) {
         if (vel.x < 5 && vel.x > -5 && vel.y < 5 && vel.y > -5) {
            this.body.anims.play(`get-up-${this.facing}`, true);
            if (this.body.anims.getProgress() == 1) {
               this.hit = false;
               this.body.body.bounce.set(0, 0, 0);
            }
         } else {
            this.body.anims.play(`lay-${this.facing}`, true);
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
      if (this.scene.cursors.left.isDown || this.scene.keys.AKey.isDown) {
         //left
         this.body.body.velocity.y = 75;
         this.body.body.velocity.x = -75;

         if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
            //left-up
            this.body.body.velocity.x = -115;
            this.body.body.velocity.y = 0;
         } else if (
            this.scene.cursors.down.isDown ||
            this.scene.keys.SKey.isDown
         ) {
            //left-down
            this.body.body.velocity.x = 0;
            this.body.body.velocity.y = 115;
         }
      } else if (
         this.scene.cursors.right.isDown ||
         this.scene.keys.DKey.isDown
      ) {
         //right
         this.body.body.velocity.x = 75;
         this.body.body.velocity.y = -75;
         if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
            //right-up
            this.body.body.velocity.y = -115;
            this.body.body.velocity.x = 0;
         } else if (
            this.scene.cursors.down.isDown ||
            this.scene.keys.SKey.isDown
         ) {
            //right-down
            this.body.body.velocity.x = 115;
            this.body.body.velocity.y = 0;
         }
      } else if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
         //up
         this.body.body.velocity.x = -75;
         this.body.body.velocity.y = -75;
      } else if (
         this.scene.cursors.down.isDown ||
         this.scene.keys.SKey.isDown
      ) {
         //down
         this.body.body.velocity.x = 75;
         this.body.body.velocity.y = 75;
      }

      if (Phaser.Input.Keyboard.JustDown(this.scene.keys.spaceKey)&& this.jumps > 0) {
         this.body.body.velocity.z = 250;
         this.jumps--;
      }
   }
   driveControls() {
      if (Phaser.Input.Keyboard.JustDown(this.scene.keys.EKey) ) {
         console.log(this.body.isoY)
         if(this.body.isoX < -100 && this.body.isoY < 100){this.scene.pizza.body.destroy();
            create.pizza(this.scene);}
         // const closestCar = this.scene.isoPhysics.closestBody(
         //    this.body,
         //    this.scene.cars.children.entries
         // );
         // if (this.drive) {
         //    this.body.isoX = this.body.isoX + 100;
         //    this.body.isoY = this.body.isoY + 100;

         //    closestCar.body.enable = true;
         //    this.body.setVisible(true);
         //    this.shadow.setVisible(true);
         //    this.drive = false;
         //    closestCar.drive = false;
         //    this.car = null;
         //    if (this.scene.pizza.holder.name == 'car') {
         //       this.scene.pizza.holder = this.body;
         //    }
         // }
         // if (
         //    this.scene.isoPhysics.distanceBetween(this.body, closestCar.body) <=
         //    60
         // ) {
         //    closestCar.body.enable = false;
         //    this.body.setVisible(false);
         //    this.shadow.setVisible(false);
         //    this.drive = true;
         //    closestCar.drive = true;
         //    this.car = closestCar;
         //    if (this.scene.pizza.holder.name == 'player') {
         //       this.scene.pizza.holder = this.car.body;
         //    }
         // }
      }
   }
}

export default Player;
