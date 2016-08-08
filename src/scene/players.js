function preparePlayers() {
    preparePlayerMyself();

    // Animate the movement
    scene.registerBeforeRender(function () {
        if (players) {
            for (var i in players) {
                players[i].move();
                // to-do: check if we need to load new ground tiles
            }
        }
    });

    var clickPoint = BABYLON.MeshBuilder.CreateCylinder('clickPoint', {
        height: 0.01,
        diameter: 4,
        faceColors: [
            BABYLON.Color4.FromHexString('#00BFFFFF'),
            BABYLON.Color4.FromHexString('#00BFFFFF'),
            BABYLON.Color4.FromHexString('#00BFFFFF'),
        ]
    }, scene);
    clickPoint.position.y = -0.01;
    scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit) {
            clickPoint.position = pickResult.pickedPoint;
            clickPoint.position.y = 0;

            setTimeout(function() {
                clickPoint.position.y = -0.01;
            }, 1000);
        }
    };

    return players;
}

/**
 * Prepare own player
 */
function preparePlayerMyself() {
    if (playerMyself) {
        return playerMyself;
    }

    playerMyself = createPlayer(
        centerCoordinates,
        0
    );
    players.push(playerMyself);

    // Camera
    preparePlayerMyselfCamera();

    return playerMyself;
}

/**
 * Prepare the camera for the player
 */
function preparePlayerMyselfCamera() {
    camera.dispose(); // Remove the existing camera

    var alpha = degreesToRadians(270);
    var beta = degreesToRadians(75);
    var radius = 16;
    var radiusUpper = 48;

    camera = new BABYLON.ArcRotateCamera(
        'cameras.myself',
        alpha,
        beta,
        radius,
        playerMyself.position,
        scene
    );
    camera.lowerBetaLimit = beta;
    camera.upperBetaLimit = beta;
    camera.lowerRadiusLimit = radius;
    camera.upperRadiusLimit = radiusUpper;
    camera.attachControl(canvas, false);

    cameras.myself = camera;

    scene.registerBeforeRender(function () {
        if (ui.compassImage) {
            ui.compassImage.rotation = (camera.alpha - alpha) * -1;
        }
    });

    return camera;
}

/**
 * Create a new player
 */
function createPlayer(coordinates, id) {
    var player = meshes.player.clone('player.'+id);
    player.isVisible = true;

    // Skeleton
    player.skeleton = skeletons.player.clone('player.skeleton.'+id);

    // Offset
    var offset = coordinatesToPosition(coordinates);
    player.position.x += offset.x;
    player.position.z += offset.z;

    // Animation & moving preparation
    player.speed = 0;
    player.heading = 0;
    player.positionTarget = null;
    player.positionTargetDifference = null;

    // Coordinates & stuff
    player.coordinatesHistoryLimit = 10;
    player.coordinatesHistory = [];

    // Methods
    player.calculateStuff = function() {
        var coordinatesCurrent = player.coordinatesHistory[0];
        var coordinatesPrevious = player.coordinatesHistory[1];
        var speed = 0;
        var heading = 0;

        // Speed & heading
        if (coordinatesCurrent) {
            if (coordinatesCurrent.position.coords.speed !== null) {
                speed = coordinatesCurrent.position.coords.speed;
            }

            if (coordinatesCurrent.position.coords.heading !== null) {
                heading = coordinatesCurrent.position.coords.heading;
            }
        }

        if (coordinatesPrevious) {
            var timeDifference = coordinatesCurrent.position.timestamp - coordinatesPrevious.position.timestamp;

            if (coordinatesCurrent.position.coords.speed !== null) {
                speed = coordinatesCurrent.position.coords.speed;
            } else {
                var distance = geolocationDistance(
                    coordinatesCurrent.coordinates.lat,
                    coordinatesCurrent.coordinates.lng,
                    coordinatesPrevious.coordinates.lat,
                    coordinatesPrevious.coordinates.lng
                );
                speed = distance / (timeDifference / 1000); // meters per second
            }

            if (coordinatesCurrent.position.coords.heading !== null) {
                heading = coordinatesCurrent.position.coords.heading;
            }
        }

        if (player.positionTarget) {
            var playerX = player.position.x;
            var playerZ = player.position.z;
            var playerTargetX = player.positionTarget.x;
            var playerTargetZ = player.positionTarget.z;
            var differenceX = playerX - playerTargetX;
            var differenceZ = playerZ - playerTargetZ;

            // set the heading only if none were given
            if (coordinatesCurrent.position.coords.heading === null) {
                var angle = Math.atan2(
                    differenceZ,
                    differenceX
                ) * 180 / Math.PI;
                heading = 360 - ((angle + 360) % 360) - 90;
                // to-do: fix it
            }

            player.positionTargetDifference = {
                x: differenceX,
                z: differenceZ,
            };
        }

        // fix if the speed is too low
        if (
            speed < 5 &&
            player.positionTarget != null
        ) {
            speed = 5;
        }

        player.speed = speed;
        player.heading = heading;

        return player;
    };

    player.addCoordinates = function(coordinates) {
        // prevent double saving the same coordinates
        var lastCoordinates = player.coordinatesHistory[0]
            ? player.coordinatesHistory[0]
            : null
        ;
        // prevent duplicate coordinates and coordinates that changed less than 50ms ago
        if (
            (
                lastCoordinates &&
                coordinates.position.timestamp == lastCoordinates.position.timestamp
            ) ||
            (
                lastCoordinates &&
                coordinates.position.timestamp - lastCoordinates.position.timestamp < 50
            )
        ) {
            return player.coordinatesHistory;
        }

        player.coordinatesHistory.unshift(coordinates);
        player.coordinatesHistory = player.coordinatesHistory.slice(
            0,
            player.coordinatesHistoryLimit
        );

        return player.coordinatesHistory;
    };

    player.playAnimation = function(animation) {
        if (player.currentAnimation == animation) {
            return true;
        }

        if (animation == 'walk') {
            // walk
            var fromKeyframe = 0;
            var toKeyframe = 33;

            player.currentAnimation = 'walk';
        } else if (animation == 'run') {
            // run
            var fromKeyframe = 36;
            var toKeyframe = 54;

            player.currentAnimation = 'run';
        } else {
            // idle
            var fromKeyframe = 55;
            var toKeyframe = 290;

            player.currentAnimation = 'idle';
            player.speed = 0;
        }

        var playerAnimation = scene.beginAnimation(
            player.skeleton,
            fromKeyframe,
            toKeyframe,
            true
        );
        playerAnimation.enableBlending = true;
        playerAnimation.blendingSpeed = 0.05;

        return true;
    };

    player.move = function() {
        player.calculateStuff();

        if (
            player.positionTarget === null ||
            player.positionTargetDifference === null
        ) {
            return;
        }

        var metersPerPixel = 0.596; // to-do: we may rather use the formula; this value is for zoom level 18; http://wiki.openstreetmap.org/wiki/Zoom_levels
        var metersPerMapUnit = metersPerPixel / (256 / TILE_SIZE);
        var deltaTime = engine.getDeltaTime() / 1000; // convert to seconds
        var distance = player.speed * deltaTime; // the distance you have reached with this speed (in meters per second)
        var distanceX = metersPerMapUnit * distance;
        var distanceZ = metersPerMapUnit * distance;

        // fixes the "flickering"
        if (distanceX > Math.abs(player.positionTargetDifference.x)) {
            distanceX = Math.abs(player.positionTargetDifference.x);
        }
        if (distanceZ > Math.abs(player.positionTargetDifference.z)) {
            distanceZ = Math.abs(player.positionTargetDifference.z);
        }

        if (player.positionTargetDifference.x < 0) {
            distanceX *= -1;
        }
        if (player.positionTargetDifference.z < 0) {
            distanceZ *= -1;
        }

        player.position.x = player.position.x - distanceX;
        player.position.z = player.position.z - distanceZ;
        player.rotation.y = degreesToRadians(player.heading);

        var playerAnimation = player.speed > 10 ? 'run' : 'walk';
        if (player.currentAnimation != playerAnimation) {
            player.playAnimation(playerAnimation);
        }

        if (
            Math.abs(player.positionTargetDifference.x) < 0.1 &&
            Math.abs(player.positionTargetDifference.z) < 0.1
        ) {
            player.positionTarget = null;
            player.positionTargetDifference = null;
            player.speed = 0;
            player.playAnimation('idle');
            return;
        }

        return player;
    };

    // Run the default idle animation when the user spawns
    player.playAnimation('idle');

    return player;
}

/********** Events **********/
// When geolocation changes, the character should move!
$(document).on('geolocationchange', onGeolocationChangeEvent);

function onGeolocationChangeEvent(e, opts) {
    var detail = opts.detail;
    if (playerMyself) {
        var playerMyselfPosition = coordinatesToPosition(
            currentCoordinates
        );
        playerMyself.addCoordinates(detail);

        if (detail.initial) {
            // Just spawn the user here
            playerMyself.position.x = playerMyselfPosition.x;
            playerMyself.position.z = playerMyselfPosition.z;
        } else {
            playerMyself.positionTarget = {
                x: playerMyselfPosition.x,
                z: playerMyselfPosition.z,
            }
        }
    }
}

/********** Helpers **********/
/**
 * Offset on the center tile
 */
function tilePositionOffset(coordinates) {
    var x = lng2tile(coordinates.lng, MAP_ZOOM, true);
    var z = lat2tile(coordinates.lat, MAP_ZOOM, true);
    var xOffset = x - Math.floor(x);
    var zOffset = 1 - (z - Math.floor(z));
    return {
        x: xOffset * TILE_SIZE,
        z: zOffset * TILE_SIZE,
    };
}

/**
 * Convert the GPS coordinates to position on our map
 */
function coordinatesToPosition(coordinates) {
    // Get the offset on the initial / base tile
    var centerPositionOffset = tilePositionOffset(centerCoordinates);

    // Get the tile for that coordinates
    var coordinatesTile = {
        x: lng2tile(coordinates.lng, MAP_ZOOM),
        y: lat2tile(coordinates.lat, MAP_ZOOM),
    };
    // Get the offset on that tile (for that coordinates)
    var coordinatesOffset = tilePositionOffset(coordinates);

    var x = coordinatesOffset.x + (
        ((centerTile.x - coordinatesTile.x) * -1) * TILE_SIZE
    );
    var z = coordinatesOffset.z + (
        (centerTile.y - coordinatesTile.y) * TILE_SIZE
    );

    return {
        x: x,
        z: z,
    };
}
