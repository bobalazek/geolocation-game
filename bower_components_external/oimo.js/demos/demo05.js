CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Pyramid");

    CAM(65,60,2000);

    // ground
    ADD({type:"ground", size:[1300,400,1300], pos:[0,-200,0]});

    // add dynamique object
    var height = 20, depth = 1;
    var sx = 60, sy = 40, sz = 60;
    var px, py, pz;

    for (var i = 0; i < height; i++) {
        for (var j = i; j < height; j++) {
            for (var k = 0; k < depth; k++) {
                px = (j - i * 0.5 - (height - 1) * 0.5) * (sx * 1.05);
                py = i * (sy + 0.01) + sy * 0.6;
                pz = (k - (sz - 1) * 0.5) + (k*sz);

                ADD({ type:"box", size:[sx,sy,sz], pos:[px,py,pz], config:[1,0.5,0.1], move:true });
            }
        }
    }
}