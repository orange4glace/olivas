import { Node } from 'node/node';
import { ShaderCompiler, ShaderType, Uniform } from 'node/compiler';
import { makeid } from 'base/common/makeid';
import { Program } from 'node/program';

export class TransformNode extends Node {

  public readonly VERT_TRANSLATE = `transform_translate_${makeid(5)}`;

  private translateX_: number = 0;
  private translateY_: number = 0;

  setTranslate(x: number, y: number) {
    this.translateX_ = x;
    this.translateY_ = y;
  }

  render(program: Program): void {
    const gl = program.gl;
    const translate = gl.getUniformLocation(program.glProgram, this.VERT_TRANSLATE);
    gl.uniform2f(translate, this.translateX_, this.translateY_);
  }

  compile(compiler: ShaderCompiler): boolean {
    compiler.appendUniform(ShaderType.VERTEX, this.VERT_TRANSLATE, Uniform.UNIFORM_2F);
    compiler.appendVertMain(`
      ${ShaderCompiler.VERT_POSITION_OUT}.xy += ${this.VERT_TRANSLATE};
    `)
    return false;
  }

}