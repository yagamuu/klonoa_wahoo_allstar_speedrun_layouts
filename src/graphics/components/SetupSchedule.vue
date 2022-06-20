<template>
  <div class="next-information-box">
    <div class="next-information-box-flex">
      <p class="next-information-box-gametitle">
        NEXTGAME：<span>{{game}}</span>
        <span class="category">（{{category}}）</span>
      </p>
    </div>
    <div class="next-information-box-flex">
      <p class="next-information-box-runner_name">
        RUNNER：<span>{{runners}}</span>
      </p>
      <p class="next-information-box-est">EST：<span>{{estimate}}</span></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { RunDataActiveRun } from '@kwas_layouts/types/schemas/speedcontrol';
import * as util from '@kwas_layouts/graphics/util/format';

@Component({
  components: {
  },
})
export default class SetupSchedule extends Vue {
  @Getter readonly runDataActiveRunReplicant!: RunDataActiveRun;

  get game(): string {
    return this.runDataActiveRunReplicant?.game ?? '';
  }

  get category(): string {
    return this.runDataActiveRunReplicant?.category ?? '';
  }

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
}
</script>

<style lang="scss" scoped>
</style>
