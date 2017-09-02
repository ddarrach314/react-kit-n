import * as outputStoreActions from './outputStore';
import * as outputActionsActions from './outputActions';
import _ from 'lodash';

export const actions = _.extend({}, outputStoreActions, outputActionsActions);