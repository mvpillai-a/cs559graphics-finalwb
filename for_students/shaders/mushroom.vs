varying vec2 v_uv;
varying vec3 l_normal;
varying vec3 v_world_position;

uniform float radius;
uniform float dots;

float fdot(vec2 uv) {
    float x = uv.x * dots;
    float y = uv.y * dots;

    float xc = floor(x);
    float yc = floor(y);

    float dx = x-xc-.5;
    float dy = y-yc-.5;

    float d = sqrt(dx*dx + dy*dy);
    float a = .1;
    float dc = 1.0-smoothstep(radius-a,radius+a,d);

    return dc;
}

void main() {
    v_uv = uv;
    float d = fdot(uv);
    vec4 world_pos = (modelMatrix * vec4(position + 0.1 * d * normal,1.0));
    //vec4 world_pos = (modelMatrix * vec4(position,1.0));
    v_world_position = world_pos.xyz;
    l_normal = (modelMatrix * vec4(normal,0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * world_pos;
}
