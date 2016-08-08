CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Car rush hour");

    CAM(90,85,6000);

    // ground
    ADD({type:"ground", size:[10000,500,10000], pos:[0,-250,0]});

    //ramp
    ADD({type:"box", size:[10000,500,10000], pos:[0,2500,-9000], rot:[35,0,0]});
    ADD({type:"box", size:[10000,500,500], pos:[0,250,5000]});

    // add dynamique object
    var max = 100;
    var px, py, pz = -10000;
    var posy = 5000;

    for (var i = 0; i!==max; i++) {
       
        px = (-4000 + (Math.random() * 8000)); 
        py = 200 * i;

        ADD({ type:"box", size:[200,50,300], pos:[px, posy + py, pz], config:[1,0.4,0.2], move:true, name:'car'+i });

        ADD({ type:"sphere", size:[60], pos:[-100 + px, posy + py, 150 + pz], config:[1,0.4,0.2], move:true, name:'1-w'+i });
        ADD({ type:"sphere", size:[60], pos:[100 + px, posy + py, 150 + pz], config:[1,0.4,0.2], move:true, name:'2-w'+i });
        ADD({ type:"sphere", size:[60], pos:[-100 + px, posy + py, -150 + pz], config:[1,0.4,0.2], move:true, name:'3-w'+i });
        ADD({ type:"sphere", size:[60], pos:[100 + px, posy + py, -150 + pz], config:[1,0.4,0.2], move:true, name:'4-w'+i });

        ADD({ type:"jointBall", body1:'car'+i, body2:'1-w'+i , pos1:[-100, 0, 150] });
        ADD({ type:"jointBall", body1:'car'+i, body2:'2-w'+i , pos1:[100, 0, 150] });
        ADD({ type:"jointBall", body1:'car'+i, body2:'3-w'+i , pos1:[-100, 0, -150] });
        ADD({ type:"jointBall", body1:'car'+i, body2:'4-w'+i , pos1:[100, 0, -150] });
    }
}