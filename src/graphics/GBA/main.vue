<template>
  <game-layout :clipPath="clipPath"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import GameLayout from '../views/GameLayout.vue';
import { Box, calculateClipPath } from '../util/clipPathCalculator';

@Component({
  components: {
    GameLayout,
  },
})
export default class extends Vue {
  get gamePosition(): Box[] {
    const x = 640;
    const y = 80;
    const width = 1280;
    const height = 800;
    return [[x, x + width, y, y + height]];
  }

  get clipPath(): string {
    return calculateClipPath(this.gamePosition);
  }
}
</script>

<style lang="scss" scoped>
  @import url('../styles/reset.css');
  @import url('../styles/common.css');
  @import url('../styles/single_general.css');
</style>
