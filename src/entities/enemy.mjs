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

      this.shadow = scene.add.isoSprite(x, y, 1, 'gamer');
      this.body = scene.add.isoSprite(x, y, 1, 'gamer');

      this.shadow
         .setTintFill(0x000000)
         .setSize(15, 35)
         .setScale(2)
         .setOrigin(0.5, 1)
         .setAlpha(0.3)
         .setAngle(-65);
      this.shadow.scaleY = 1;
      // this.shadow.preFX.addBlur(1, 1, 1, 1, 0x000000);
      const color = this.body.preFX.addColorMatrix()
      color.hue(Phaser.Math.Between(0, 360));

      this.body.setSize(30, 60);
      this.body.setScale(2).setOrigin(0.5, 1);

      //this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.collideWorldBounds = true;
      this.body.body.bounce.set(1, 1, 0.2);
      this.body.anims.play('gamer-idle-front', true);
      this.body.body.drag.x = 200;
      this.body.body.drag.y = 200;
      //this.scene.physics.world.timeScale = 0.1

   }

   update() {
     if(this.scene.player.modeMode){
       this.body.anims.timeScale = 0.05
      this.speed = 0.05

     }else{
      this.body.anims.timeScale = 1
     }

      if (this.hit) {
         this.hitAnimations();
      } else{
         const distanceToPizza = this.scene.isoPhysics.distanceBetween(
            this.body,
            this.scene.pizza.body
         );
         if (distanceToPizza <= 300) {
            this.pathFinding();
         }
         if (distanceToPizza <= 200) {
            this.moveMethod = 'run';
            this.speed = 1.3;
         }else{
            this.moveMethod = 'walk';
            this.speed = .9; 
         }
   
         if (distanceToPizza <= 30 && !this.cooldown) {
            if(this.scene.pizza.holder.name == 'player'){
            this.hitPlayer();
            }
         }
         this.animations();
      }

      this.shadow.isoX = this.body.isoX - 5;
      this.shadow.isoY = this.body.isoY - 5;
      this.shadow.isoZ = 0;
      this.shadow.setScale(
         (1000 - Math.sqrt(this.body.isoZ * this.body.isoZ)) * 0.001
      );
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
         this.body.anims.play(`gamer-flip`, true);
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
      if (
         Math.sqrt(vel.x * vel.x) < 1 &&
         Math.sqrt(vel.y * vel.y) < 1 &&
         vel.z < 10 &&
         vel.z > -10
      ) {
         this.body.anims.play(`gamer-idle-${this.facing}`, true);
      }
      //down-left or down-right
      else if (
         (angle <= 135 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -45 && angle < 0)
      ) {
         if (vel.z > 10) {
            this.facing = 'front';
            this.body.anims.play('gamer-up-front', true);
         } else if (vel.z < -10) {
            this.facing = 'front';
            this.body.anims.play('gamer-down-front', true);
         } else {
            this.facing = 'front';
            this.body.anims.play(`gamer-${this.moveMethod}-front`, true);
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
            this.body.anims.play('gamer-up-rear', true);
         } else if (vel.z < -10) {
            this.facing = 'rear';
            this.body.anims.play('gamer-down-rear', true);
         } else {
            this.facing = 'rear';
            this.body.anims.play(`gamer-${this.moveMethod}-rear`, true);
         }
      }
      //up
      else if (angle < -112.5 && angle > -157.5) {
         if (vel.z > 10) {
            this.facing = 'rear';
            this.body.anims.play('gamer-up-rear', true);
         } else if (vel.z < -10) {
            this.facing = 'rear';
            this.body.anims.play('gamer-down-rear', true);
         } else {
            this.facing = 'rear';
            this.body.anims.play(`gamer-${this.moveMethod}-up`, true);
         }
      }
      //down
      else if (angle < 67.5 && angle > 22.5) {
         if (vel.z > 10) {
            this.facing = 'front';
            this.body.anims.play('gamer-up-front', true);
         } else if (vel.z < -10) {
            this.facing = 'front';
            this.body.anims.play('gamer-down-front', true);
         } else {
            this.facing = 'front';
            this.body.anims.play(`gamer-${this.moveMethod}-down`, true);
         }
      }
   }

   pathFinding() {
      if(this.scene.player.hit){
         this.moveMethod = 'walk';
            this.speed = .5; 
            
            
      }else{
          this.scene.isoPhysics.moveToObjectXY(
         this.body,
         this.scene.pizza.body,
         this.speed * 100
      );
      if (this.body.isoZ < 1) {
         this.body.body.velocity.z = 0;
      } else {
         this.body.body.velocity.z = -150;
      }
      }
     
   }
   hitPlayer() {
      this.cooldown = true;
      this.scene.hits.create(
         this.body.isoX,
         this.body.isoY,
         this.body.isoZ,
         this.facing
      );

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
