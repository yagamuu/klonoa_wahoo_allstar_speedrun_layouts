<template>
  <div class="broadcast-information">
    <div class="broadcast-information-footer">
      <div class="runner">
        <p>RUNNER：<span>{{runners}}</span></p>
        <div class="runner_sns">
          <p :class="[currentSocial === 'twitch' ? 'active' : '']">
            <font-awesome-icon style="text-shadow: none; color: #6441a5" :icon="['fab', 'twitch']"/>
            <span>{{twitch}}</span>
          </p>
          <p :class="[currentSocial === 'twitter' ? 'active' : '']">
            <font-awesome-icon style="text-shadow: none; color: #00acee"
             :icon="['fab', 'twitter']"/>
            <span>@{{twitter}}</span>
          </p>
        </div>
      </div>
      <div class="time">
        <p class="elapsed-time">{{time}}</p>
        <span class="est">／ EST {{estimate}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { RunDataActiveRun, Timer } from '@kwas_layouts/types/schemas/speedcontrol';
import { storeModule } from '@kwas_layouts/store/gameLayoutStore';
import * as util from '@kwas_layouts/graphics/util/format';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  components: {
    FontAwesomeIcon,
  },
})
export default class GameLayoutPlayerInfo extends Vue {
  @Getter readonly runDataActiveRunReplicant!: RunDataActiveRun;
  @Getter readonly timerReplicant!: Timer;
  @Getter readonly currentSocial!: string;

  get runners(): string {
    if (!this.runDataActiveRunReplicant) {
      return '';
    }

    return this.runDataActiveRunReplicant.teams.flatMap(
      (team) => team.players.flatMap((player) => player.name),
    ).join('、');
  }

  get twitch(): string {
    return this.runDataActiveRunReplicant?.customData.player_twitch ?? '';
  }

  get twitter(): string {
    return this.runDataActiveRunReplicant?.customData.player_twitter ?? '';
  }

  get estimate(): string {
    const estimateS = this.runDataActiveRunReplicant?.estimateS ?? 0;
    return util.formatSeconds(estimateS);
  }

  get time(): string {
    const time = this.timerReplicant?.time ?? 0;
    return time.at(0) !== '0' ? time : time.slice(1);
  }

  created(): void {
    setInterval(() => {
      storeModule.nextDisplaySNSInformation();
    }, 20000);
  }
}

library.add(faTwitch, faTwitter);
</script>

<style lang="scss" scoped>
</style>
