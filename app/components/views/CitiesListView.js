import Marionette from 'backbone.marionette';
import CitiesListItem from './CitiesListItem';

export default Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: CitiesListItem
});
