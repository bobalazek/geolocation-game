/**
 * OimoPhysics DEV 1.1.0a
 * @author Saharan / http://el-ement.com/
 * 
 * Oimo.js 2014
 * @author LoTh / http://3dflashlo.wordpress.com/
 */
 
var OIMO = { REVISION: 'DEV.1.1.2b' };

OIMO.SHAPE_SPHERE = 0x1;
OIMO.SHAPE_BOX = 0x2;
OIMO.SHAPE_CYLINDER = 0x3;

OIMO.WORLD_SCALE = 100;
OIMO.INV_SCALE = 0.01;

OIMO.TO_RAD = 0.0174532925199432957;

OIMO.AABB_PROX = 0.005;

OIMO.sqrt = Math.sqrt;
OIMO.abs = Math.abs;
OIMO.floor = Math.floor;
OIMO.cos = Math.cos;
OIMO.sin = Math.sin;
OIMO.acos = Math.acos;
OIMO.asin = Math.asin;
OIMO.atan2 = Math.atan2;
OIMO.round = Math.round;
OIMO.pow = Math.pow;
OIMO.max = Math.max;
OIMO.min = Math.min;
OIMO.random = Math.random;

OIMO.lerp = function (a, b, percent) { return a + (b - a) * percent; }
OIMO.rand = function (a, b) { return OIMO.lerp(a, b, OIMO.random()); }
OIMO.randInt = function (a, b, n) { return OIMO.lerp(a, b, OIMO.random()).toFixed(n || 0)*1;}

OIMO.degtorad = 0.0174532925199432957;
OIMO.radtodeg = 57.295779513082320876;

OIMO.PI     = 3.141592653589793;
OIMO.TwoPI  = 6.283185307179586;
OIMO.PI90   = 1.570796326794896;
OIMO.PI270  = 4.712388980384689;

// Global identification of next shape.
// This will be incremented every time a shape is created.
OIMO.nextID = 0;

var OIMO_ARRAY_TYPE;
if(!OIMO_ARRAY_TYPE) { OIMO_ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array; }