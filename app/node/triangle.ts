import { Node } from 'node/node';
import { ShaderCompiler } from 'node/compiler';
import { Program } from 'node/program';

export class TriangleNode extends Node {

  public readonly VERT_VERTEX_IN = 'triangle_position_in';

  private p0_x: number;
  private p0_y: number;
  private p1_x: number;
  private p1_y: number;
  private p2_x: number;
  private p2_y: number;

  setPosition(p0_x: number, p0_y: number, p1_x: number, p1_y: number, p2_x: number, p2_y: number) {
    this.p0_x = p0_x;
    this.p0_y = p0_y;
    this.p1_x = p1_x;
    this.p1_y = p1_y;
    this.p2_x = p2_x;
    this.p2_y = p2_y;
  }

  render(program: Program): void {
    const gl = program.gl;
    const positionAttribLocation = gl.getAttribLocation(program.glProgram, this.VERT_VERTEX_IN);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      this.p0_x, this.p0_y,
      this.p1_x, this.p1_y,
      this.p2_x, this.p2_y
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(positionAttribLocation);

    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  compile(compiler: ShaderCompiler): boolean {
    compiler.appendVertBody(`
      in vec4 ${this.VERT_VERTEX_IN};
    `)
    compiler.appendVertMain(`
      ${ShaderCompiler.VERT_POSITION_OUT} += ${this.VERT_VERTEX_IN};
    `)
    return false;
  }

}