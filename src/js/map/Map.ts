import { mapProjection } from '@/consts/map'
import { View, Map as OlMap } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { Burns } from '@/js/burns/Burns'

export class Map {
  public scene: OlMap
  public burns = new Burns(this)

  constructor(target: HTMLElement | string) {
    this.scene = new OlMap({
      target,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        zoom: 3,
        projection: mapProjection,
        center: [9000000, 8038000],
      }),
    }),
    this.burns.init()
  }
}
