import { Feature } from "@/models/Feature";
import FeatureCollection from "@/models/FeatureCollection"

export const getDangerousTerritories = (): Promise<FeatureCollection > => {
  return new Promise((resolve) => {
    resolve({
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Название территории 1",
            "burnedArea": 1000,
            "hazardCategory": 3,
            "type": "Polygon",
            "coordinates": [
              [
                [30, 10],
                [40, 40],
                [20, 40],
                [10, 20],
                [30, 10]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Название территории 2",
            "burnedArea": 500,
            "hazardCategory": 2,
            "type": "Polygon",
            "coordinates": [
              [
                [40, 20],
                [50, 40],
                [30, 40],
                [20, 30],
                [40, 20]
              ]
            ]
          }
        }
      ]
    }
    ;)
  }) 
};
