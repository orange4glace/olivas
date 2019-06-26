import { Node } from 'node/node';
import { makeid } from 'base/common/makeid';
import { Program } from 'node/program';
import { ShaderType, Uniform, ShaderCompiler } from 'node/compiler';

export class AlphaNode extends Node {

  public readonly FRAG_ALPHA = `alpha_${makeid(5)}`;

  private alpha_: number = 0.8;

  setValue(alpha: number) {
    this.alpha_ = alpha;
  }

  render(program: Program): void {
    const gl = program.gl;
    const alpha = gl.getUniformLocation(program.glProgram, this.FRAG_ALPHA);
    gl.uniform1f(alpha, this.alpha_);
  }

  compile(compiler: ShaderCompiler): boolean {
    compiler.appendUniform(ShaderType.FRAGMENT, this.FRAG_ALPHA, Uniform.UNIFORM_1F);
    compiler.appendFragMain(`
      ${ShaderCompiler.FRAG_COLOR_OUT}.a *= ${this.FRAG_ALPHA};
    `)
    return false;
  }

}