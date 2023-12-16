class Arrow extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z) {
      super(scene, x, y, z);

      this.scene = scene;

      this.body = scene.add.isoSprite(-200, 90, 0, 'arrow');
      this.body.setSize(50, 50, 50);

      this.body.name = 'arrow';
   }

   update() {
      this.body.isoX = this.scene.player.body.isoX;
      this.body.isoY = this.scene.player.body.isoY;
      this.body.isoZ = this.scene.player.body.isoZ +60;

      let target;
      //console.log(this.scene.player.body.holdingPizza)
      if(!this.scene.player.body.holdingPizza){
         target = this.scene.isoPhysics.anglesToXYZ(
            this.scene.player.body,
            this.scene.pizza.body.isoX,
            this.scene.pizza.body.isoY,
            this.scene.pizza.body.isoZ
         ).theta
      }else{
         target = this.scene.isoPhysics.anglesToXYZ(
            this.scene.player.body,
            this.scene.patron.body.isoX,
            this.scene.patron.body.isoY,
            this.scene.patron.body.isoZ
         ).theta
      }

      const angle = Phaser.Math.RadToDeg(
         target
      );

      if (angle > 45 || angle < -135) {
         this.body.setFlipX(true);
      } else if (angle <= 45 && angle >= -135) {
         this.body.setFlipX(false);
      }
      //down-left or down-right
      if (
         (angle <= 112.5 && angle > 67.5) ||
         (angle < 22.5 && angle >= 0) ||
         (angle >= -22.5 && angle < 0)
      ) {
         this.body.anims.play('arrow-front', true);
      }
      //side
      else if (
         (angle <= 157.5 && angle > 112.5) ||
         (angle <= -22.5 && angle > -67.5)
      ) {
         this.body.anims.play('arrow-side', true);
      }
      //up-left or up-right
      else if (
         angle < -157.5 ||
         angle > 157.5 ||
         (angle > -112.5 && angle < -67.5)
      ) {
         this.body.anims.play('arrow-rear', true);
      }
      //up
      else if (angle < -112.5 && angle > -157.5) {
         this.body.anims.play('arrow-up', true);
      }
      //down
      else if (angle < 67.5 && angle > 22.5) {
         this.body.anims.play('arrow-down', true);
      
   }
}
}

export default Arrow;
