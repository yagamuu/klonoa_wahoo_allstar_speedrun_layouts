import { ReplicantModule, ReplicantTypes } from '@kwas_layouts/browser_shared/replicant_store';
import type { Assets } from '@kwas_layouts/types/schemas/assets';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import type { RunDataActiveRun, Timer } from '@kwas_layouts/types/schemas/speedcontrol';

Vue.use(Vuex);

@Module({ name: 'OurModule' })
class GameLayoutModule extends VuexModule {
  // Helper getter to return all replicants.

  displaySNSInformationState = 0;

  get displaySNSInformation() {
    return this.displaySNSInformationState;
  }

  get existSocials(): string[] {
    const socials = [];

    if (this.runDataActiveRunReplicant?.customData.player_twitch) {
      socials.push('twitch');
    }
    if (this.runDataActiveRunReplicant?.customData.player_twitter) {
      socials.push('twitter');
    }

    return socials;
  }

  get currentSocial(): string {
    return this.existSocials[this.displaySNSInformation] || '';
  }

  get reps(): ReplicantTypes {
    return this.context.rootState.ReplicantModule.reps;
  }

  get runDataActiveRunReplicant(): RunDataActiveRun {
    return this.reps.runDataActiveRunReplicant;
  }

  get layoutBgAssetsReplicant(): Assets {
    return this.reps.layoutBgAssetsReplicant;
  }

  get gameLayoutLogoAssetsReplicant(): Assets {
    return this.reps.gameLayoutLogoAssetsReplicant;
  }

  get timerReplicant(): Timer {
    return this.reps.timerReplicant;
  }

  @Mutation
  NEXT_DISPLAY_SNS_INFORMATION(exists: string[]): void {
    this.displaySNSInformationState = (this.displaySNSInformationState + 1) % exists.length;
  }

  @Action
  nextDisplaySNSInformation(): void {
    this.NEXT_DISPLAY_SNS_INFORMATION(this.existSocials);
  }
}

const store = new Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  modules: { ReplicantModule, GameLayoutModule },
});
export default store;
export const storeModule = getModule(GameLayoutModule, store);
