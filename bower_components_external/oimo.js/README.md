<img src="http://lo-th.github.io/Oimo.js/images/logos.png"/>  Oimo.js 
=========
<img src="http://lo-th.github.io/Oimo.js/images/head.jpg"/><br>
Oimo.js is a lightweight 3d physics engine for javascript.<br>
It's a full javascript conversion of [OimoPhysics](https://github.com/saharan/OimoPhysics) created by [Saharan](http://el-ement.com/blog/) for actionscript 3.0.<br>


##Main Demo with three.js, sea3d, worker and editor:

- [oimo.js dev](http://lo-th.github.io/Oimo.js/index.html)
- [oimo.js rev](http://lo-th.github.io/Oimo.js/index_rev.html)

##Basic demo no worker
- [Basic test](http://lo-th.github.io/Oimo.js/test_basic.html)
- [Compound test (chair)](http://lo-th.github.io/Oimo.js/test_compound.html)
- [Compound test (capsule)](http://lo-th.github.io/Oimo.js/test_compound2.html)
- [Ragdoll test](http://lo-th.github.io/Oimo.js/test_ragdoll.html)
- [Collision test](http://lo-th.github.io/Oimo.js/test_collision.html)
- [Moving test](http://lo-th.github.io/Oimo.js/test_moving.html)
- [Terrain test](http://lo-th.github.io/Oimo.js/test_terrain.html)
- [Car test](http://lo-th.github.io/Oimo.js/test_car.html)

##Basic demo worker transferrable
- [Worker test](http://lo-th.github.io/Oimo.js/test_worker.html)

##Basic demo with PNG compression (dev:32kb rev:30kb)
- [PNG test](http://lo-th.github.io/Oimo.js/test_basic_png.html)

##Experimental demos
- [BVH test](http://lo-th.github.io/Oimo.js/test_bvh.html)
- [The walker](http://lo-th.github.io/Oimo.js/experimental/walker.html)
- [Pinball (in progress)](http://lo-th.github.io/Oimo.js/experimental/pinball.html)
- [Darkthree (in progress)](http://lo-th.github.io/Oimo.js/experimental/darkthree.html)

##Interactive documentation
- [DOCS](http://lo-th.github.io/Oimo.js/docs/index.html)

##New Lab in progress
- [LABS](http://lo-th.github.io/Oimo.js/docs/index_lab.html)

##Note
Oimo Physics uses international system units 0.1 to 10 meters max for dynamic body.<br>
In demo with three.js, i scale all by 100 so object is between 10 to 10000 three unit.<br>
You can change world scale.<br>
For three: `world.worldscale(100);`<br>
Default: `world.worldscale(1);`
