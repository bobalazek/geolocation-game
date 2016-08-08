CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Compound object");

    CAM(70,70,600);

    // ground
    ADD({type:"ground", size:[10000,500,10000], pos:[0,-250,0]});

    var Max = 60;
    var collision = false;
    var distribution = 1;
    var i = 0;
    var j = 0;
    var l = 0;
    var k = 0;
    var px,py,pz;
    // chair config
    var types = [ 'box', 'box', 'box', 'box', 'box', 'box', 'box', 'box' ];
    var sizes = [ 30,5,30,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  23,10,3 ];
    var positions = [ 0,0,0,  12,-16,12,  -12,-16,12,  12,-16,-12,  -12,-16,-12,  12,16,-12,  -12,16,-12,  0,25,-12 ];

    while (Max--){
        if(distribution===1){
            positions[0] = 0;
            positions[1] = 300+(i*160);
            positions[2] = 0;
        } else {
            positions[0] = -400+(50*l);
            positions[1] = 50;
            positions[2] = -400+(50*k);
            l++;
            if(l>16){k++; l=0}
        }
        ADD({ type:types, size:sizes, pos:positions, move:true, name:'chair'+i, config:[0.2, 0.4,0.1] });
        i++;
    }
}