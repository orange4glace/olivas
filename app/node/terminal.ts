import { Node } from 'node/node';
import { ShaderCompiler } from 'node/compiler';
import { Program } from 'node/program';

export class TerminalNode extends Node {

  render(program: Program): void {

  }

  compile(compiler: ShaderCompiler): boolean {
    return true;
  }

}