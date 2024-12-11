import { Shape } from "@penpot/plugin-types";

////////////////////////
////////////////////////

export function filterToOnClicks(shapes: Shape[]): Shape[] {
    return shapes.filter(shape => {
        if (!shape.interactions) return false;
        
        return shape.interactions.some(interaction => 
            interaction.trigger === "click"
        );
    });
}