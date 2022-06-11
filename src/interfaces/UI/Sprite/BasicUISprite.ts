import VectorPos from "../../universal/VectorPos";

// A normal sprite with no additional properties for interactivity
export default interface BasicUISprite {
    texture: string;
    frame?: string | number | undefined;
    offset: VectorPos;
    scale: VectorPos;
}