import Marionette from 'backbone.marionette';
import ItemView from './views/ItemView';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new ItemView());
  }
});
