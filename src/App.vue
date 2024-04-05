<template>
  <div class="view">
    <div ref="mapRoot" style="width: 70%; height: 100vh"></div>
    <div class="marker-block">
      <div v-for="(marker, index) in VectorSource" :key="index" class="marker">
        {{ marker.coordinate }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import FeatureFormat from "ol/format/Feature";
import { Polygon } from "ol/geom";
import { getDangerousTerritories } from "@/api/territories";

const mapRoot = ref<HTMLElement | null>(null);
const markers = ref<{ name: string, coordinate: [number, number] }[]>([])

const features = ref<Feature[]>([])

onMounted(async () => {
  
  const featureCollection = await getDangerousTerritories();

  features.value = featureCollection.features.map((featureData) => {
    const polygonCoordinates = featureData.burnedPolygon[0].map(([x, y]) => [x, y]);
    const polygonFeature = new Feature({
      geometry: new Polygon([polygonCoordinates]),
    });
    return polygonFeature;
  });

  const vectorSource = new VectorSource({
    features: features.value,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.5)", // Красный цвет с прозрачностью
      }),
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
    }),
  });

  const map = new Map({
    target: mapRoot.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      zoom: 2,
      center: [10, -43],
    }),
  });

  map.on("click", function (event) {
    const coordinate = event.coordinate;
    const marker = new Feature({
      geometry: new Point(coordinate),
    });
    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "blue" }),
          stroke: new Stroke({
            color: "#fff",
            width: 2,
          }),
        }),
        text: new Text({
          text: `(${coordinate[0].toFixed(2)}, ${coordinate[1].toFixed(2)})`,
          offsetY: -15,
          font: "12px Calibri,sans-serif",
          fill: new Fill({ color: "#000" }),
          stroke: new Stroke({
            color: "#fff",
            width: 3,
          }),
        }),
      })
    );
    vectorSource.addFeature(marker);
    markers.value.push({ name: "New Marker", coordinate: [coordinate[0], coordinate[1]] });
  });
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  box-sizing: border-box;
}

.view {
  width: 100%;
  height: 100%;
  display: flex;
}

.cell {
  border-radius: 4px;
  background-color: lightgrey;
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}

.cell-inspect {
  grid-column: 2;
  grid-row: 2;
}

.marker-block {
  width: 30%;
  height: 100vh;
  background: rgba(255, 244, 244, 0.801);
}
</style>
