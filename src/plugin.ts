import { Shape } from "@penpot/plugin-types";
import { filterToHasInteractions } from "./logic/filter-to-has-interactions";
import { filterToComponents } from "./logic/filter-to-components";
import { filterToNonComponents } from "./logic/filter-to-non-components";
import { filterToMissingInteractions } from "./logic/filter-to-missing-interactions";
// import { TextDecoder } from 'text-encoding';

///////////
///////////

penpot.ui.open("Interaction Stripper", `?theme=${penpot.theme}`, {
  width: 350,
  height: 400,
});

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

  if (message === "filter-to-interactions") {
    const shapesWithInteractions = filterToHasInteractions(penpot.selection);
    penpot.selection = shapesWithInteractions;
    console.log('shapesWithInteractions', shapesWithInteractions);
  }

  if (message === "filter-to-components") {
    const components = filterToComponents(penpot.selection);
    penpot.selection = components;
    console.log('components', components);
  }

  if (message === "filter-to-non-components") {
    const nonComponents = filterToNonComponents(penpot.selection);
    penpot.selection = nonComponents;
    console.log('nonComponents', nonComponents);
  }

  if (message === "filter-to-missing-interactions") {
    const missingInteractions = filterToMissingInteractions(penpot.selection);
    penpot.selection = missingInteractions;
    console.log('missingInteractions', missingInteractions);
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