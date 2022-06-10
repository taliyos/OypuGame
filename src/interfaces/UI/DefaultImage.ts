import VectorPos from "../universal/VectorPos";

// A normal image with no additional properties for interactivity
export default interface DefaultImage {
    texture: string;
    frame?: string | number | undefined;
    offset: VectorPos;
    scale: VectorPos;
}