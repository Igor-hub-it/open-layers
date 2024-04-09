import { Feature, Point, Polygon } from "@turf/turf"

export class Territory {
  /* Название территории */
  name: string

  /* Центральная точка территории */
  coordinate: Feature<Point>

  /* Территория (гео-полигон), пострадавшая в результате пожара */ 
  burnedPolygon: Feature<Polygon>

  /* Площадь, пострадавшей в результате пожара, территории  */
  burnedArea: number

  /* Категория ущерба (1-6), где 1 - почти нет разрушений, 6 - разрушения критические */
  hazardCategory: number

  constructor(model: Territory) {
    this.name = model.name
    this.coordinate = model.coordinate
    this.burnedPolygon = model.burnedPolygon
    this.burnedArea = model.burnedArea
    this.hazardCategory = model.hazardCategory
  }
}