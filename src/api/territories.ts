import { Feature } from "@/models/Feature";
import FeatureCollection from "@/models/FeatureCollection"
import { Polygon } from "ol/geom";

export const getDangerousTerritories = (): Promise<FeatureCollection > => {
  return new Promise((resolve) => {
    resolve({
      "type": "FeatureCollection",
      "features": [
        {
            name: "Архангельские леса",
            coordinate: [55, 55],
            burnedPolygon: [
              [
                [4835000, 9970000],
                [5420500, 9500000],
                [5260500, 9340000],
                [5342000, 9182000],
                [5211000, 9014000],
                [5000000, 8924000],
                [5094000, 8833000],
                [5094000, 8792000],
                [4973000, 8834000],
                [4895000, 8908000],
                [4675000, 9126000],
                [4601000, 9273000],
                [4502000, 9255000],
                [4522000, 9616000],
                [4733000, 9759000],
              ]
            ],
            burnedArea: 500,
            hazardCategory: 3,
        },
        {
          name: "Название территории 2",
          coordinate: [50, 50],
          burnedPolygon: [
            [
              [12290000, 8664000],
              [12530000, 8638000],
              [12770000, 8844000],
              [13050000, 8713000],
              [13020000, 8423000],
              [12850000, 8512000],
              [12530000, 8135000],
              [12490000, 8289000],
              [12240000, 8106000],
              [12160000, 8252000]
            ]
          ],
          burnedArea: 400,
          hazardCategory: 2,
        }
      ]
    })
  }) 
};
