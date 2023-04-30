import { flow, types } from 'mobx-state-tree';
import * as projectsApi from '../../api/films';
import { onlyUnique } from '../../utils/functions';
import { checkError } from '../../api/utils/errors';
import { Pageable } from './model/model';
import Project from './project';

const ProjectsStore = types
  .model('ProjectsStore', {
    loading: false,
    list: types.optional(types.array(Project), []),
    activeProject: types.maybe(Project),
    pageable: types.optional(Pageable, {}),
    itemsOnPage: types.optional(types.number, 10),
  })
  .actions((self) => ({
    markLoading: (value) => {
      self.loading = value;
    },
    addProject: flow(function* (projectName) {
      try {
        const project = yield projectsApi.createProject({ name: projectName });
        self.list.push(project);
      } catch (err) {
        checkError(err);
      }
    }),
    updateProject: flow(function* (projectId, data) {
      try {
        const updatedProject = yield projectsApi.updateProject(projectId, data);
        const listItem = self.list.find((p) => p.id === projectId);
        listItem?.updateField('name', updatedProject.name);
      } catch (err) {
        checkError(err);
      }
    }),
    deleteProject: flow(function* (projectId) {
      try {
        yield projectsApi.deleteProject(projectId);
        self.list = self.list.filter((i) => i.id !== projectId);
      } catch (err) {
        checkError(err);
      }
    }),
    getProjects: flow(function* (pageNumber, initial = false) {
      try {
        const { data, pageable } = yield projectsApi.getFilms({
          itemsOnPage: self.itemsOnPage,
          pageNumber,
        });
        if (initial) {
          self.list = data;
        } else {
          self.list = [...self.list, ...data].filter(onlyUnique);
        }
        self.pageable = pageable;
      } catch (err) {
        checkError(err);
      }
    }),
    clearProjects() {
      self.list = [];
    },
    setPerPage(perPage) {
      self.itemsOnPage = perPage;
    },
    getProject: flow(function* (projectId) {
      try {
        self.activeProject = yield projectsApi.getProject(projectId);
      } catch (err) {
        checkError(err);
      }
    }),
    getProjectCountries: flow(function* (projectId) {
      try {
        self.countries = yield projectsApi.getProjectCountries(projectId);
      } catch (err) {
        checkError(err);
      }
    }),
  }));

export default ProjectsStore;
