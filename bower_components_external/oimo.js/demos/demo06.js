CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Jenga tower");

    CAM(45,60,2000);

    // ground
    ADD({type:"ground", size:[2000,400,2000], pos:[0,-200,0]});

    // add dynamique object
    var height = 30;
    var radius = 350;
    var sx = 50, sy = 30, sz = 150;
    var px, py, pz, angle, rad;

    for (var j = 0; j < height; j++) {
        for (var i = 0; i < 10; i++) {
            rad = radius-(j*3);
            angle = (Math.PI * 2 / 10 * (i + (j & 1) * 0.5));
            px = Math.cos(angle) * rad;
            py = (sy*0.5) + j * sy;
            pz = -Math.sin(angle) * rad;

            ADD({ type:"box", size:[sx,sy,sz], pos:[px,py,pz], rot:[0,angle*(180 / Math.PI),0], config:[1,0.4,0.2], move:true });
        }
    }
}