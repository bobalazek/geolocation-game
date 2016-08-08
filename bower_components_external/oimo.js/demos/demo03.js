CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Pool fall");

    CAM(45,60,2800);

    // ground
    ADD({ type:"ground", size:[2000,300,2000], pos:[0,-150,0] });
    // wall
    ADD({ type:"box", size:[2000,1000,100], pos:[0,500,-950] });
    ADD({ type:"box", size:[2000,1000,100], pos:[0,500,950] });
    ADD({ type:"box", size:[100,1000,1800], pos:[-950,500,0] });
    ADD({ type:"box", size:[100,1000,1800], pos:[ 950,500,0] });

    var max = 333;
    var px, pz, s;

    for (var i=0; i!==max; ++i ){
        s = 10+(Math.random()*100);
        px = -100+Math.random()*200;
        pz = -100+Math.random()*200;
        ADD({ type:"nball", size:[s], pos:[px,1+(100*i),pz], config:[s/10, 0.5, 0.5], move:true });
    }
}