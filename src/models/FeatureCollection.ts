import { Feature } from "@/models/Feature";

export default interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}
