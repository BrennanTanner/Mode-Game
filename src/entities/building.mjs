class Building extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, z, frame) {
      super(scene, x, y, z);

      this.scene = scene;
      //modes
      this.body = scene.add.isoSprite(x, y, z, 'building_sheet');

      this.body.setOrigin(0.5, 0);
      //this.body.setSize(0, 0);

      this.body.setSize(260, 200)
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

      this.body.debugRender(this.scene.graphics);
      this.scene.graphics.clear();

      if (
         this.alpha > 0.2 &&
         this.scene.isoPhysics.distanceBetween(this, this.scene.player.body) <
            200 &&
         (this.scene.isoPhysics.anglesToXYZ(
            this,
            this.scene.player.body.isoX,
            this.scene.player.body.isoY,
            this.scene.player.body.isoZ
         ).theta < 0 ||
            this.scene.isoPhysics.anglesToXYZ(
               this,
               this.scene.player.body.isoX,
               this.scene.player.body.isoY,
               this.scene.player.body.isoZ
            ).theta > 1.8)
      ) {
         this.setAlpha((this.alpha -= 0.05));
      } else {
         this.setAlpha((this.alpha += 0.05));
      }
   }
   // else{
   //    this.setAlpha(this.alpha += .05);
   //   }
}

export default Building;
