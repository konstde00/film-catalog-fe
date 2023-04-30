import { types } from 'mobx-state-tree';
import { StraightDiscount } from './straightDiscount/straightDiscount';
import { OutcomeBasedModel } from './outcomeBased/outcomeBased';
import { FinanceBasedModel } from './financeBased/financeBased';

export const Model = types
  .model('Model', {
    id: types.maybe(types.number),
    name: types.maybeNull(types.string),
    color: types.maybeNull(types.string),
    straightDiscount: types.optional(StraightDiscount, {}),
    outcomeBasedModel: types.optional(OutcomeBasedModel, {}),
    financeBasedModel: types.optional(FinanceBasedModel, {}),
    lastUpdate: types.maybeNull(types.string),
  })
  .actions((self) => ({
    updateField(field, value) {
      self[field] = value;
    },
  }));

export const Pageable = types.model('Page Model', {
  first: types.optional(types.boolean, true),
  empty: types.optional(types.boolean, true),
  last: types.optional(types.boolean, true),
  totalElement: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 0),
  pageNumber: types.optional(types.number, 0),
});
