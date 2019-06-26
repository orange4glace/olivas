import { Program } from 'node/program';

export enum Uniform {
  UNIFORM_1F,
  UNIFORM_1I,
  UNIFORM_2F,
  UNIFORM_2I,
  UNIFORM_3F,
  UNIFORM_3I,
  UNIFORM_4F,
  UNIFORM_4I
}

export enum ShaderType {
  VERTEX,
  FRAGMENT
}

const UNIFORM_BYTE_SIZE_MAP = {
  [Uniform.UNIFORM_1F]: 4,
  [Uniform.UNIFORM_1I]: 4,
  [Uniform.UNIFORM_2F]: 8,
  [Uniform.UNIFORM_2I]: 8,
  [Uniform.UNIFORM_3F]: 12,
  [Uniform.UNIFORM_3I]: 12,
  [Uniform.UNIFORM_4F]: 16,
  [Uniform.UNIFORM_4I]: 16
}
const UNIFORM_TYPE_MAP = {
  [Uniform.UNIFORM_1F]: 'float',
  [Uniform.UNIFORM_1I]: 'int',
  [Uniform.UNIFORM_2F]: 'vec2',
  [Uniform.UNIFORM_2I]: 'ivec2',
  [Uniform.UNIFORM_3F]: 'vec3',
  [Uniform.UNIFORM_3I]: 'ivec3',
  [Uniform.UNIFORM_4F]: 'vec4',
  [Uniform.UNIFORM_4I]: 'ivec4'
}
function getUniformByteSize(uniform: Uniform): number {
  return UNIFORM_BYTE_SIZE_MAP[uniform];
}
function getUniformType(uniform: Uniform): string {
  return UNIFORM_TYPE_MAP[uniform];
}

export class ShaderCompiler {

  static readonly VERT_POSITION_OUT = 'gl_Position';

  static readonly FRAG_COLOR_OUT = 'outColor';

  private vertBody_: string = '';
  private vertMain_: string = '';
  private fragBody_: string = '';
  private fragMain_: string = '';

  private attributes_: Set<string>;

  constructor(private readonly gl_: WebGL2RenderingContext) {
    this.vertBody_ += `#version 300 es

    `
    this.vertMain_ += `
      void main() {

    `
    this.fragBody_ += `#version 300 es
      precision mediump float;
      out vec4 ${ShaderCompiler.FRAG_COLOR_OUT};
    `
    this.fragMain_ += `
      void main() {
        ${ShaderCompiler.FRAG_COLOR_OUT} = vec4(1.0, 0.5, 0.3, 1.0);
    `
  }

  appendUniform(shaderType: ShaderType, name: string, uniformType: Uniform) {
    // Todo: Uniform Buffer
    const code = `
      uniform ${getUniformType(uniformType)} ${name};
    `
    if (shaderType === ShaderType.VERTEX)
      this.appendVertBody(code);
    if (shaderType === ShaderType.FRAGMENT)
      this.appendFragBody(code);
  }

  appendVertBody(code: string) {
    this.vertBody_ += code;
  }

  appendVertMain(code: string) {
    this.vertMain_ += code;
  }

  appendFragBody(code: string) {
    this.fragBody_ += code;
  }

  appendFragMain(code: string) {
    this.fragMain_ += code;
  }

  compile(): Program {
    this.vertMain_ += `
      }
    `
    this.fragMain_ += `
      }
    `

    const vertSource = this.vertBody_ + this.vertMain_;
    const fragSource = this.fragBody_ + this.fragMain_;
    console.log(vertSource);
    console.log(fragSource);

    const gl = this.gl_;
    const vertShader = gl.createShader(WebGLRenderingContext.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertSource);
    gl.compileShader(vertShader);
    let success = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
    if (!success) {
      const err = gl.getShaderInfoLog(vertShader);
      gl.deleteShader(vertShader);
      throw new Error('Failed to compile Vertex shader! \n[Source]\n' + vertSource + ' \n[Error] ' + err);
    }

    const fragShader = gl.createShader(WebGLRenderingContext.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragSource);
    gl.compileShader(fragShader);
    success = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
    if (!success) {
      const err = gl.getShaderInfoLog(fragShader);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      throw new Error('Failed to compile Fragment shader! \n[Source]\n' + fragSource + ' \n[Error] ' + err);
    }

    const glProgram = gl.createProgram();
    gl.attachShader(glProgram, vertShader);
    gl.attachShader(glProgram, fragShader);
    gl.linkProgram(glProgram);
    {
      const success = gl.getProgramParameter(glProgram, gl.LINK_STATUS);
      if (!success) {
        const err = gl.getProgramInfoLog(glProgram);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteProgram(glProgram);
        throw new Error('Failed to link Program! ' + err);
      }
    }

    return new Program(gl, glProgram, vertShader, fragShader);
  }

}