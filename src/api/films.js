import { fetchRequest } from "../api/utils/request";
export const getFilms = async ({ pageNumber, itemsOnPage }) => {
  const list = await fetchRequest({
    url: 'http://localhost:8080/api/films/v1',
    method: 'get',
    params: {
      pageNumber,
      itemsOnPage,
    },
  });

  return list || [];
};

export const getProject = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}`,
    method: 'get',
  });
};

export const createProject = async ({ name }) => {
  return fetchRequest({
    url: '/api/projects',
    method: 'post',
    body: { name },
  });
};

export const deleteProject = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/delete-project`,
    method: 'delete',
  });
};
export const updateProject = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/rename-project`,
    method: 'put',
    body,
  });
};

export const getGeneralAssumption = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/general-assumption`,
    method: 'get',
  });
};

export const updateGeneralAssumption = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/general-assumption`,
    method: 'put',
    body,
  });
};

export const getPatientVolume = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/patient-volume`,
  });
};

export const updatePatientVolumes = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/patient-volume`,
    method: 'put',
    body,
  });
};

export const getPriceBasisList = async () => {
  return fetchRequest({
    url: '/api/projects/general-assumption/price-basis',
  });
};
export const getTreatmentPrices = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/treatment-price`,
  });
};
export const updateTreatmentPrices = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/treatment-price`,
    method: 'put',
    body: {
      data: body,
    },
  });
};

export const getPointsByKaplanMaierCurve = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-kaplan-maier-curve`,
  });
};

export const getKaplanMeierCurveTimeUnit = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-kaplan-meier-curve/time-unit-type`,
  });
};
export const updateKaplanMeierCurveTimeUnit = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-kaplan-meier-curve/time-unit-type`,
    method: 'put',
    body,
  });
};

export const getMeasures = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/measures`,
  });
};

export const updateMeasures = async (projectId, data) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/measures`,
    method: 'put',
    body: data,
  });
};

export const getMeasuresWithSubgroups = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/measures-subgroups`,
  });
};

export const saveMeasuresSubgroups = async (projectId, data) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/measures-subgroups`,
    method: 'put',
    body: data,
  });
};

export const savePointsByKaplanMaierCurve = async (projectId, points) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-kaplan-maier-curve`,
    method: 'put',
    body: points,
  });
};
export const getProjectCountries = async (projectId) => {
  return fetchRequest({
    url: `/api/countries/${projectId}`,
  });
};

export const getCountriesAndCurrencies = async () => {
  return fetchRequest({
    url: '/api/projects/v2/settings/country-currency',
  });
};

export const updateCountriesAndCurrencies = async (projectId, body) => {
  return fetchRequest({
    url: '/api/projects/v2/settings/country-currency',
    method: 'put',
    body,
  });
};

export const getCurrencyConversation = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/settings/currency-conversion`,
  });
};

export const updateCurrencyConversation = async (projectId, body) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/settings/currency-conversion`,
    method: 'put',
    body,
  });
};

export const getAllMeasures = async ({ projectId }) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/get-all-measures`,
  });
};

export const getCurveMeasures = async (projectId) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-kaplan-meier-curve`,
  });
};
export const changeMeasureColor = async ({ projectId, payload }) => {
  return fetchRequest({
    url: `/api/projects/${projectId}/efficacy/by-time-point-block/change-color`,
    method: 'put',
    body: payload,
  });
};

export const getSubgroupPairs = async ({ projectId }) => {
  return fetchRequest({
    url: `api/projects/${projectId}/indication-subgroup-pairs`,
  });
};
