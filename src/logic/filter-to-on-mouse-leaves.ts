import { Shape } from "@penpot/plugin-types";

////////////////////////
////////////////////////

export function filterToOnMouseLeaves(shapes: Shape[]): Shape[] {
    return shapes.filter(shape => {
        if (!shape.interactions) return false;
        
        return shape.interactions.some(interaction => 
            interaction.trigger === "mouse-leave"
        );
    });
}
