import { ShaderCompiler } from 'node/compiler';
import { Program } from 'node/program';

export abstract class Node {

  private prev_: Node;
  public get prev() { return this.prev_; }
  private next_: Node;
  public get next() { return this.next_; }

  appendNext(node: Node) {
    node.next_ = this.next_;
    this.next_ = node;
  }

  abstract render(program: Program): void;
  abstract compile(compiler: ShaderCompiler): boolean;

}