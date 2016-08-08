/********** Constants **********/
var DPR = window.devicePixelRatio;

/********** Variables **********/
var scene,
    skysphere,
    camera,
    cameras = {},
    light,
    lights = {},
    map = {},
    meshes = {},
    skeletons = {},
    playerMyself,
    players = [],
    centerCoordinates = {
        lng: 0,
        lat: 0,
    },
    centerTile = {
        x: 0,
        y: 0,
    },
    currentCoordinates = {
        lng: 0,
        lat: 0,
    },
    ui = {},
    geolocation = {
        initial: false,
    },
    assetsManager;

/********** Scene **********/
function prepareScene() {
    /********** Scene **********/
    // NO DECLARATION HERE -- already declared in app.js
    scene = new BABYLON.Scene(engine);
    //scene.debugLayer.show();
    scene.clearColor = BABYLON.Color3.FromHexString('#AECDEA');

    /********** Assets Manager **********/
    assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;

    /********** UI **********/
    prepareUi();

    /********** Skysphere **********/
    prepareSkysphere();

    /********** Cameras **********/
    prepareCameras();

    /********** Lights **********/
    prepareLights();

    /********** Map **********/
    prepareMap();

    /********** Meshes **********/
    prepareMeshes();

    /********** Geolocation **********/
    prepareGeolocation();

    /********** Player & Map - Ground tiles **********/
    var interval = setInterval(function() {
        if (
            geolocation.initial &&
            typeof meshes.player != 'undefined'
        ) {
            /********** Player **********/
            preparePlayers();

            /********** Map - Ground tiles **********/
            prepareGroundMapImages();

            // Clear the interval
            clearInterval(interval);
        }
    }, 25);

    return scene;
};
