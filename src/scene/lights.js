function prepareLights() {
    light = new BABYLON.HemisphericLight(
        'lights.hemispheric',
        new BABYLON.Vector3(0, 32, 0),
        scene
    );
    light.intensity = .75;

    lights.hemispheric = light;

    return lights;
}
