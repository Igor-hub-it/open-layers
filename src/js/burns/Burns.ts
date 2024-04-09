import VectorLayer from "ol/layer/Vector";
import { Map } from "../map/Map";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { TerritoryService } from "@/api/TerritoryService";
import { Territory } from "@/models/Territory";
import { dataProjection, mapProjection } from "@/consts/map";
import CircleStyle from "ol/style/Circle";

const format = new GeoJSON({
  dataProjection,
  featureProjection: mapProjection,
})

export class Burns {
  readonly centersSource = new VectorSource({ features: [] })
  readonly centersLayer = new VectorLayer({
    source: this.centersSource,
    style: this.burnCenterStyle,
  })
  readonly polygonsSource = new VectorSource({ features: [] })
  readonly polygonsLayer = new VectorLayer({
    source: this.polygonsSource,
    style: this.burnPolygonStyle,
  })

  private readonly service = new TerritoryService()
  private burns?: Territory[]

  constructor(private readonly map: Map) { }
  
  async init() {
    this.burns = await this.service.getBurns()
    
    const centers = this.burns.map(i => format.readFeature(i.coordinate))
    this.centersSource.addFeatures(centers)
    this.map.scene.addLayer(this.centersLayer)
    
    const polygons = this.burns.map(i => format.readFeature(i.burnedPolygon))
    this.polygonsSource.addFeatures(polygons)
    this.map.scene.addLayer(this.polygonsLayer)
  }

  private burnCenterStyle() {
    return new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: `rgba(255, 0, 0, 1)`,
        }),
        stroke: new Stroke({
          color: "red",
          width: 0.3,
        }),
        radius: 10
      })
    }) 
  }

  private burnPolygonStyle() {
    return new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1,
      })
    })
  }

  dispose() {
    this.map.scene.removeLayer(this.centersLayer)
    this.centersSource.clear()
  }
}