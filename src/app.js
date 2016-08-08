/********** Constants **********/
var GROUND_SIZE = 512;
var SKYSPHERE_SIZE = 2048;
var SUBDIVISION_SIZE = 8;
var PRECISION_SIZE = 1;
var MAP_ZOOM = 18;
var TILE_SIZE = GROUND_SIZE / SUBDIVISION_SIZE;
var SUBDIVISIONS = {
    'h': SUBDIVISION_SIZE,
    'w': SUBDIVISION_SIZE,
};
var PRECISION = {
    'w': PRECISION_SIZE,
    'h': PRECISION_SIZE,
};
var SHOW_UI_DEBUG = true;

/********** Initialize **********/
var canvas,
    engine;

function initialize() {
    /********** Preparation **********/
    BABYLON.Engine.ShadersRepository = 'assets/shaders/';

    /********** Canvas **********/
    canvas = document.getElementById('canvas');

    /********** Engine **********/
    engine = new BABYLON.Engine(canvas, true);

    /********** Scene **********/
    prepareScene();

    /********** Run **********/
    assetsManager.load();
    // temporary disable the onFinish, else we may see a whitescreen,
    // because the preloader is only ready / drawn, when the render loop runs
    //assetsManager.onFinish = function (tasks) {
        engine.runRenderLoop(function() {
            scene.render();
        });
    //};

    /********** Events **********/
    window.addEventListener('resize', function() {
        engine.resize();
    });
}

if (window.cordova) {
    document.addEventListener('deviceready', initialize, false);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        if (BABYLON.Engine.isSupported()) {
            initialize();
        } else {
            alert('Sorry, seems that your browser / device does not support WebGL. Please try using Chrome.')
        }
    }, false);
}
