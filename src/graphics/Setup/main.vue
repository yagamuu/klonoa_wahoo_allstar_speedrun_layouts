<template>
  <div id="container">
    <div class="setup-background-img animation" :style="bgStyle"/>
    <div class="setup-background-img animation2" :style="bgStyle"/>
    <div class="container-inner">
        <div class="logo_area">
          <p class="logo"><img class="logo-img" :src="logoUri"></p>
        </div>
        <div class="main">
          <div class="middle_container"/>
          <setup-schedule/>
        </div>
        <p class="bgm_title"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import type { Assets } from '@kwas_layouts/types/schemas/assets';
import SetupSchedule from '../components/SetupSchedule.vue';

@Component({
  components: {
    SetupSchedule,
  },
})
export default class extends Vue {
  @Getter readonly layoutBgAssetsReplicant!: Assets;
  @Getter readonly setupLayoutLogoAssetsReplicant!: Assets;

  get bgStyle(): object {
    const backgroundUri = this.layoutBgAssetsReplicant[0]?.url || '';
    const uri = backgroundUri ? `url(${backgroundUri})` : '';
    return {
      backgroundImage: uri,
    };
  }

  get logoUri(): string {
    return this.setupLayoutLogoAssetsReplicant[0]?.url || '';
  }
}
</script>

<style lang="scss" scoped>
  @import url('../styles/reset.css');
  @import url('../styles/common.css');
  @import url('../styles/setup.css');
  @import url('../styles/fade_animation.css');
</style>
