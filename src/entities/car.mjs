class Car extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z,) {
      super(scene, x, y, z);
      this.scene = scene;


      //modes
      this.speed = 1;
      this.invincible = false;
      this.drive = false;
      this.visible=false;
console.log(this);
      this.body = scene.add.isoSprite(x, y, z);
      this.body.setScale(3).setSize(100, 80, 20);

      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = 5;
      this.body.body.immovable = true;
      this.body.body.collideWorldBounds = true;
      this.body.body.drag.x = 300;
      this.body.body.drag.y = 300;
      this.body.body.bounce.set(0, 0, 0.1);

      this.body.name='car';
      this.body.anims.play('car-front', true);

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
   
      }
}

export default Car;
