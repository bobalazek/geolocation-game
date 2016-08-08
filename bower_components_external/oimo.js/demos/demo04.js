CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("The bridge");

    CAM(45,60,3000);

    // ground
    ADD({ type:"ground", size:[2000,1000,2000], pos:[0,-500,0] });

    var length = 40;
    var width = 400, heigth = 40, depth = 100;
    var x = 0, y = 300, z = (depth*length)*0.5;
    var moving = false;
    var n=0;

    for (var i = 0; i <= length; i++) {
        if(i === length || i===0) moving = false;
        else moving = true;
        ADD({ type:"box", size:[width, heigth, depth], pos:[x,y,z - (i + 1) * depth], config:[2,0.5,0.5], move:moving, name:'b'+i});
        if(i!==0)ADD({type:"jointHinge", body1:'b'+(i-1), body2:'b'+i, pos1:[0, 0, -depth * 0.5], pos2:[0, 0, depth * 0.5], upperAngle:0, axis1:[1,0,0], axis2:[1,0,0], collision:false });

        // Fixation
        var L = i.toString();
        if(L.charAt(L.length-1) === '0' && moving===true){
            ADD({type:"sphere", size:[20], pos:[x, y + 400, z - (i + 1) * depth], move:false, name:'s'+n});
            var dist = 500;
            ADD({type:"jointDistance", body1:'b'+i, body2:'s'+n, pos1:[-width * 0.5, 0, 0], axe1:[1,0,0], axe2:[1,0,0], min:100, max:dist , spring:[2, 0.5] });
            ADD({type:"jointDistance", body1:'b'+i, body2:'s'+n, pos1:[width * 0.5, 0, 0], axe1:[1,0,0], axe2:[1,0,0], min:100, max:dist , spring:[2, 0.5] });
            n++;
        }
    }
    
    ADD({type:"box", size:[120, 120, 120], pos:[x, y + 100, z - 600],  config:[1,0.5,0.5], move:true});
}