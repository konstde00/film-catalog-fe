import { flow, types } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';
import { Model, Pageable } from './model/model';
import { onlyUnique, replaceUrl } from '../../utils/functions';
import routes from '../../routes/routes.json';
import { createModel, deleteModel, getModels, updateModel } from '../../api/models';
import { checkError } from '../../api/utils/errors';

const Project = types
  .model('Project', {
    id: types.maybe(types.identifierNumber),
    name: types.maybe(types.string),
    createdBy: types.maybe(types.string),
    createdDate: types.maybe(types.string),
    lastUpdate: types.maybe(types.string),
    lastModifiedDate: types.maybe(types.string),
    models: types.optional(types.array(Model), []),
    pageable: types.optional(Pageable, {}),
    itemsOnPage: types.optional(types.number, 10),
  })
  .views((self) => ({
    get outputListOfTabs() {
      return self.models.map((model) => ({
        id: uuidv4(),
        name: model.name,
        path: replaceUrl(routes.SIMULATION_CREATE_SCENARIO_MODEL_OUTPUT_PAGE, {
          projectId: self.id,
          modelId: model.id,
        }),
      }));
    },
  }))
  .actions((self) => ({
    updateField(field, value) {
      self[field] = value;
    },
    getProjectModels: flow(function* (scenarioId, pageNumber, initial = false) {
      try {
        const { data, pageable } = yield getModels({
          projectId: self.id,
          scenarioId,
          pageNumber,
          itemsOnPage: self.itemsOnPage,
        });
        if (initial) {
          self.models = data;
        } else {
          self.models = [...self.models, ...data].filter(onlyUnique);
        }
        self.pageable = pageable;
      } catch (err) {
        checkError(err);
      }
    }),
    clearModels() {
      self.models = [];
    },
    setPerPage(perPage) {
      self.itemsOnPage = perPage;
    },
    addModel: flow(function* ({ projectId, scenarioId, name, color }) {
      try {
        const newModel = yield createModel({
          projectId,
          scenarioId,
          name,
          color,
        });
        self.models.unshift(newModel);
      } catch (err) {
        checkError(err);
      }
    }),
    updateModel: flow(function* ({ projectId, modelId, scenarioId, name, color }) {
      try {
        const newModel = yield updateModel({
          projectId,
          modelId,
          scenarioId,
          name,
          color,
        });

        const model = self.models.find((m) => m.id === modelId);
        model?.updateField('name', newModel?.name);
      } catch (err) {
        checkError(err);
      }
    }),
    deleteModel: flow(function* ({ projectId, modelId, scenarioId, name }) {
      try {
        yield deleteModel({
          projectId,
          modelId,
          scenarioId,
          name,
        });
        self.models = self.models.filter((m) => m.id !== modelId);
      } catch (err) {
        checkError(err);
      }
    }),
  }));

export default Project;
