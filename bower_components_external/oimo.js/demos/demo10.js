CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Spring box");

    CAM(120,60,1600);

    // ground
    ADD({type:"ground", size:[10000,500,10000], pos:[0,-250,0]});

    var Max = 6;
    var collision = true;
    var spring01 = [10, 0.3];
    var spring02 = [10, 0.3];
    var i = 0;
    var py, px, pz;
    var pos;
    var wx = 50, wy=50, wz=50;
    var b1, b2;

    for(j=0; j<20; j++){
        py=200+(j*200);
        px=-400+Math.random()*800;
        pz=-400+Math.random()*800;

        for(i=0; i<8; i++){
            switch(i){
                case 0 : pos = [px-wx ,py+wy, pz+wz]; break;
                case 1 : pos = [px+wx, py+wy, pz+wz]; break;
                case 2 : pos = [px-wx, py+wy, pz-wz]; break;
                case 3 : pos = [px+wx, py+wy, pz-wz]; break;

                case 4 : pos = [px-wx, py-wy, pz+wz]; break;
                case 5 : pos = [px+wx, py-wy, pz+wz]; break;
                case 6 : pos = [px-wx, py-wy, pz-wz]; break;
                case 7 : pos = [px+wx, py-wy, pz-wz]; break;
            }
                
            ADD({ type:'sphere', size:[12], pos:pos, move:true, name:'p'+i+'-'+j, config:[0.2, 0.4,0.1] });
        }
        for(i=0; i<12; i++){
            switch(i){
                case 0 : b1='p0'; b2='p1'; break;
                case 1 : b1='p0'; b2='p2'; break;
                case 2 : b1='p1'; b2='p3'; break;
                case 3 : b1='p2'; b2='p3'; break;

                case 4 : b1='p2'; b2='p6'; break;
                case 5 : b1='p3'; b2='p7'; break;
                case 6 : b1='p0'; b2='p4'; break;
                case 7 : b1='p1'; b2='p5'; break;

                case 8 : b1='p4'; b2='p5'; break;
                case 9 : b1='p5'; b2='p7'; break;
                case 10 : b1='p7'; b2='p6'; break;
                case 11 : b1='p6'; b2='p4'; break;
            }

            ADD({type:"jointDistance", body1:b1+'-'+j, body2:b2+'-'+j, axe1:[1,0,0], axe2:[1,0,0], min:100, max:110 , spring:spring01, collision:collision});
        }

        for(i=0; i<12; i++){
            switch(i){
                case 0 : b1='p0'; b2='p3'; break;
                case 1 : b1='p2'; b2='p1'; break;
                case 2 : b1='p0'; b2='p6'; break;
                case 3 : b1='p2'; b2='p4'; break;

                case 4 : b1='p2'; b2='p0'; break;
                case 5 : b1='p3'; b2='p6'; break;
                case 6 : b1='p0'; b2='p5'; break;
                case 7 : b1='p1'; b2='p4'; break;

                case 8 : b1='p6'; b2='p5'; break;
                case 9 : b1='p7'; b2='p4'; break;
                case 10 : b1='p7'; b2='p1'; break;
                case 11 : b1='p3'; b2='p5'; break;
            }

            ADD({type:"jointDistance", body1:b1+'-'+j, body2:b2+'-'+j, axe1:[1,0,0], axe2:[1,0,0], min:141, max:151 , spring:spring02, collision:collision });
        }
    }
}