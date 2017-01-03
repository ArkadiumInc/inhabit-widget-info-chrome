// ============ Utility Methods - move to module or, better, someway attach lodash instead =======
let _interactiveInhabit = {
  get: interactiveInhabitGetByPath,
  has: interactiveInhabitHasByPath
};
function interactiveInhabitFindObjectProperty(obj: Object, path: string, separator: string) {
  if (!path) {
    return;
  }
  let propertyNames = path.split(separator);
  if (!(propertyNames instanceof Array)) {
    return;
  }
  let property = obj;
  for (let propertyName of propertyNames) {
    property = property[propertyName];
    if (!property) {
      return;
    }
  }
  return property;
}

function interactiveInhabitGetByPath(obj: Object, path: string, defaultValue ?: any, separator = '.') {
  let foundProperty = interactiveInhabitFindObjectProperty(obj, path, separator);
  if (!foundProperty) {
    return defaultValue;
  }
  return foundProperty;
}

function interactiveInhabitHasByPath(obj: Object, path: string, separator = '.') {
  return (interactiveInhabitFindObjectProperty(obj, path, separator) !== undefined);
}

// =============== Data Retrieval Methods =============================

interface Window {
  __untochedPresCenterConfigVarName__: string;
}

function interactiveInhabitGetConextUrlFromWidget() {
  let txtClassSrv = _interactiveInhabit.get(window, '__ark_app__.apps.app.componentManager.instances.textClassificationService', null);
  if (!txtClassSrv) {
    return '';
  }
  return txtClassSrv.currentUrl;
}

function interactiveInhabitGetPresCenterConfig() {
  if (window.__untochedPresCenterConfigVarName__) {
    let generalConfig = window[window.__untochedPresCenterConfigVarName__] || [];
    if (generalConfig &&
      generalConfig.config instanceof Array) {
      let presCenterConfig = '[]';
      generalConfig.config.map(function (confEntry: any) {
        if (confEntry.id === 'contentPresenter') {
          presCenterConfig = JSON.stringify(confEntry.cfg);
        }
      });
      return presCenterConfig;
    }
  }
  return '[]';
}

function interactiveInhabitCollectSemanticEntities(contextualUrl, textClassificationCacheStorageKey) {
  let entities = [];
  let cacheData = window.localStorage.getItem(textClassificationCacheStorageKey) || '{}';
  let data = JSON.parse(cacheData);
  if (!contextualUrl || !data.val) {
    return entities;
  }
  for (let provider in data.val) {
    let allInternalResults = _interactiveInhabit.get(data.val[provider], 'Entities,' + contextualUrl, [], ',');
    for (let internalEntity of  allInternalResults) {
      let entity = {
        providerName: provider,
        results: []
      };
      for (let property in internalEntity) {
        entity.results.push(
          { // equals SemanticEntity class structure
            kind: property,
            value: JSON.stringify(internalEntity[property])
          });
      }
      entities.push(entity);
    }
  }

  return entities;
}

function interactiveInhabitCollectTaxonomy(contextualUrl, textClassificationCacheStorageKey) {
  let taxonomyRes = [];
  let cacheData = window.localStorage.getItem(textClassificationCacheStorageKey) || '{}';
  let data = JSON.parse(cacheData);
  if (!contextualUrl || !data.val) {
    return taxonomyRes;
  }
  for (let provider in data.val) {
    let allInternalResults = _interactiveInhabit.get(data.val[provider], 'Taxonomy,' + contextualUrl, [], ',');
    for (let internalTaxonomy of  allInternalResults) {
      let taxonomy = {
        providerName: provider,
        results: []
      };
      for (let property in internalTaxonomy) {
        taxonomy.results.push(
          { // equals SemanticEntity class structure
            kind: property,
            value: JSON.stringify(internalTaxonomy[property])
          });
      }
      taxonomyRes.push(taxonomy);
    }
  }

  return taxonomyRes;
}
function interactiveInhabitCollectEventMessages(messageLogStorageKey) {
  let storageData = window[messageLogStorageKey] || [];
  return storageData;
}

function interactiveInhabitCollectResults(textClassificationCacheStorageKey, messageLogStorageKey) {
  var interactiveInhabitContextualUrl = interactiveInhabitGetConextUrlFromWidget();
  return {
    contUrl: interactiveInhabitContextualUrl,
    entities: interactiveInhabitCollectSemanticEntities(interactiveInhabitContextualUrl, textClassificationCacheStorageKey),
    taxonomy: interactiveInhabitCollectTaxonomy(interactiveInhabitContextualUrl, textClassificationCacheStorageKey),
    messages: interactiveInhabitCollectEventMessages(messageLogStorageKey),
    presCntCnf: interactiveInhabitGetPresCenterConfig()
  };
}
