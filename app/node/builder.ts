import { Node } from 'node/node';
import { ShaderCompiler } from 'node/compiler';
import { CompiledNode } from 'node/compiled-node';
import { TerminalNode } from 'node/terminal';

export class RenderTreeBuilder {

  private readonly gl_: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext) {
    this.gl_ = gl;
  }

  public build(root: Node): CompiledNode {
    const gl = this.gl_;
    let nodes: Node[] = [];
    let compiledNode: CompiledNode = null;
    let cur = root;
    let compiler = new ShaderCompiler(gl); 
    let terminal = new TerminalNode();
    while (cur) {
      nodes.push(cur);
      const done = cur.compile(compiler);
      if (done) {
        const program = compiler.compile();
        const cn = new CompiledNode(program, nodes.splice(0));
        if (!compiledNode) compiledNode = cn;
        compiler = new ShaderCompiler(gl);
      }
      else {

      }
      cur = cur.next;
      if (!cur) {
        cur = terminal;
        terminal = null;
      }
    }
    return compiledNode;
  }

}