function prepareSkysphere() {
    // to-do: take time into account (when night, the skydome should be dark)
    skysphere = BABYLON.Mesh.CreateSphere('skysphere', 8, SKYSPHERE_SIZE, scene);
    var shader = new BABYLON.ShaderMaterial('gradient', scene, 'gradient', {});
    shader.setFloat('offset', 0);
    shader.setFloat('exponent', 0.6);
    shader.setColor3('topColor', BABYLON.Color3.FromInts(0, 119, 255));
    shader.setColor3('bottomColor', BABYLON.Color3.FromInts(240, 240, 255));
    shader.backFaceCulling = false;
    skysphere.material = shader;

    // The skysphere should always follow the player
    scene.registerBeforeRender(function(theScene) {
        if (playerMyself) {
            skysphere.position = playerMyself.position;
        }
    });

    return skysphere;
}
