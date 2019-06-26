import { Program } from 'node/program';
import { Node } from 'node/node';

export class CompiledNode {

  private prev_: CompiledNode;
  private next_: CompiledNode;

  private nodes_: ReadonlyArray<Node>;

  constructor(
    private readonly program: Program,
    nodes: Node[]) {
    this.nodes_ = nodes;
  }

  render() {
    this.program.gl.useProgram(this.program.glProgram);
    for (let i = 0; i < this.nodes_.length; i ++) {
      const node = this.nodes_[i];
      node.render(this.program);
    }
    if (this.next_) this.next_.render();
  }

}