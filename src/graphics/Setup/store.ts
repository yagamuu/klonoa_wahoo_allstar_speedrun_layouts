import { ReplicantModule, ReplicantTypes } from '@kwas_layouts/browser_shared/replicant_store';
import type { Assets } from '@kwas_layouts/types/schemas/assets';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import type { RunDataActiveRun } from '@kwas_layouts/types/schemas/speedcontrol';

Vue.use(Vuex);

@Module({ name: 'OurModule' })
class OurModule extends VuexModule {
  // Helper getter to return all replicants.
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

  get setupLayoutLogoAssetsReplicant(): Assets {
    return this.reps.setupLayoutLogoAssetsReplicant;
  }
}

const store = new Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  modules: { ReplicantModule, OurModule },
});
export default store;
export const storeModule = getModule(OurModule, store);
