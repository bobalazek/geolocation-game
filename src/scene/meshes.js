function prepareMeshes() {
    /********** Player **********/
    var playerMeshTask = assetsManager.addMeshTask(
        'tasks.meshes.player',
        '',
        'assets/meshes/player/',
        'player.babylon'
    );
    playerMeshTask.onSuccess = function (task) {
        /***** Mesh *****/
        var playerMesh = task.loadedMeshes[0];
        playerMesh.isVisible = false;
        playerMesh.scaling = new BABYLON.Vector3(.25, .25, .25);
        playerMesh.position.y = 0;
        meshes.player = playerMesh;

        /***** keleton *****/
        skeletons.player = task.loadedSkeletons[0];
    };
}
