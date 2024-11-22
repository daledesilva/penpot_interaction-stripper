import { Shape } from "@penpot/plugin-types";
import { TextDecoder } from 'text-encoding';

///////////
///////////

penpot.ui.open("Interaction Stripper", `?theme=${penpot.theme}`);

penpot.ui.onMessage<string>((message) => {
  if (message === "create-text") {
    const text = penpot.createText("Hello world!");

    if (text) {
      text.x = penpot.viewport.center.x;
      text.y = penpot.viewport.center.y;

      penpot.selection = [text];
    }
  }

  if (message === "remove-interactions") {

    // penpot.selection.forEach( (shape) => {
    //   console.log('shape.component', shape.name);
    //   shape.interactions.forEach( (interaction) => {
    //     console.log('interaction', interaction);
    //   })
    //   console.log(shape.name);
    //   exportSvg(shape);
    // })

    resizeOrClose();

  }

});

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});


async function exportSvg(shape: Shape) {
  const svgUint8 = await shape.export({ type: 'svg', scale: 1});
  console.log('svgExport', svgUint8);

  const utf8Decoder = new TextDecoder('utf-8');
  console.log('utf8Decoder', utf8Decoder);
  const svgStr = utf8Decoder.decode(svgUint8);
  console.log('svgStr', svgStr);

  penpot.ui.open('Name', 'url', {width: 150, height: 150});
}


async function resizeOrClose() {
  console.log('close');
  // window.setTimeout( () => {
  //   console.log('open');
  //   penpot.ui.open('Name', 'url', {width: 150, height: 150});
  // }, 500);
  penpot.closePlugin();
}