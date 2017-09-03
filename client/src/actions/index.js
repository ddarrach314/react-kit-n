import * as outputStoreActions from './outputStore';
import * as outputActionsActions from './outputActions';
import _ from 'lodash';

const actions = _.extend({}, outputStoreActions, outputActionsActions);

export default actions;