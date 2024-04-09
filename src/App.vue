<template>
  <div class="view">
    <Map />
    <!-- <Burns /> -->
    <!-- Вынести в Burns.vue <div class="marker-block">
      <div class="filters">
        <input v-model="filterQuery" placeholder="Поиск по названию или категории">
        <div>
          <label for="minHazard">Мин. категория опасности:</label>
          <input type="range" id="minHazard" v-model="minHazardCategory" min="1" max="6">
          <span>{{ minHazardCategory }}</span>
        </div>
        <div>
          <label for="maxHazard">Макс. категория опасности:</label>
          <input type="range" id="maxHazard" v-model="maxHazardCategory" min="1" max="6">
          <span>{{ maxHazardCategory }}</span>
        </div>
      </div>
      <div
        v-for="(marker, index) in filteredMarkers"
        :key="index"
        class="marker"
        @click="moveToMarker(marker)"
      >
        <div>{{ marker.name }}</div>
        <div>Категория риска: {{ marker.hazardCategory }}</div>
        <div>Площадь пострадавшей территории: {{ marker.burnedArea }}</div>
        <div>Координаты центра: {{ marker.coordinate }}</div>
        <br>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Map from '@/components/Map.vue'
import Burns from './components/Burns.vue';
// const filterQuery = ref('');
// const minHazardCategory = ref(1);
// const maxHazardCategory = ref(6);

// const filteredMarkers = computed(() => {
//   return markers.value.filter((marker) => {
//     const matchesQuery = marker.name.toLowerCase().includes(filterQuery.value.toLowerCase()) ||
//                          marker.hazardCategory.toString().includes(filterQuery.value);
//     const withinHazardCategoryRange = marker.hazardCategory >= minHazardCategory.value &&
//                                       marker.hazardCategory <= maxHazardCategory.value;
//     return matchesQuery && withinHazardCategoryRange;
//   });
// });

// const moveToMarker = (marker: { coordinate: [number, number] }) => {
//   if (map.value) {
//     const view = map.value.getView();
//     view.setCenter([marker.coordinate[0], marker.coordinate[1]]);
//   }
// };

// onMounted(async () => {
  // Вынести в классы
  // map.value.on("click", function (event) {
  //   const coordinate = event.coordinate;
  //   const marker = new Feature({
  //     geometry: new Point(coordinate)
  //   })
  //   map.value.getView().setCenter(coordinate)
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
  //     })
  //   )
  //   vectorSource.addFeature(marker);
  // })

  // markers.value.forEach((marker) => {
  //   const coordinate = marker.coordinate;
  //   const dangerCategory = marker.hazardCategory
  //   const name = marker.name;
  //   const feature = new Feature({
  //     geometry: new Point(coordinate),
  //   });
  //   feature.setStyle(
  //     new Style({
  //       image: new Circle({
  //         radius: 5,
  //         fill: new Fill({ color: `rgba(255, 0, 0, 0.${dangerCategory})` }),
  //         stroke: new Stroke({
  //           color: "#black",
  //           width: 2,
  //         }),
  //       }),
  //       text: new Text({
  //         text: name,
  //         offsetY: -15,
  //         fill: new Fill({ color: "#000" }),
  //         stroke: new Stroke({
  //           color: "#fff",
  //           width: 3,
  //         }),
  //       }),
  //     })
  //   );
  //   vectorSource.addFeature(feature);
  // });

  // const overlay = new Overlay({
  //   element: document.createElement("div"),
  //   autoPan: true,
  //   autoPanAnimation: {
  //     duration: 250,
  //   },
  // });
  // map.value.addOverlay(overlay);

  // map.value.on("pointermove", (event) => {
  //   map.value.getViewport().style.cursor = "";
  //   const feature = map.value.forEachFeatureAtPixel(event.pixel, (feature) => {
  //     return feature;
  //   });
  //   if (feature && feature.getGeometry().getType() === "Polygon") {
  //     const coordinates = feature.getGeometry().getInteriorPoint().getCoordinates();
  //     const info = `
  //       <div>
  //         <strong>${feature.get("name")}</strong><br>
  //         Площадь пожара: ${feature.get("burnedArea")} гектар<br>
  //         Класс опасности: ${feature.get("hazardCategory")}
  //       </div>
  //     `;
  //     overlay.getElement().innerHTML = info;
  //     overlay.setPosition(coordinates);
  //     map.value.getViewport().style.cursor = "pointer";
  //   } else {
  //     overlay.setPosition(undefined);
  //   }
  // });
// });
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(255, 244, 244, 0.801);
}

.marker {
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
}
</style>
