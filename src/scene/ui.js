function prepareUi() {
    if (SHOW_UI_DEBUG) {
        prepareUiDebug();
    }

    prepareUiCompass();
    prepareUiPlayerInfo();
    prepareUiPreloader();
}

var padding = 10 * DPR;
var fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
var fontNameXs = (12 * DPR)+'px '+fontFamily;
var fontNameSm = (16 * DPR)+'px '+fontFamily;
var fontNameMd = (24 * DPR)+'px '+fontFamily;
var fontNameLg = (48 * DPR)+'px '+fontFamily;

function fontNameCustom(px) {
    return (px * DPR)+'px '+fontFamily;
}

/********** Debug **********/
function prepareUiDebug() {
    var size = 128 * DPR;
    var x = padding;
    var y = window.innerHeight * DPR - size - padding;

    if (!ui.debugCanvas) {
        ui.debugCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
            id: 'debug.canvas',
            x: x,
            y: y,
        });

        if (!ui.debugPlayerSpeed) {
            // Speed
            ui.debugPlayerSpeed = new BABYLON.Text2D('Speed: 0', {
                id: 'debug.speed',
                x: 0,
                y: 0,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        if (!ui.debugPlayerHeading) {
            // Heading
            ui.debugPlayerHeading = new BABYLON.Text2D('Heading: 0', {
                id: 'debug.heading',
                x: 0,
                y: 16 * DPR,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        if (!ui.debugPlayerPosition) {
            // Position
            ui.debugPlayerPosition = new BABYLON.Text2D('Position: 0,0', {
                id: 'debug.position',
                x: 0,
                y: 32 * DPR,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        if (!ui.debugPlayerPositionTarget) {
            // Position target
            ui.debugPlayerPositionTarget = new BABYLON.Text2D('Position target: null', {
                id: 'debug.positionTarget',
                x: 0,
                y: 48 * DPR,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        if (!ui.debugPlayerPositionTargetDifference) {
            // Position target difference
            ui.debugPlayerPositionTargetDifference = new BABYLON.Text2D('Position target difference: null', {
                id: 'debug.positionTargetDifference',
                x: 0,
                y: 64 * DPR,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        if (!ui.debugPlayerCoordinatesTarget) {
            // Position target
            ui.debugPlayerPositionTarget = new BABYLON.Text2D('Coordinates target: null', {
                id: 'debug.coordinatesTarget',
                x: 0,
                y: 80 * DPR,
                fontName: fontNameSm,
                defaultFontColor: BABYLON.Color4.FromHexString('#000000FF'),
                parent: ui.debugCanvas,
            });
        }

        scene.registerBeforeRender(function () {
            if (playerMyself) {
                ui.debugPlayerSpeed.text = 'Speed: '+(
                    playerMyself.speed
                );
                ui.debugPlayerHeading.text = 'Heading: '+(
                    playerMyself.heading
                );
                ui.debugPlayerPosition.text = 'Position: '+(
                    playerMyself.position.x+','+playerMyself.position.z
                );
                ui.debugPlayerPositionTarget.text = 'Position target: '+(
                    playerMyself.positionTarget === null
                        ? 'null'
                        : playerMyself.positionTarget.x+','+playerMyself.positionTarget.z
                );
                ui.debugPlayerPositionTargetDifference.text = 'Position target difference: '+(
                    playerMyself.positionTargetDifference === null
                        ? 'null'
                        : playerMyself.positionTargetDifference.x+','+playerMyself.positionTargetDifference.z
                );
                ui.debugPlayerPositionTarget.text = 'Coordinates target: '+(
                    typeof playerMyself.coordinatesHistory[0] == 'undefined'
                        ? 'null'
                        : playerMyself.coordinatesHistory[0].coordinates.lng+','+playerMyself.coordinatesHistory[0].coordinates.lat
                );
            }
        });
    }

    ui.debugCanvas.x = x;
    ui.debugCanvas.y = y;
}

/********** Compass **********/
function prepareUiCompass() {
    var size = 128;
    var x = window.innerWidth * DPR - size - padding;
    var y = window.innerHeight * DPR - size - padding;

    if (!ui.compassCanvas) {
        var imageUrl = 'assets/img/compass.png';
        var textureTask = assetsManager.addTextureTask(
            'tasks.compass.image',
            imageUrl
        );

        ui.compassCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
            id: 'compass.canvas',
            size: new BABYLON.Size(size, size),
            backgroundFill: '#FFFFFFFF',
            backgroundRoundRadius: size / 2,
            x: x,
            y: y,
        });

        textureTask.onSuccess = function(task) {
            if (!ui.compassImage) {
                ui.compassImage = new BABYLON.Sprite2D(task.texture, {
                    parent: ui.compassCanvas,
                    id: 'compass.image',
                    x: 0,
                    y: 0,
                    spriteSize: new BABYLON.Size(128, 128),
        		    spriteLocation: new BABYLON.Vector2(0, 0),
                });
            }
        };

        // to-do: fix, not working right now
        if (!ui.compassCanvasClickEvent) {
            ui.compassCanvas.pointerEventObservable.add(function (d, s) {
                BABYLON.Animation.CreateAndStartAnimation(
                    'cameraPan',
                    camera,
                    'alpha',
                    60, // FPS
                    60, // total frames
                    camera.alpha, // from
                    degreesToRadians(270), // to
                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                );
            }, BABYLON.PrimitivePointerInfo.PointerUp);

            ui.compassCanvasClickEvent = true;
        }
    }

    ui.compassCanvas.x = x;
    ui.compassCanvas.y = y;
}

/********** Player info **********/
function prepareUiPlayerInfo() {
    var data = { // to-do
        username: 'bobalazek',
        email: 'bobalazek124@gmail.com',
        screen_name: 'Borut',
        avatar_image_url: 'assets/img/avatar.png',
        experience_points: 1000,
        level: 2,
        level_progress_bar_percentage: 50,
    };

    var x = padding;
    var y = padding;
    var progressBarPadding = 24 * DPR;

    // Canvas
    if (!ui.playerInfoCanvas) {
        ui.playerInfoCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
            id: 'playerInfo.canvas',
            x: x,
            y: y,
        });

        // Avatar image
        var textureTask = assetsManager.addTextureTask(
            'tasks.playerInfo.avatar.image',
            data.avatar_image_url
        );

        textureTask.onSuccess = function(task) {
            if (!ui.playerInfoAvatarImage) {
                ui.playerInfoAvatarImage = new BABYLON.Sprite2D(task.texture, {
                    parent: ui.playerInfoCanvas,
                    id: 'playerInfoAvatar.image',
                    x: -24 * DPR,
                    y: -8 * DPR,
                    scale: 0.5,
                    spriteSize: new BABYLON.Size(256, 256),
        		    spriteLocation: new BABYLON.Vector2(0, 0),
                });
            }

            if (!ui.playerInfoProgressBarWrapper) {
                // Progress bar wrapper
                ui.playerInfoProgressBarWrapper = new BABYLON.Rectangle2D({
                    id: 'playerInfo.progressBarWrapper',
                    width: 202 * DPR,
                    height: 10 * DPR,
                    x: 0,
                    y: progressBarPadding,
                    roundRadius: 5 * DPR,
                    fill: "#000000FF",
                    parent: ui.playerInfoCanvas,
                });
            }

            if (!ui.playerInfoProgressBar) {
                // Progress bar
                ui.playerInfoProgressBar = new BABYLON.Rectangle2D({
                    id: 'playerInfo.progressBar',
                    width: (data.level_progress_bar_percentage * 2) * DPR,
                    height: 8 * DPR,
                    x: 1 * DPR,
                    y: progressBarPadding + (1 * DPR),
                    roundRadius: 4 * DPR,
                    fill: "#00FF00FF",
                    parent: ui.playerInfoCanvas,
                });
            }

            if (!ui.playerInfoScreenName) {
                // Screen name
                ui.playerInfoScreenName = new BABYLON.Text2D(data.screen_name, {
                    id: 'playerInfo.screenName',
                    x: 0,
                    y: 0,
                    fontName: fontNameSm,
                    parent: ui.playerInfoCanvas,
                });
            }

            if (!ui.playerInfoLevel) {
                // Level
                ui.playerInfoLevel = new BABYLON.Text2D(data.level+'', { // force it to be a string
                    id: 'playerInfo.level',
                    x: 64 * DPR,
                    y: 32 * DPR,
                    fontName: fontNameMd,
                    parent: ui.playerInfoCanvas,
                });
            }
        };
    }

    ui.playerInfoCanvas.x = x;
    ui.playerInfoCanvas.y = y;
}

/********** Preloader **********/
function prepareUiPreloader() {
    var width = window.innerWidth * DPR;
    var height = window.innerHeight * DPR;
    var progressBarHeight = 32 * DPR;
    var progressBarY = (height / 2) + (progressBarHeight / 2);

    if (!ui.preloaderCanvas) {
        ui.preloaderCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
            id: 'preloader.canvas',
            height: height,
            width: width,
            backgroundFill: '#FFFFFFFF',
        });
        checkPreloaderProgress();
    }

    ui.preloaderCanvas.height = height;
    ui.preloaderCanvas.width = width;

    if (!ui.preloaderProgressBarWrapper) {
        // Progress bar wrapper
        ui.preloaderProgressBarWrapper = new BABYLON.Rectangle2D({
            id: 'preloader.progressBarWrapper',
            width: width,
            height: progressBarHeight,
            x: 0,
            y: progressBarY,
            fill: "#333333FF",
            parent: ui.preloaderCanvas,
        });
    }

    ui.preloaderProgressBarWrapper.y = progressBarY;

    if (!ui.preloaderProgressBar) {
        // Progress bar
        ui.preloaderProgressBar = new BABYLON.Rectangle2D({
            id: 'preloader.progressBar',
            width: 0,
            height: progressBarHeight,
            x: 0,
            y: progressBarY,
            roundRadius: 4,
            fill: "#00FF00FF",
            parent: ui.preloaderCanvas,
        });
    }

    ui.preloaderProgressBar.y = progressBarY;
}

function showPreloader() {
    if (ui.preloaderCanvas) {
        ui.preloaderCanvas.levelVisible = true;
    }
}

function hidePreloader() {
    if (ui.preloaderCanvas) {
        ui.preloaderCanvas.levelVisible = false;
    }
}

function checkPreloaderProgress() {
    var interval = setInterval(function() {
        if (typeof map['0,0'] != 'undefined') {
            var width = window.innerWidth * DPR;
            var total = Object.keys(map).length;
            var completed = 0;
            var mapReady = false;
            for (var i in map) {
                if (map[i].areImagesReady === true) {
                    completed++;
                }
            }

            if (total === completed) {
                mapReady = true;
            }

            if (ui.preloaderProgressBar) {
                var percentage = 0;
                if (completed > 0) {
                    percentage = (completed / total) * 100;
                }

                if (ui.preloaderProgressBar) {
                    ui.preloaderProgressBar.width = (width / 100) * percentage;
                }
            }

            if (mapReady) {
                hidePreloader();
                clearInterval(interval);
            }
        }
    }, 250);
}

/********** Events **********/
window.addEventListener('resize', function() {
    prepareUi();
});
