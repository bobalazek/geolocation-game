/**
 * A sphere shape.
 * @author saharan
 */
OIMO.SphereShape = function(config,radius){
    OIMO.Shape.call( this, config);
    // The radius of the shape.
    this.radius = radius;
    this.type = OIMO.SHAPE_SPHERE;
};

OIMO.SphereShape.prototype = Object.create( OIMO.Shape.prototype );

OIMO.SphereShape.prototype.calculateMassInfo = function(out){
    var mass = 4/3*OIMO.PI*this.radius*this.radius*this.radius*this.density;
    out.mass = mass;
    var inertia = mass*this.radius*this.radius*2/5;
    out.inertia.init( inertia,0,0,0,inertia,0,0,0,inertia );
};

OIMO.SphereShape.prototype.updateProxy = function(){
    var p = OIMO.AABB_PROX;

    this.aabb.init(
        this.position.x-this.radius-p,this.position.x+this.radius+p,
        this.position.y-this.radius-p,this.position.y+this.radius+p,
        this.position.z-this.radius-p,this.position.z+this.radius+p
    );

    if(this.proxy!==null) this.proxy.update();

};