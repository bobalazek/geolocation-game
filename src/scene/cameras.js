function prepareCameras() {
    // Observer
    camera = new BABYLON.FreeCamera('cameras.observer', new BABYLON.Vector3(0, 5, -15), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    cameras.observer = camera;

    return cameras;
}
