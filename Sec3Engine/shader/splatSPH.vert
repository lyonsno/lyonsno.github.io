precision highp float;

attribute vec2 a_index; 
attribute vec3 a_GeometryVerts;
attribute vec3 a_GeometryNormals;

uniform sampler2D u_testTex;
uniform sampler2D u_positions; 
uniform mat4 u_MVP;
uniform mat4 u_cameraView;
uniform float u_particleSize;

varying vec3 worldPosition;
varying vec4 testColor;
varying vec3 normal;

void main(void) {
	vec4 pos =  texture2D(u_positions, a_index).rgba;
	worldPosition = pos.xyz;
	vec3 cameraRight = vec3(u_cameraView[0][0], u_cameraView[1][0], u_cameraView[2][0]);
	vec3 cameraUp = vec3(u_cameraView[0][1], u_cameraView[1][1], u_cameraView[2][1]);
	worldPosition += a_GeometryVerts.y * u_particleSize * cameraUp;	
	worldPosition += a_GeometryVerts.x * u_particleSize * cameraRight;
	normal = a_GeometryNormals;
	testColor = texture2D(u_testTex, a_index).rgba;
   	gl_Position = u_MVP * vec4(worldPosition, 1.0);
}