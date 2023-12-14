class Hit extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z, facing) {
      super(scene, x, y, z);


      this.scene = scene;
      //modes
      this.speed = 1;
      this.invincible = false;
this.hasHit = false;
      this.body = scene.add.isoSprite(x, y, z);
      this.body.setSize(50, 50, 50);
      if(facing == "front"){
         this.setSize(100, 100, 30).setOrigin(.5, 0).setPosition(this.body.x,this.body.y-60).setDepth(scene.player.body.depth+1);
         this.z = 2000;
      } else {
         this.setSize(100, 100, 30).setOrigin(.5, 0).setPosition(this.body.x,this.body.y).setDepth(scene.player.body.depth-1).setRotation(3);
      }

      
      // this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = 2
      this.body.body.immovable = true;
      this.body.body.allowGravity = false;

      this.hasHit = false;
      this.body.name='hit'
      this.play('hit-swipe', true);
      this.once('animationcomplete', () => {
        this.destroy();
      });
   }

   update(){
      if(this.scene.player.modeMode){
         this.timeScale = 0.05
        this.speed = 0.05
  
       }else{
         this.speed = 1
        this.body.anims.timeScale = 1
       }


      if(!this.hasHit){
      this.scene.isoPhysics.moveToObject(
         this.body,
         this.scene.player.body,
         this.speed*200
      );
    
      const angle = this.scene.isoPhysics.anglesToXYZ(this.body, this.scene.player.body.isoX, this.scene.player.body.isoY, this.scene.player.body.isoZ+30)

      const newVel = this.scene.isoPhysics.velocityFromAngles(angle.theta, angle.phi, 300*this.speed)

      this.scene.player.body.body.velocity =newVel
    

         this.hasHit = true;
      }
      }
delete(){
   this.destroy();
}


}

export default Hit;
