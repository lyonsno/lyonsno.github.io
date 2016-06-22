//SEC3 is a core function interface
var SEC3 = SEC3 || {};
                            // Scene
SEC3.bufferObjectsWrapper = function(){
	this.vertexVBOs = []
	this.normalVBOs = []
	this.texcoordVBOs = []
	this.indexVBOs = []

};

SEC3.bufferObjectsWrapper.prototype = Object.create( SEC3.bufferObjectsWrapper.prototype );

