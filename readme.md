# Oliver

**Oliver** is a graph-based 2D WebGL rendering library.

This project is currently in idea level. 

## Example

![example](./img/example.png)

```typescript
import { TransformNode } from 'node/transform';
import { TriangleNode } from 'node/triangle';
import { RenderTreeBuilder } from 'node/builder';
import { AlphaNode } from 'node/alpha';

const canvas = document.createElement('canvas');
document.body.append(canvas);
const gl: WebGL2RenderingContext = (canvas.getContext('webgl2') as WebGL2RenderingContext);


gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_COLOR, gl.DST_COLOR);


{
  const alphaNode = new AlphaNode();
  const transformNode = new TransformNode();
  const triangleNode = new TriangleNode();
  transformNode.appendNext(alphaNode);
  alphaNode.appendNext(triangleNode);
  triangleNode.setPosition(
        0, 0,
        0, 0.5,
        0.7, 0,)

  const builder = new RenderTreeBuilder(gl as any);
  const compiledNode = builder.build(transformNode);

  compiledNode.render();
}

{
  const alphaNode = new AlphaNode();
  const transformNode = new TransformNode();
  const triangleNode = new TriangleNode();
  transformNode.appendNext(alphaNode);
  alphaNode.appendNext(triangleNode);
  triangleNode.setPosition(
        0, 0,
        0, 0.5,
        0.7, 0,)
  transformNode.setTranslate(0.1, 0.1);

  const builder = new RenderTreeBuilder(gl as any);
  const compiledNode = builder.build(transformNode);

  compiledNode.render();
}
```