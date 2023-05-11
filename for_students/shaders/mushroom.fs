uniform float radius;
uniform float dots;

varying vec2 v_uv;
varying vec3 l_normal;

const vec3 red = vec3(.9,.2,.3);
const vec3 white = vec3(1,1,1);
const vec3 lightDir = normalize(vec3(0,0,-1));

void main(){
    float x = v_uv.x * dots ;
    float y = v_uv.y * dots ;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float a = fwidth(d);
    float dc = 1.0-smoothstep(radius-a,radius+a,d);
    vec3 baseColor = mix(red,white,dc);

    vec3 nhat = normalize(l_normal);
    float bright = clamp(dot(nhat, lightDir),0.0,1.0);
    bright = clamp(bright+.8,0.0,1.0);

    gl_FragColor = vec4(bright * baseColor,1);
}