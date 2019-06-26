export class Program {

  constructor(
    public readonly gl: WebGL2RenderingContext,
    public readonly glProgram: WebGLProgram,
    public readonly vertShader: WebGLShader,
    public readonly fragShader: WebGLShader) {

  }

}