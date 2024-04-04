<template>
  <div class="view">
    <div ref="mapRoot" style="width: 70%; height: 100vh"></div>
    <div class="marker-block">
      <div v-for="(marker, index) in markers" :key="index" class="marker">
        <!-- {{ marker.name }} - {{ marker.coordinate }} -->
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

const mapRoot = ref(HTMLElement);
const markers = ref([]);

const cities = [
  // { name: "Москва", coordinate: [4188119.7558, 7509445.6176] },
  { name: "Санкт-Петербург", coordinate: [59.9343, 30.3351] },
  { name: "Новосибирск", coordinate: [55.0084, 82.9357] },
  { name: "Барнаул", coordinate: [9325115, 7046542] },
  { name: "Кемерово", coordinate: [9586396, 7429010] },
  { name: "Казань", coordinate: [55.8304, 49.0661] },
  { name: "Челябинск", coordinate: [55.1644, 61.4368] },
  { name: "Омск", coordinate: [54.9885, 73.3242] },
  { name: "Самара", coordinate: [53.2001, 50.15] },
  { name: "Ростов-на-Дону", coordinate: [47.2357, 39.7015] },
];

const features = cities.map((city) => {
  const point = new Point(city.coordinate);
  const feature = new Feature(point);
  feature.set("name", city.name);
  return feature;
});

// const data = {
//   type: "Feature",
//   properties: {},
//   geometry: {
//     type: "Point",
//     coordinates: [cities.map((city) => city.coordinate)],
//   },
// };

console.log(features);

// const polygons = [
//   {
//     name: "Example Polygon",
//     coordinates: [
//       [3000000, 5000000],
//       [4000000, 6000000],
//       [4500000, 5500000],
//       [1100000, 1100000],
//       [1000000, 1000000],
//     ],
//   },
// ];

onMounted(() => {
  const vectorSource = new VectorSource({
    features: features,
  });

  // const feature = new GeoJSON().readFeature(features, {
  //   featureProjection: "EPSG:3857",
  // });

  // const vectorLayer = new VectorLayer({
  //   source: new VectorSource({
  //     features: [feature],
  //   }),
  // });

  new Map({
    target: mapRoot.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: "blue" }),
            stroke: new Stroke({
              color: "#fff",
              width: 2,
            }),
          }),
          // text: new Text({
          //   text: (feature) => feature.get("name"),
          //   offsetY: -15,
          //   font: "12px Calibri,sans-serif",
          //   fill: new Fill({ color: "#000" }),
          //   stroke: new Stroke({
          //     color: "#fff",
          //     width: 3,
          //   }),
          // }),
        }),
      }),
    ],

    view: new View({
      zoom: 2,
      center: [10, -43],
      constrainResolution: true,
    }),
  });

  // const map = new Map({
  //   target: mapRoot.value,
  //   layers: [
  //     new TileLayer({
  //       source: new OSM(),
  //     }),
  //     new VectorLayer({
  //       source: vectorSource,
  //     }),
  //   ],
  //   view: new View({
  //     zoom: 3,
  //     center: [50, 50],
  //     constrainResolution: true,
  //   }),
  // });

  // cities.forEach((city) => {
  //   const marker = new Feature({
  //     geometry: new Point(city.coordinate),
  //   });
  //   marker.setStyle(
  //     new Style({
  //       image: new Circle({
  //         radius: 6,
  //         fill: new Fill({ color: "#234343" }),
  //         stroke: new Stroke({
  //           color: "#fff",
  //           width: 2,
  //         }),
  //       }),
  //       text: new Text({
  //         text: `(${city.name})`,
  //         offsetY: -15,
  //         font: "12px Calibri,sans-serif",
  //         fill: new Fill({ color: "#000" }),
  //         stroke: new Stroke({
  //           color: "#fff",
  //           width: 3,
  //         }),
  //       }),
  //     })
  //   );
  //   vectorSource.addFeature(marker);
  // });

  // polygons.forEach((polygonData) => {
  //   const polygonFeature = new Feature({
  //     geometry: new Polygon([polygonData.coordinates]),
  //   });
  //   polygonFeature.setStyle(
  //     new Style({
  //       stroke: new Stroke({
  //         color: "red",
  //         width: 2,
  //       }),
  //       fill: new Fill({
  //         color: "rgba(255, 0, 0, 0.2)",
  //       }),
  //     })
  //   );
  //   vectorSource.addFeature(polygonFeature);
  // });

  // map.on("click", function (event) {
  //   const coordinate = event.coordinate;
  //   const marker = new Feature({
  //     geometry: new Point(coordinate),
  //   });
  //   marker.setStyle(
  //     new Style({
  //       image: new Circle({
  //         radius: 6,
  //         fill: new Fill({ color: "blue" }),
  //         stroke: new Stroke({
  //           color: "#fff",
  //           width: 2,
  //         }),
  //       }),
  //       text: new Text({
  //         text: `(${coordinate[0].toFixed(2)}, ${coordinate[1].toFixed(2)})`,
  //         offsetY: -15,
  //         font: "12px Calibri,sans-serif",
  //         fill: new Fill({ color: "#000" }),
  //         stroke: new Stroke({
  //           color: "#fff",
  //           width: 3,
  //         }),
  //       }),
  //     })
  //   );
  //   vectorSource.addFeature(marker);
  // });
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
