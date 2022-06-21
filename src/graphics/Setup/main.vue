<template>
  <div id="container">
    <div class="setup-background-img animation" :style="bgStyle"/>
    <div class="setup-background-img animation2" :style="bgStyle"/>
    <div class="container-inner">
        <logo :backgroundAssets="setupLayoutLogoAssetsReplicant"/>
        <div class="main">
          <div class="middle_container"/>
          <setup-schedule/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import type { Assets } from '@kwas_layouts/types/schemas/assets';
import Logo from '../components/Logo.vue';
import SetupSchedule from '../components/SetupSchedule.vue';

@Component({
  components: {
    SetupSchedule,
    Logo,
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
}
</script>

<style lang="scss" scoped>
  @import url('../styles/reset.css');
  @import url('../styles/common.css');
  @import url('../styles/setup.css');
  @import url('../styles/fade_animation.css');
</style>
