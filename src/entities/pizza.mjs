class Pizza extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z) {
      super(scene, x, y, z);

      this.scene = scene;
      //modes
      this.speed = 1;
      this.holder = false;
      //this.holder = this.scene.player.body;

      this.body = scene.add.isoSprite(10, 16, 100);
      this.body.setScale(2.5);

      // this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = .5;
      this.body.body.collideWorldBounds = true;
      this.body.name='pizza'
      this.body.anims.play('pizza-up', true);
      this.body.body.drag.x = 200;
      this.body.body.drag.y = 200;
      this.body.body.bounce.set(0, 0, 0);
   }

   update() {
      
      // if(this.scene.player.modeMode){
        
      //    this.body.body.velocity.x =  this.body.body.velocity.x * .05
      //    this.body.body.velocity.y =  this.body.body.velocity.y * .05
      //    this.body.body.velocity.z =  this.body.body.velocity.z * .05
      //  }else{
      //    this.body.body.velocity.x =  this.body.body.velocity.x / .05
      //    this.body.body.velocity.y =  this.body.body.velocity.y / .05
      //    this.body.body.velocity.z =  this.body.body.velocity.z / .05
      //  }
      if (this.holder) {
       
         this.body.isoX = this.holder.isoX;
      this.body.isoY = this.holder.isoY + 25;
      this.body.isoZ = this.holder.isoZ +25;
      this.body.rotation = 30;
      }else{
        // console.log(this);
         this.body.rotation = 0;
      }
   }
   

}

export default Pizza;
