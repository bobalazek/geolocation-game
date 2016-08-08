CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

// YOU CAN CHOOSE BOARDPHASE
// For dev version  1:BRUTE_FORCE, 2:SWEEP_AND_PRUNE, 3:VOLUME_TREE;  
// For rev version  1:BRUTE_FORCE, 2:SWEEP_AND_PRUNE; 

function initDemo()
{
    demoName("Basic shape");

    CAM(45,60,2000);
    
    // ground
    ADD({type:"ground", size:[2000,300,2000], pos:[0,-150,0]});

    // dynamique object
    var max = 100;
    var px, pz, t, n;
    var sx, sy, sz;

    for (var i=0; i!==max; ++i ){
        if(version=="DEV") n=2;
        else n=3;
        t = Math.floor(Math.random()*n)+1;
        px = -100+Math.random()*200;
        pz = -100+Math.random()*200;

        sx = 20+Math.random()*100;
        sy = 20+Math.random()*100;
        sz = 20+Math.random()*100;
        if(t==1) ADD({ type:"sphere", size:[sx*0.5], pos:[px,500+i,pz], move:true });
        else if(t==2) ADD({ type:"box", size:[sx,sy,sz], pos:[px,500+i,pz], move:true });
        else if(t==3) ADD({ type:"cylinder", size:[sx*0.5,sy,sx*0.5], pos:[px,500+i,pz], move:true });
    }
}