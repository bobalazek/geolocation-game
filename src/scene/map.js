function prepareMap() {
    prepareGround(0, 0); // center
    prepareGround(-1, 0); // left
    prepareGround(1, 0); // right
    prepareGround(0, 1); // top
    prepareGround(0, -1); // bottom
    prepareGround(-1, 1); // top left
    prepareGround(1, 1); // top right
    prepareGround(-1, -1); // bottom left
    prepareGround(1, -1); // bottom right
}

function prepareGround(x, z) {
    var x_min = -(GROUND_SIZE / 2) + (x * GROUND_SIZE);
    var x_max = (GROUND_SIZE / 2) + (x * GROUND_SIZE);
    var z_min = -(GROUND_SIZE / 2) + (z * GROUND_SIZE);
    var z_max = (GROUND_SIZE / 2) + (z * GROUND_SIZE);

    var ground = BABYLON.Mesh.CreateTiledGround(
        'ground.'+x+','+z,
        x_min, z_min,
        x_max, z_max,
        SUBDIVISIONS,
        PRECISION,
        scene
    );

    var verticesCount = ground.getTotalVertices();
    var tileIndicesLength = ground.getIndices().length / (SUBDIVISIONS.w * SUBDIVISIONS.h);

    ground.subMeshes = [];
    var index = 0;
    var base = 0;
    for (var row = 0; row < SUBDIVISIONS.h; row++) {
        for (var col = 0; col < SUBDIVISIONS.w; col++) {
            var submesh = new BABYLON.SubMesh(
                index++,
                0,
                verticesCount,
                base,
                tileIndicesLength,
                ground
            );
            ground.subMeshes.push(submesh);
            base += tileIndicesLength;
        }
    }

    map[x+','+z] = ground;
}

function prepareGroundMapImages() {
    for (var mapKey in map) {
        var mapKeySplitted = mapKey.split(',');
        prepareGroundMapImage(
            parseInt(mapKeySplitted[0]),
            parseInt(mapKeySplitted[1])
        );
    }
}

function prepareGroundMapImage(groundX, groundZ) {
    var ground = map[groundX+','+groundZ];

    if (ground.areImagesReady === true) {
        return ground;
    }

    var groundAssetsManager = new BABYLON.AssetsManager(scene);
    groundAssetsManager.useDefaultLoadingScreen = false;

    var multiMaterial = new BABYLON.MultiMaterial(
        'ground.'+groundX+','+groundZ+'.materials',
        scene
    );
    var tileOffsetX = centerTile.x + (groundX * SUBDIVISIONS.w);
    var tileOffsetY = centerTile.y + (groundZ * SUBDIVISIONS.h);

    for (var row = 0; row < SUBDIVISIONS.h; row++) {
        for (var col = 0; col < SUBDIVISIONS.w; col++) {
            var x = tileOffsetX + col - (SUBDIVISIONS.w / 2);
            var y = tileOffsetY - row + (SUBDIVISIONS.h / 2);

            var imageUrl = 'http://b.tile.openstreetmap.org/'+MAP_ZOOM+'/'+x+'/'+y+'.png';

            var textureTask = groundAssetsManager.addTextureTask(
                'ground.image.'+groundX+','+groundZ+'.material.'+row+','+col,
                imageUrl
            );
            textureTask.onSuccess = function(task) {
                var material = new BABYLON.StandardMaterial(
                    'ground.'+groundX+','+groundZ+'.material.'+row+','+col,
                    scene
                );
                material.diffuseTexture = task.texture;
                multiMaterial.subMaterials.push(material);
            };
        }
    }

    groundAssetsManager.load();
    groundAssetsManager.onFinish = function(tasks) {
        ground.areImagesReady = true;
        ground.material = multiMaterial;
    };

    return ground;
}
