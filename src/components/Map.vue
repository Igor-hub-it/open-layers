<template>
  <div ref="olRoot" class="ol-root" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Map } from '@/js/map/Map';
import { Burns } from '@/js/burns/Burns';

import "ol/ol.css";

const olRoot = ref<HTMLElement>()
const map = ref<Map>()
const burnsLayer = ref<Burns>();

onMounted(() => {
  map.value = new Map(olRoot.value)
})
</script>

<style lang="scss" scoped>
.ol-root {
  width: 70%;
  height: 100vh;
}
</style>
