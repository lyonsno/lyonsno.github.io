precision highp float;

uniform vec2 u_screenDims;
uniform vec3 u_camPos;
uniform vec3 u_lPos;
uniform sampler2D u_depth;
varying vec3 worldPosition;
varying vec4 testColor;
varying vec3 normal;
varying vec2 spritePosition;

const float radius = 0.5;

void main(void) {
	// discard if outside sphere
	vec2 spriteCenter = vec2(0.5, 0.5);
	if( length( spriteCenter - spritePosition ) > radius) {
		discard;
	}

	// calculate normal from texture coordinates
    vec3 N;
    N.xy = spritePosition;
    float mag = dot(N.xy, N.xy);
    N.z = sqrt(1.0-mag);
    N = normalize(N);

	//discard me if I am occluded by a scene object
	float camDistance = length( worldPosition - u_camPos );
	vec2 uv = gl_FragCoord.xy / u_screenDims;
	float depth = texture2D( u_depth, uv ).r;

	if( camDistance > depth && depth > 0.0 ) {
		discard;
	}

	// vec3 u_lPos = vec3( -10.0, 10.0, 10.0);
	vec3 toLight = (u_lPos - worldPosition);
	toLight = normalize(toLight);

	float diffuse = max(0.0, dot(toLight, N));

	float falloff = 1.0 / (dot(toLight, toLight));
	float lambertTerm = max(dot(normalize(normal), toLight), 0.0);
	lambertTerm *= falloff;
	lambertTerm = clamp( lambertTerm, 0.6, 1.0);
	// float softenEdge = max(1.0 - length(2.0 * gl_PointCoord - 1.0), 0.0);
	// gl_FragData[0] = testColor;
	// gl_FragData[0] = vec4(testColor.r, testColor.g, 0.0, 1.0);
	// gl_FragData[0] = sqrt(vec4( lambertTerm * 0.2 * (length(testColor.rgb)) * normalize(testColor.rgb), 1.0));
	// gl_FragData[0] = vec4(0.00001 * testColor.r, 0.0, 0.2, 1.0);
	// gl_FragData[0] = vec4(testColor.r, 0.0, 0.2, 1.0);
	// vec4 result = vec4(diffuse * falloff * mix(vec3(0.1, 0.3, 0.4), vec3(1.0), length(testColor.rgb) * length(testColor.rgb) / 30.0), 1.0);
	// gl_FragData[0] = result;
	gl_FragData[0] = vec4(worldPosition, 1.0);
	gl_FragData[1] = vec4(N, 1.0);
	gl_FragData[2] = vec4(diffuse * falloff * vec3(0.0,0.4,0.8), 1.0);
 } 

 