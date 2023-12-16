import create from "../utils/creates.mjs";
class Pizza extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z) {
      super(scene, x, y, z);

      this.scene = scene;
      //modes
      this.speed = 1;
      this.holder = false;
      this.grab = false;
      this.slowed = false;
      //this.holder = this.scene.player.body;

      this.body = scene.add.isoSprite(-150, 100, 0);
      this.body.setScale(1.3);

      // this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = 1;
      this.body.body.collideWorldBounds = true;
      this.body.name='pizza'
      this.body.anims.play('pizza-up', true);
      this.body.body.drag.x = 200;
      this.body.body.drag.y = 200;

      this.body.body.bounce.set(0, 0, 0);
      // this.body.body.maxVelocity.set(500, 500, 500);
   }

   update() {
     
      if (this.scene.isoPhysics.distanceBetween(
         this.body,
         this.scene.player.body
      ) > 800) {
         this.body.destroy();
         create.pizza(this.scene);
         return;
      }
      //console.log(this.body.body)
      if(this.body.body.blocked.up || this.body.body.touching.up){
         this.body.destroy();
         create.pizza(this.scene);
      }else{
      if (this.holder && this.holder.body.holdingPizza == false){
         this.holder = false;
      }
      if(this.scene.player.modeMode && !this.slowed){
        
         this.body.body.velocity.x =  this.body.body.velocity.x * .05
         this.body.body.velocity.y =  this.body.body.velocity.y * .05
         this.body.body.velocity.z =  this.body.body.velocity.z * .05
         this.slowed == true;
       }else if(!this.scene.player.modeMode && this.slowed){
         this.body.body.velocity.x =  this.body.body.velocity.x / .05
         this.body.body.velocity.y =  this.body.body.velocity.y / .05
         this.body.body.velocity.z =  this.body.body.velocity.z / .05
         this.slowed == false;
       }
       
      if (this.holder ) {
         this.body.isoX = this.holder.isoX+15;
      this.body.isoY = this.holder.isoY +25;
      this.body.isoZ = this.holder.isoZ +25;
      
      this.body.rotation = 30;
      
      }else{
        // console.log(this);
       
         this.body.rotation = 0;
         
      }
   }
   }
   

}

export default Pizza;
