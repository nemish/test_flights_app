export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}


export function createAsyncAction(conf) {
  var startActionCreator = makeActionCreator(conf.startEvent, 'data');
  var successActionCreator = makeActionCreator(conf.successEvent, 'data');
  var failActionCreator = null;

  if (conf.failEvent) {
    failActionCreator = makeActionCreator(conf.failEvent, 'data');
  }

  return function makeRequest(payload) {
    return function (dispatch) {
      dispatch(startActionCreator(payload));
      let url = conf.url;
      let method = conf.method || 'get';
      if (typeof url === "function") {
        url = url(payload);
      }

      if (typeof method === "function") {
        method = method(payload);
      }

      if (method == 'get' && payload) {
         url += jQuery.param(payload);
      }

      return fetch(url, {
          method: method
      })
      .then(resp => resp.json())
      .then(json => dispatch(successActionCreator(json)))
      .catch(resp => dispatch(failActionCreator(resp)));
    }
  }
}