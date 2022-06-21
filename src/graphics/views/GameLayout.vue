<template>
  <div id="gameLayoutRoot" :style="style">
    <div id="container">
      <div class="container-inner">
        <logo :backgroundAssets="gameLayoutLogoAssetsReplicant" />
        <div class="main">
          <div class="information-box">
            <div class="gametitle">
              <p>{{game}}</p><span>({{category}})</span>
            </div>
            <div class="commentator-information"/>
            <img class="picture" :src="bgUri">
          </div>
          <game-layout-player-info/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import type { Assets } from '@kwas_layouts/types/schemas/assets';
import { RunDataActiveRun } from '@kwas_layouts/types/schemas/speedcontrol';
import Logo from '../components/Logo.vue';
import GameLayoutPlayerInfo from '../components/GameLayoutPlayerInfo.vue';

@Component({
  components: {
    Logo,
    GameLayoutPlayerInfo,
  },
})
export default class GameLayout extends Vue {
  @Getter readonly layoutBgAssetsReplicant!: Assets;
  @Getter readonly gameLayoutLogoAssetsReplicant!: Assets;
  @Getter readonly runDataActiveRunReplicant!: RunDataActiveRun;

  get game(): string {
    return this.runDataActiveRunReplicant?.game ?? '';
  }

  get category(): string {
    return this.runDataActiveRunReplicant?.category ?? '';
  }

  @Prop({ type: String, default: '' })
  readonly clipPath!: string;

  get bgUri(): string {
    return this.layoutBgAssetsReplicant[0]?.url || '';
  }

  get style(): object {
    const backgroundUri = this.layoutBgAssetsReplicant[0]?.url || '';
    const uri = backgroundUri ? `url(${backgroundUri})` : '';
    const clip = this.clipPath ? `polygon(${this.clipPath})` : '';

    return {
      backgroundImage: uri,
      clipPath: clip,
    };
  }
}
</script>
