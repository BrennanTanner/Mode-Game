import create from '../utils/creates.mjs';

class Gamer extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y) {
      super(scene, x, y);

      this.scene = scene;
      //modes
      this.hit = false;
      this.invincible = false;
      this.cooldown = false;
      this.cooldownTime = 500;
      this.agroTime = 1000;
      this.agro = false;
      this.moveMethod = 'walk';
      this.speed = 1;
      this.facing = 'front';

      this.sprite = 'gamer';
      this.body = scene.add.isoSprite(x, y, 1, 'gamer');

      this.body.holdingPizza = false;
      const color = this.body.preFX.addColorMatrix();
      color.hue(Phaser.Math.Between(0, 360));

      this.body.setSize(15, 30);
      this.body.setOrigin(0.5, 1);

      //this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.collideWorldBounds = true;
      this.body.body.bounce.set(1, 1, 0.2);
      this.body.anims.play(`${this.sprite}-idle-front`, true);
      this.body.body.maxVelocity.set(500, 500, 500);

      this.body.name = 'gamer';
      //this.scene.physics.world.timeScale = 0.1
      //menu
      this.items = [
         {
            name: 'Gravity: On',
         },
         {
            name: 'Big Mode: Off',
         },
         {
            name: 'Car Mode: Off',
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
                           case 'Gravity: Off':
                              this.body.body.velocity.z =
                                 this.body.body.velocity.z + 2;
                              this.body.body.allowGravity =
                                 !this.body.body.allowGravity;

                              this.body.holdingPizza = false;

                              this.menu.children[0].children[2].setText(
                                 'Gravity: On'
                              );
                              this.items[0].name = 'Gravity: On';
                              break;
                           case 'Gravity: On':
                              this.body.body.velocity.z =
                                 this.body.body.velocity.z + 2;
                              this.body.body.allowGravity =
                                 !this.body.body.allowGravity;
                              this.menu.children[0].children[2].setText(
                                 'Gravity: Off'
                              );
                              this.items[0].name = 'Gravity: Off';
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
                  outlineColor: 0xfe5f03,
               });
            }
         })
         .on('pointerout', () => {
            this.scene.postFxPlugin.remove(this.body);
         });
   }

   update() {
      const distance = this.scene.isoPhysics.distanceBetween(
         this.body,
         this.scene.player.body
      );
      if (distance > 550) {
         this.body.enable = false;
         this.setVisible(false);
      } else {
         this.body.enable = true;
         this.setVisible(true);
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
         if (this.scene.player.modeMode) {
            this.body.anims.timeScale = 0.1;
            this.speed = 0.1;
         } else {
            this.body.anims.timeScale = 1;
         }

         if (this.hit) {
            this.hitAnimations();
         } else {
            const distanceToPizza = this.scene.isoPhysics.distanceBetween(
               this.body,
               this.scene.pizza.holder
                  ? this.scene.pizza.holder
                  : this.scene.pizza.body
            );

            if (this.body.body.blocked.down && this.body.body.allowGravity) {
               if (distanceToPizza <= 300) {
                  this.pathFinding();
               } else {
                  if (
                     this.body.body.velocity.x == 0 &&
                     this.body.body.velocity.y == 0
                  ) {
                     const sp = Phaser.Math.Between(10, 50);
                     const left = Phaser.Math.Between(0, 1);
                     this.body.body.velocity.x =
                        left == 1 ? this.speed * sp : 0;
                     this.body.body.velocity.y =
                        left == 1 ? 0 : this.speed * sp;
                  }
               }
               if (distanceToPizza <= 200) {
                  this.moveMethod = 'run';
                  this.speed = 1.3;
               } else {
                  this.moveMethod = 'walk';
                  this.speed = 0.9;
               }

               if (distanceToPizza <= 30 && !this.cooldown) {
                  if (this.scene.pizza.holder.name == 'player') {
                     this.hitPlayer();
                  }
               }
            } else if (this.body.body.blocked.up) {
               this.destroy();
               return;
            }
            this.animations();
         }
      }
   }
   hitAnimations() {
      this.body.body.bounce.set(0, 0, 0.4);
      const vel = this.body.body.velocity;
      if (vel.z < 5 && vel.z > -5) {
         this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
               this.hit = false;
               this.body.body.bounce.set(0, 0, 0);
            },
            callbackScope: this.scene,
         });
         this.body.anims.play(`${this.sprite}-flip`, true);
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
         if (this.sprite == 'gamer') {
            this.body.setFlipX(true);
         } else {
            this.body.setFlipX(false);
         }
      } else if (angle <= 45 && angle >= -135) {
         if (this.sprite == 'gamer') {
            this.body.setFlipX(false);
         } else {
            this.body.setFlipX(true);
         }
      }
      //idle
      if (
         Math.sqrt(vel.x * vel.x) < 1 &&
         Math.sqrt(vel.y * vel.y) < 1 &&
         vel.z < 10 &&
         vel.z > -10
      ) {
         this.body.anims.play(`${this.sprite}-idle-${this.facing}`, true);
      }
      //down-left or down-right
      else if (
         (angle <= 135 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -45 && angle < 0)
      ) {
         if (!this.body.body.allowGravity) {
            this.body.anims.play(`${this.sprite}-flip-front`, true);
         } else if (vel.z > 2) {
            this.facing = 'front';
            this.body.anims.play(`${this.sprite}-up-front`, true);
         } else if (vel.z < -5) {
            this.facing = 'front';
            this.body.anims.play(`${this.sprite}-down-front`, true);
         } else {
            this.facing = 'front';
            this.body.anims.play(
               `${this.sprite}-${this.moveMethod}-front`,
               true
            );
         }
      }
      //up-left or up-right
      else if (
         angle < -157.5 ||
         angle > 135 ||
         (angle > -112.5 && angle < -45)
      ) {
         if (!this.body.body.allowGravity) {
            this.body.anims.play(`${this.sprite}-flip-rear`, true);
         } else if (vel.z > 2) {
            this.facing = 'rear';
            this.body.anims.play(`${this.sprite}-up-rear`, true);
         } else if (vel.z < -5) {
            this.facing = 'rear';
            this.body.anims.play(`${this.sprite}-down-rear`, true);
         } else {
            this.facing = 'rear';
            this.body.anims.play(
               `${this.sprite}-${this.moveMethod}-rear`,
               true
            );
         }
      }
      //up
      else if (angle < -112.5 && angle > -157.5) {
         if (!this.body.body.allowGravity) {
            this.body.anims.play(`${this.sprite}-flip-rear`, true);
         } else if (vel.z > 2) {
            this.facing = 'rear';
            this.body.anims.play(`${this.sprite}-up-rear`, true);
         } else if (vel.z < -5) {
            this.facing = 'rear';
            this.body.anims.play(`${this.sprite}-down-rear`, true);
         } else {
            this.facing = 'rear';
            this.body.anims.play(`${this.sprite}-${this.moveMethod}-up`, true);
         }
      }
      //down
      else if (angle < 67.5 && angle > 22.5) {
         if (!this.body.body.allowGravity) {
            this.body.anims.play(`${this.sprite}-flip-front`, true);
         } else if (vel.z > 2) {
            this.facing = 'front';
            this.body.anims.play(`${this.sprite}-up-front`, true);
         } else if (vel.z < -5) {
            this.facing = 'front';
            this.body.anims.play(`${this.sprite}-down-front`, true);
         } else {
            this.facing = 'front';
            this.body.anims.play(
               `${this.sprite}-${this.moveMethod}-down`,
               true
            );
         }
      }
   }

   pathFinding() {
      // console.log(this.body.body.touching)
      if (this.body.body.z < 1)
         if (this.scene.player.hit) {
            this.moveMethod = 'walk';
            this.speed = this.speed * 0.5;
         } else {
            if(this.body.holdingPizza){
               this.scene.isoPhysics.moveToObjectXY(
                  this.body,
                  this.scene.player.body,
                  -this.speed * 50
               );
            }else{
            this.scene.isoPhysics.moveToObjectXY(
               this.body,
               this.scene.pizza.holder
                  ? this.scene.pizza.holder
                  : this.scene.pizza.body,
               this.speed * 50
            );
            }
            // if (this.body.isoZ < 1) {
            //    this.body.body.velocity.z = 0;
            // } else {
            //    this.body.body.velocity.z = -150;
            // }
         }
   }
   hitPlayer() {
      console.log(this);
      this.cooldown = true;
      this.scene.hits.create(this.body.isoX, this.body.isoY, this.body.isoZ, {
         facing: this.facing,
         scale: this.body.scale,
      });

      this.scene.time.addEvent({
         delay: this.cooldownTime,
         callback: () => {
            this.cooldown = false;
         },
         callbackScope: this.scene,
      });
   }
}

export default Gamer;
