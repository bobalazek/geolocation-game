CLEAR({timer:false, timestep:1/60, iteration:8, broadphase:2, G:-10});

function initDemo()
{
    demoName("Ragdoll");

    CAM(90,70,1000);

    // ground
    ADD({type:"ground", size:[10000,500,10000], pos:[0,-250,0]});

    var Max = 60;
    var collision = false;
    var distribution = 1;
    var l = 0;
    var m = 0;
    var j = 0;
    var px,py,pz;
    var jtype = "jointHinge";
    var spring = [2, 0.3];
        

    while (Max--){
        l++;

        if(distribution===1){
            px = -450+(l*100);
            py = 200;
            pz = -350+(m*100); 
            if(l>7){m++; l=0}
        }else {
            px = 0;
            py = 200 + (Max*150);
            pz = 0;
        }

        ADD({type:"box", size:[20,10,15], pos:[px,py-20,pz], move:true, name:'pelvis'+j });
        ADD({type:"box", size:[20,10,15], pos:[px,py-10,pz], move:true, name:'spine1_'+j });
        ADD({type:"box", size:[20,10,15], pos:[px,py,pz], move:true, name:'spine2_'+j });
        ADD({type:"box", size:[20,10,15], pos:[px,py+10,pz], move:true, name:'spine3_'+j });
        ADD({type:"nball", size:[10], pos:[px,py+30,pz], move:true, name:'head'+j });

        ADD({type:jtype, body1:'pelvis'+j, body2:'spine1_'+j, pos1:[0,5,0], pos2:[0,-5,0], min:2, max:20, collision:collision, spring:spring});
        ADD({type:jtype, body1:'spine1_'+j, body2:'spine2_'+j, pos1:[0,5,0], pos2:[0,-5,0], min:2, max:20, collision:collision, spring:spring});
        ADD({type:jtype, body1:'spine2_'+j, body2:'spine3_'+j, pos1:[0,5,0], pos2:[0,-5,0], min:2, max:20, collision:collision, spring:spring});
        ADD({type:jtype, body1:'spine3_'+j, body2:'head'+j, pos1:[0,5,0], pos2:[0,-10,0], min:2, max:20, collision:collision, spring:spring});

        // arm

        ADD({type:"box", size:[20,10,10], pos:[px-20,py+8,pz], rot:[0,0,20], move:true, name:'L_arm'+j });
        ADD({type:"box", size:[20,8,8], pos:[px-40,py,pz], rot:[0,0,20], move:true, name:'LF_arm'+j });

        ADD({type:"box", size:[20,10,10], pos:[px+20,py+8,pz], rot:[0,0,-20], move:true, name:'R_arm'+j });
        ADD({type:"box", size:[20,8,8], pos:[px+40,py,pz], rot:[0,0,-20], move:true, name:'RF_arm'+j });

        ADD({type:jtype, body1:'spine3_'+j, body2:'L_arm'+j, pos1:[-10,0,0], pos2:[10,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision});
        ADD({type:jtype, body1:'spine3_'+j, body2:'R_arm'+j, pos1:[10,0,0], pos2:[-10,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision});

        ADD({type:jtype, body1:'L_arm'+j, body2:'LF_arm'+j, pos1:[-10,0,0], pos2:[10,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision});
        ADD({type:jtype, body1:'R_arm'+j, body2:'RF_arm'+j, pos1:[10,0,0], pos2:[-10,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision});

        // leg

        ADD({type:"box", size:[10,20,10], pos:[px-6,py-40,pz], rot:[0,0,-20], move:true, name:'L_leg'+j });
        ADD({type:"box", size:[8,20,8], pos:[px-15,py-70,pz], rot:[0,0,-20], move:true, name:'LF_leg'+j });

        ADD({type:"box", size:[10,20,10], pos:[px+6,py-40,pz], rot:[0,0,20], move:true, name:'R_leg'+j });
        ADD({type:"box", size:[8,20,8], pos:[px+15,py-70,pz], rot:[0,0,20], move:true, name:'RF_leg'+j });

        ADD({type:jtype, body1:'pelvis'+j, body2:'L_leg'+j, pos1:[-6,-5,0], pos2:[0,10,0], min:2, max:60, collision:collision});
        ADD({type:jtype, body1:'pelvis'+j, body2:'R_leg'+j, pos1:[6,-5,0], pos2:[0,10,0], min:2, max:60, collision:collision});

        ADD({type:jtype, body1:'L_leg'+j, body2:'LF_leg'+j, pos1:[0,-10,0], pos2:[0,10,0], axe1:[1,0,0], axe2:[1,0,0], min:2, max:60, collision:collision});
        ADD({type:jtype, body1:'R_leg'+j, body2:'RF_leg'+j, pos1:[0,-10,0], pos2:[0,10,0], axe1:[1,0,0], axe2:[1,0,0], min:2, max:60, collision:collision});

        j+=11;
    }
}