class Hit extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z, facing) {
      super(scene, x, y, z);


      this.scene = scene;
      //modes
      this.invincible = false;

      this.body = scene.add.isoSprite(x, y, z);
      this.body.setSize(50, 50, 50).setScale(2);
      if(facing == "front"){
         this.setSize(100, 100).setScale(2).setOrigin(.5, 0).setPosition(this.body.x,this.body.y-60).setDepth(scene.player.body.depth+1);
         this.z = 2000;
      } else {
         this.setSize(100, 100).setScale(2).setOrigin(.5, 0).setPosition(this.body.x,this.body.y).setDepth(scene.player.body.depth-1).setRotation(3);
      }

      
      // this.body.anims.timeScale = 0.5
      scene.isoPhysics.world.enable(this.body);
      this.body.body.mass = 2
      this.body.body.immovable = true;
      this.body.body.allowGravity = false;

      this.hasHit = false;

      this.play('hit-swipe', true);
      this.once('animationcomplete', () => {
        this.destroy();
      });
   }

   update(){
      if(!this.hasHit){
      this.scene.isoPhysics.moveToObject(
         this.body,
         this.scene.player.body,
         300
      );
      }else{
         this.body.body.velocity.x = 0
         this.body.body.velocity.y = 0
         this.body.body.velocity.z = 0
      }
      }
delete(){
   this.destroy();
}
}

export default Hit;