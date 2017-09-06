import * as outputStoreActions from './outputStore';
import * as outputActionsActions from './outputActions';
import * as outputComponentsActions from './outputComponents';
import _ from 'lodash';

const actions = _.extend({}, outputStoreActions, outputActionsActions, outputComponentsActions);

export default actions;