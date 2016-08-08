/**
* A linear constraint for all axes for various joints.
* @author saharan
*/
OIMO.LinearConstraint = function(joint){
    this.m1=NaN;
    this.m2=NaN;
    this.i1e00=NaN;
    this.i1e01=NaN;
    this.i1e02=NaN;
    this.i1e10=NaN;
    this.i1e11=NaN;
    this.i1e12=NaN;
    this.i1e20=NaN;
    this.i1e21=NaN;
    this.i1e22=NaN;
    this.i2e00=NaN;
    this.i2e01=NaN;
    this.i2e02=NaN;
    this.i2e10=NaN;
    this.i2e11=NaN;
    this.i2e12=NaN;
    this.i2e20=NaN;
    this.i2e21=NaN;
    this.i2e22=NaN;
    this.d00=NaN;
    this.d01=NaN;
    this.d02=NaN;
    this.d10=NaN;
    this.d11=NaN;
    this.d12=NaN;
    this.d20=NaN;
    this.d21=NaN;
    this.d22=NaN;
    this.r1x=NaN;
    this.r1y=NaN;
    this.r1z=NaN;
    this.r2x=NaN;
    this.r2y=NaN;
    this.r2z=NaN;
    this.ax1x=NaN;
    this.ax1y=NaN;
    this.ax1z=NaN;
    this.ay1x=NaN;
    this.ay1y=NaN;
    this.ay1z=NaN;
    this.az1x=NaN;
    this.az1y=NaN;
    this.az1z=NaN;
    this.ax2x=NaN;
    this.ax2y=NaN;
    this.ax2z=NaN;
    this.ay2x=NaN;
    this.ay2y=NaN;
    this.ay2z=NaN;
    this.az2x=NaN;
    this.az2y=NaN;
    this.az2z=NaN;
    this.vel=NaN;
    this.velx=NaN;
    this.vely=NaN;
    this.velz=NaN;


    this.joint=joint;
    this.r1=joint.relativeAnchorPoint1;
    this.r2=joint.relativeAnchorPoint2;
    this.p1=joint.anchorPoint1;
    this.p2=joint.anchorPoint2;
    this.b1=joint.body1;
    this.b2=joint.body2;
    this.l1=this.b1.linearVelocity;
    this.l2=this.b2.linearVelocity;
    this.a1=this.b1.angularVelocity;
    this.a2=this.b2.angularVelocity;
    this.i1=this.b1.inverseInertia;
    this.i2=this.b2.inverseInertia;
    this.impx=0;
    this.impy=0;
    this.impz=0;
}

OIMO.LinearConstraint.prototype = {
    constructor: OIMO.LinearConstraint,

    preSolve:function(timeStep,invTimeStep){
        this.r1x=this.r1.x;
        this.r1y=this.r1.y;
        this.r1z=this.r1.z;
        this.r2x=this.r2.x;
        this.r2y=this.r2.y;
        this.r2z=this.r2.z;
        this.m1=this.b1.inverseMass;
        this.m2=this.b2.inverseMass;

        var ti1 = this.i1.elements;
        var ti2 = this.i2.elements;
        this.i1e00=ti1[0];
        this.i1e01=ti1[1];
        this.i1e02=ti1[2];
        this.i1e10=ti1[3];
        this.i1e11=ti1[4];
        this.i1e12=ti1[5];
        this.i1e20=ti1[6];
        this.i1e21=ti1[7];
        this.i1e22=ti1[8];

        this.i2e00=ti2[0];
        this.i2e01=ti2[1];
        this.i2e02=ti2[2];
        this.i2e10=ti2[3];
        this.i2e11=ti2[4];
        this.i2e12=ti2[5];
        this.i2e20=ti2[6];
        this.i2e21=ti2[7];
        this.i2e22=ti2[8];

        this.ax1x=this.r1z*this.i1e01+-this.r1y*this.i1e02;
        this.ax1y=this.r1z*this.i1e11+-this.r1y*this.i1e12;
        this.ax1z=this.r1z*this.i1e21+-this.r1y*this.i1e22;
        this.ay1x=-this.r1z*this.i1e00+this.r1x*this.i1e02;
        this.ay1y=-this.r1z*this.i1e10+this.r1x*this.i1e12;
        this.ay1z=-this.r1z*this.i1e20+this.r1x*this.i1e22;
        this.az1x=this.r1y*this.i1e00+-this.r1x*this.i1e01;
        this.az1y=this.r1y*this.i1e10+-this.r1x*this.i1e11;
        this.az1z=this.r1y*this.i1e20+-this.r1x*this.i1e21;
        this.ax2x=this.r2z*this.i2e01+-this.r2y*this.i2e02;
        this.ax2y=this.r2z*this.i2e11+-this.r2y*this.i2e12;
        this.ax2z=this.r2z*this.i2e21+-this.r2y*this.i2e22;
        this.ay2x=-this.r2z*this.i2e00+this.r2x*this.i2e02;
        this.ay2y=-this.r2z*this.i2e10+this.r2x*this.i2e12;
        this.ay2z=-this.r2z*this.i2e20+this.r2x*this.i2e22;
        this.az2x=this.r2y*this.i2e00+-this.r2x*this.i2e01;
        this.az2y=this.r2y*this.i2e10+-this.r2x*this.i2e11;
        this.az2z=this.r2y*this.i2e20+-this.r2x*this.i2e21;

        // calculate point-to-point mass matrix
        // from impulse equation
        // 
        // M = ([/m] - [r^][/I][r^]) ^ -1
        // 
        // where
        // 
        // [/m] = |1/m, 0, 0|
        //        |0, 1/m, 0|
        //        |0, 0, 1/m|
        // 
        // [r^] = |0, -rz, ry|
        //        |rz, 0, -rx|
        //        |-ry, rx, 0|
        // 
        // [/I] = Inverted moment inertia

        var k00=this.m1+this.m2;
        var k01=0;
        var k02=0;
        var k10=0;
        var k11=k00;
        var k12=0;
        var k20=0;
        var k21=0;
        var k22=k00;

        k00+=this.i1e11*this.r1z*this.r1z-(this.i1e21+this.i1e12)*this.r1y*this.r1z+this.i1e22*this.r1y*this.r1y;
        k01+=(this.i1e20*this.r1y+this.i1e12*this.r1x)*this.r1z-this.i1e10*this.r1z*this.r1z-this.i1e22*this.r1x*this.r1y;
        k02+=(this.i1e10*this.r1y-this.i1e11*this.r1x)*this.r1z-this.i1e20*this.r1y*this.r1y+this.i1e21*this.r1x*this.r1y;
        k10+=(this.i1e02*this.r1y+this.i1e21*this.r1x)*this.r1z-this.i1e01*this.r1z*this.r1z-this.i1e22*this.r1x*this.r1y;
        k11+=this.i1e00*this.r1z*this.r1z-(this.i1e20+this.i1e02)*this.r1x*this.r1z+this.i1e22*this.r1x*this.r1x;
        k12+=(this.i1e01*this.r1x-this.i1e00*this.r1y)*this.r1z-this.i1e21*this.r1x*this.r1x+this.i1e20*this.r1x*this.r1y;
        k20+=(this.i1e01*this.r1y-this.i1e11*this.r1x)*this.r1z-this.i1e02*this.r1y*this.r1y+this.i1e12*this.r1x*this.r1y;
        k21+=(this.i1e10*this.r1x-this.i1e00*this.r1y)*this.r1z-this.i1e12*this.r1x*this.r1x+this.i1e02*this.r1x*this.r1y;
        k22+=this.i1e00*this.r1y*this.r1y-(this.i1e10+this.i1e01)*this.r1x*this.r1y+this.i1e11*this.r1x*this.r1x;

        k00+=this.i2e11*this.r2z*this.r2z-(this.i2e21+this.i2e12)*this.r2y*this.r2z+this.i2e22*this.r2y*this.r2y;
        k01+=(this.i2e20*this.r2y+this.i2e12*this.r2x)*this.r2z-this.i2e10*this.r2z*this.r2z-this.i2e22*this.r2x*this.r2y;
        k02+=(this.i2e10*this.r2y-this.i2e11*this.r2x)*this.r2z-this.i2e20*this.r2y*this.r2y+this.i2e21*this.r2x*this.r2y;
        k10+=(this.i2e02*this.r2y+this.i2e21*this.r2x)*this.r2z-this.i2e01*this.r2z*this.r2z-this.i2e22*this.r2x*this.r2y;
        k11+=this.i2e00*this.r2z*this.r2z-(this.i2e20+this.i2e02)*this.r2x*this.r2z+this.i2e22*this.r2x*this.r2x;
        k12+=(this.i2e01*this.r2x-this.i2e00*this.r2y)*this.r2z-this.i2e21*this.r2x*this.r2x+this.i2e20*this.r2x*this.r2y;
        k20+=(this.i2e01*this.r2y-this.i2e11*this.r2x)*this.r2z-this.i2e02*this.r2y*this.r2y+this.i2e12*this.r2x*this.r2y;
        k21+=(this.i2e10*this.r2x-this.i2e00*this.r2y)*this.r2z-this.i2e12*this.r2x*this.r2x+this.i2e02*this.r2x*this.r2y;
        k22+=this.i2e00*this.r2y*this.r2y-(this.i2e10+this.i2e01)*this.r2x*this.r2y+this.i2e11*this.r2x*this.r2x;

        var inv=1/(
        k00*(k11*k22-k21*k12)+
        k10*(k21*k02-k01*k22)+
        k20*(k01*k12-k11*k02)
        );
        this.d00=(k11*k22-k12*k21)*inv;
        this.d01=(k02*k21-k01*k22)*inv;
        this.d02=(k01*k12-k02*k11)*inv;
        this.d10=(k12*k20-k10*k22)*inv;
        this.d11=(k00*k22-k02*k20)*inv;
        this.d12=(k02*k10-k00*k12)*inv;
        this.d20=(k10*k21-k11*k20)*inv;
        this.d21=(k01*k20-k00*k21)*inv;
        this.d22=(k00*k11-k01*k10)*inv;

        this.velx=this.p2.x-this.p1.x;
        this.vely=this.p2.y-this.p1.y;
        this.velz=this.p2.z-this.p1.z;
        var len=Math.sqrt(this.velx*this.velx+this.vely*this.vely+this.velz*this.velz);
        if(len>0.005){
            len=(0.005-len)/len*invTimeStep*0.05;
            this.velx*=len;
            this.vely*=len;
            this.velz*=len;
        }else{
            this.velx=0;
            this.vely=0;
            this.velz=0;
        }

        this.impx*=0.95;
        this.impy*=0.95;
        this.impz*=0.95;
        
        this.l1.x+=this.impx*this.m1;
        this.l1.y+=this.impy*this.m1;
        this.l1.z+=this.impz*this.m1;
        this.a1.x+=this.impx*this.ax1x+this.impy*this.ay1x+this.impz*this.az1x;
        this.a1.y+=this.impx*this.ax1y+this.impy*this.ay1y+this.impz*this.az1y;
        this.a1.z+=this.impx*this.ax1z+this.impy*this.ay1z+this.impz*this.az1z;
        this.l2.x-=this.impx*this.m2;
        this.l2.y-=this.impy*this.m2;
        this.l2.z-=this.impz*this.m2;
        this.a2.x-=this.impx*this.ax2x+this.impy*this.ay2x+this.impz*this.az2x;
        this.a2.y-=this.impx*this.ax2y+this.impy*this.ay2y+this.impz*this.az2y;
        this.a2.z-=this.impx*this.ax2z+this.impy*this.ay2z+this.impz*this.az2z;
    },
    solve:function(){
        var rvx=this.l2.x-this.l1.x+this.a2.y*this.r2z-this.a2.z*this.r2y-this.a1.y*this.r1z+this.a1.z*this.r1y-this.velx;
        var rvy=this.l2.y-this.l1.y+this.a2.z*this.r2x-this.a2.x*this.r2z-this.a1.z*this.r1x+this.a1.x*this.r1z-this.vely;
        var rvz=this.l2.z-this.l1.z+this.a2.x*this.r2y-this.a2.y*this.r2x-this.a1.x*this.r1y+this.a1.y*this.r1x-this.velz;
        var nimpx=rvx*this.d00+rvy*this.d01+rvz*this.d02;
        var nimpy=rvx*this.d10+rvy*this.d11+rvz*this.d12;
        var nimpz=rvx*this.d20+rvy*this.d21+rvz*this.d22;
        this.impx+=nimpx;
        this.impy+=nimpy;
        this.impz+=nimpz;
        this.l1.x+=nimpx*this.m1;
        this.l1.y+=nimpy*this.m1;
        this.l1.z+=nimpz*this.m1;
        this.a1.x+=nimpx*this.ax1x+nimpy*this.ay1x+nimpz*this.az1x;
        this.a1.y+=nimpx*this.ax1y+nimpy*this.ay1y+nimpz*this.az1y;
        this.a1.z+=nimpx*this.ax1z+nimpy*this.ay1z+nimpz*this.az1z;
        this.l2.x-=nimpx*this.m2;
        this.l2.y-=nimpy*this.m2;
        this.l2.z-=nimpz*this.m2;
        this.a2.x-=nimpx*this.ax2x+nimpy*this.ay2x+nimpz*this.az2x;
        this.a2.y-=nimpx*this.ax2y+nimpy*this.ay2y+nimpz*this.az2y;
        this.a2.z-=nimpx*this.ax2z+nimpy*this.ay2z+nimpz*this.az2z;
    }
}