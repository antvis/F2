import InteractionController from '../controller/interaction';

class InteractionMixin {

  interaction: InteractionController;

  createInteractionController({ chart }) {
    return new InteractionController(chart);
  }

  setInteraction(type, cfg) {
    this.interaction.createInteraction(type, cfg)
  }

  initInteractions() {
    this.interaction.init();
  }

}


export default InteractionMixin;