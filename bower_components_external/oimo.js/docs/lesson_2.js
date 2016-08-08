
//--------------------------------
//   2 - JOINTS _ Link
//--------------------------------

// create oimo world contains all rigidBodys and joint.
var world = new OIMO.World();

// three.js view with geometrys and materials ../js/v3d.js
var v3d = new V3D.View();
v3d.initLight();

// Array to keep reference of rigidbody
var bodys = [];
// Array to keep reference of joint
var joints = [];
// Array to keep reference of three mesh
var meshs = [];
// Array to keep reference of three joint
var lines = [];


// create first static body
var obj = { size:[40, 100, 40], pos:[0,200,0], world:world, name:'base', move:true }
bodys[0] = new OIMO.Body(obj);
meshs[0] = v3d.add(obj);
// create second dynamique body
obj = { size:[100, 100, 100], pos:[60,200,200], world:world, name:'moving', move:true }
bodys[1] = new OIMO.Body(obj);
meshs[1] = v3d.add(obj);


// OIMO.Link is the main class of joint
// it use object to define propriety
obj = {};
// the world where joint is /!\ important
obj.world = world;
// the type of joint
// jointHinge : allows only for relative rotation of rigid bodies along the axis.
// jointDistance : limits the distance between two anchor points on rigidBody.
// jointPrisme : allows only for relative translation of rigid bodies along the axis.
// jointSlide : allows for relative translation and relative rotation between two rigid bodies along the axis.
// jointBall : limits relative translation on two anchor points on rigidBody.
// jointWheel : rotation between two rigid bodies along two axes and translation for the suspension.
// (note: rev version have jointBall, jointDistance, jointHinge, jointHinge2)
obj.type = 'jointDistance';
// the first rigidbody can be name or body reference
obj.body1 = 'base';
// the second rigidbody can be name or body reference
obj.body2 = 'moving';
// if body1 and body2 keep collision between them
obj.collision = true;
// the position of the first point relative to body1 can be static or dynamic
obj.pos1 = [0,-50,0];
// the position of the second point relative to body2 can be static or dynamic
obj.pos2 = [0,50,0];
// the first axis limite XYZ 1:active 0:inactive
obj.axe1 = [1,0,0];
// the second axis limite XYZ 1:active 0:inactive
obj.axe2 = [1,0,0];
// min max distance for jointDistance or angles in degree for jointHinge
obj.min = 45;
obj.max = 200;

// extra propriety 
// Limit for jointWheel and Spring
// defined by array [lowerLimit,upperLimit]
obj.limite = null;
// Spring for JointDistance, JointHinge, jointWheel
// defined by array [frequency,dampingRatio]
obj.spring = [8, 0.2];
// motor for JointDistance, JointHinge, jointWheel
// defined by array [motorSpeed,maxMotorForce]
obj.motor = null;



// you can choose unique name for each joints
obj.name = 'myName';

// finaly add joint 
joints[0] = new OIMO.Link(obj);
// add Three display line
lines[0] = v3d.add(obj);


// start loops
setInterval(oimoLoop, 1000/60);
renderLoop();

/* three.js render loop */
function renderLoop()
{
    requestAnimationFrame( renderLoop );
    v3d.render();
}
var s = 0;
/* oimo loop */
function oimoLoop() 
{  
    world.step();// update world
	if(meshs[0].position.x<40 && s==0) {meshs[0].position.x++; }
	else s=1;
	if(meshs[0].position.x>-40 && s==1) {meshs[0].position.x--; }
	else s=0;
	
	bodys[0].setPosition(meshs[0].position);
	bodys[0].setQuaternion(meshs[0].quaternion);

    // get rigidbody position and rotation and apply to mesh 
    meshs[1].position.copy(bodys[1].getPosition());
    meshs[1].quaternion.copy(bodys[1].getQuaternion());

    // get joint point position and apply to three line
    var pos = joints[0].getPosition();
    lines[0].geometry.vertices[0].copy( pos[0] );
    lines[0].geometry.vertices[1].copy( pos[1] );
    lines[0].geometry.verticesNeedUpdate = true;

    // oimo stat display
    document.getElementById("info").innerHTML = world.performance.show();
}