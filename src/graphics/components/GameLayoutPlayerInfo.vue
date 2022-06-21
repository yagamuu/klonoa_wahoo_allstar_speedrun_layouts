<template>
  <div class="broadcast-information">
    <div class="broadcast-information-footer">
      <div class="runner">
        <p>RUNNER：<span>{{runners}}</span></p>
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
import * as util from '@kwas_layouts/graphics/util/format';

@Component
export default class GameLayoutPlayerInfo extends Vue {
  @Getter readonly runDataActiveRunReplicant!: RunDataActiveRun;
  @Getter readonly timerReplicant!: Timer;

  get runners(): string {
    if (!this.runDataActiveRunReplicant) {
      return '';
    }

    return this.runDataActiveRunReplicant.teams.flatMap(
      (team) => team.players.flatMap((player) => player.name),
    ).join('、');
  }

  get estimate(): string {
    const estimateS = this.runDataActiveRunReplicant?.estimateS ?? 0;
    return util.formatSeconds(estimateS);
  }

  get time(): string {
    const time = this.timerReplicant?.time ?? 0;
    return time.at(0) !== '0' ? time : time.slice(1);
  }
}
</script>

<style lang="scss" scoped>
</style>
