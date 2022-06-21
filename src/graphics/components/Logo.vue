<template>
  <div class="logo_area">
    <p class="logo"><img class="logo-img" :src="logoUri"></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { Assets } from '@kwas_layouts/types/schemas/assets';

@Component
export default class SetupSchedule extends Vue {
  @Prop({ type: Array, default: [] })
  readonly backgroundAssets!: Assets;

  get logoUri(): string {
    return this.backgroundAssets[0]?.url || '';
  }
}
</script>

<style lang="scss" scoped>
</style>
