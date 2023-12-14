class Car extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z,) {
      super(scene, x, y, z);
      this.scene = scene;


      //modes
      this.speed = 1;
      this.invincible = false;
      this.drive = false;

      this.body = scene.add.isoSprite(x, y, z);
      this.body.setScale(1.5).setSize(40, 40, 20);

      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = 5;
      this.body.body.immovable = true;
      this.body.body.collideWorldBounds = true;
      this.body.body.drag.x = 300;
      this.body.body.drag.y = 300;
      this.body.body.bounce.set(0, 0, 0.1);

      this.body.name='car';
      this.body.anims.play('car-front', true);

      this.body
         .setInteractive()
         .on("pointerover",  ()=> {
           // Add postfx pipeline
           this.scene.postFxPlugin.add(this.body, {
             thickness: 3,
             outlineColor: 0xff8a50
           });
         })
         .on("pointerout", function () {
           // Remove all outline post-fx pipelines
           this.scene.postFxPlugin.remove(this);
         });
   }

   update(){
      if (this.drive){
         this.runControls();
         this.animations();
      }
     
      if(this.scene.player.modeMode){
         this.timeScale = 0.05
        this.speed = 0.05
  
       }else{
         this.speed = 1
        this.body.anims.timeScale = 1
       }

      }

      animations() {
         const vel = this.body.body.velocity;
         const angle = Phaser.Math.RadToDeg(this.body.body.angle);
         //this.shadow.anims.play(this.body.anims.currentAnim.key, true);
   
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
            //console.log('1');
            if (vel.z > 10) {
               this.body.anims.play('car-up-front', true);
            } else if (vel.z < -10) {
               this.body.anims.play('car-down-front', true);
            } else {
               this.body.anims.play('car-front', true);
            }
         }
         //side
         else if (
            (angle <= 157.5 && angle > 112.5) || (angle <= -22.5 && angle > -67.5)
         ) {
         
            if (vel.z > 10) {
               this.body.setRotation(30)
            } else if (vel.z < -10) {
               this.body.setRotation(-30)
            } else {
               this.body.anims.play('car-side', true);
            }
         }
         //up-left or up-right
         else if (
            angle < -157.5 ||
            angle > 157.5 ||
            (angle > -112.5 && angle < -67.5)
         ) {
            //console.log('2');
            if (vel.z > 10) {
               this.body.anims.play('car-up-rear', true);
            } else if (vel.z < -10) {
               this.body.anims.play('car-down-rear', true);
            } else {
               this.body.anims.play('car-rear', true);
            }
         }
         //up
         else if (angle < -112.5 && angle > -157.5) {
            //console.log('3');
            if (vel.z > 10) {
               this.body.anims.play('car-up-rear', true);
            } else if (vel.z < -10) {
               this.body.anims.play('car-down-rear', true);
            } else {
               this.body.anims.play('car-up', true);
            }
         }
         //down
         else if (angle < 67.5 && angle > 22.5) {
            //console.log('4');
            if (vel.z > 10) {
               this.body.anims.play('car-up-front', true);
            } else if (vel.z < -10) {
               this.body.anims.play('car-down-front', true);
            } else {
               this.body.anims.play('car-down', true);
            }
         }
   
      }

      runControls() {
         this.body.body.velocity.y = 0;
         this.body.body.velocity.x = 0;
         if (this.scene.cursors.left.isDown || this.scene.keys.AKey.isDown) {
            //left
            this.body.body.velocity.y = 300;
            this.body.body.velocity.x = -300;
   
            if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
               //left-up
               this.body.body.velocity.x = -450;
               this.body.body.velocity.y = 0;
            } else if (this.scene.cursors.down.isDown || this.scene.keys.SKey.isDown) {
               //left-down
               this.body.body.velocity.x = 0;
               this.body.body.velocity.y = 450;
            }
         } else if (this.scene.cursors.right.isDown || this.scene.keys.DKey.isDown) {
            //right
            this.body.body.velocity.x = 300;
            this.body.body.velocity.y = -300;
            if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
               //right-up
               this.body.body.velocity.y = -450;
               this.body.body.velocity.x = 0;
            } else if (this.scene.cursors.down.isDown || this.scene.keys.SKey.isDown) {
               //right-down
               this.body.body.velocity.x = 450;
               this.body.body.velocity.y = 0;
            }
         } else if (this.scene.cursors.up.isDown || this.scene.keys.WKey.isDown) {
            //up
            this.body.body.velocity.x = -300;
            this.body.body.velocity.y = -300;
         } else if (this.scene.cursors.down.isDown || this.scene.keys.SKey.isDown) {
            //down
            this.body.body.velocity.x = 300;
            this.body.body.velocity.y = 300;
         }
   
      }
}

export default Car;
