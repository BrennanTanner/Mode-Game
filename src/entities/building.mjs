class Building extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z, frame) {
      super(scene, x, y, z);

      this.scene = scene;
      //modes
      this.body = scene.add.isoSprite(x, y, z, 'building_sheet');

      this.body.setOrigin(0.5, 0);
      //this.body.setSize(0, 0);

      this.body.setSize(260, 220);
      scene.isoPhysics.world.enable(this.body);
      this.body.body.collideWorldBounds = true;
      this.body.body.immovable = true;
      this.body.body.allowGravity = false;
      this.scene.buildings.add(this.body);

      this.body.update = this.isPlayerBehind;

      this.body.setFrame(frame);

      // this.body.postFX.addGlow('#fff', );
   }

   update(scene) {
      this.isPlayerBehind(scene);
   }

   isPlayerBehind() {
      //console.log(this.scene.player);
      // console.log(this.scene.isoPhysics.distanceToCamera(this));
      // const angle = this.scene.isoPhysics.anglesToXYZ(this, this.scene.player.body.isoX,
      //    this.scene.player.body.isoY,
      //    this.scene.player.body.isoZ-1000)

      //    console.log(angle.theta/angle.phi)
      //    this.scene.isoPhysics.anglesToXYZ(this, this.scene.isoPhysics,
      //       this.scene.player.body.isoY,
      //       this.scene.player.body.isoZ)

      const distance = this.scene.isoPhysics.distanceToCamera(this)

      if (distance > 550) {
         this.body.enable = false;
         this.setVisible(false);
      } else {
         this.body.enable = true;
         this.setVisible(true);
         if (
            distance < 160 && this.alpha> 0.2
         ) {
            this.setAlpha((this.alpha -= 0.05));
         } else {
             this.setAlpha((this.alpha += 0.05));
         }
      }
   }
   // else{
   //    this.setAlpha(this.alpha += .05);
   //   }
}

export default Building;
