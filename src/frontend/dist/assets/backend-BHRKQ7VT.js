var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { p as Subscribable, q as pendingThenable, s as resolveEnabled, t as shallowEqualObjects, v as resolveStaleTime, w as noop, x as environmentManager, y as isValidTimeout, z as timeUntilStale, D as timeoutManager, E as focusManager, G as fetchState, I as replaceData, J as notifyManager, r as reactExports, K as shouldThrowError, N as useQueryClient, O as useInternetIdentity, Q as createActorWithConfig, V as Variant, W as Null, Y as Record, Z as Nat, _ as Text, $ as Int, a0 as Opt, a1 as Float64, a2 as Vec, a3 as Service, a4 as Func, a5 as HttpAgent, a6 as Actor } from "./index-B8T7PWVC.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actor = await createActorWithConfig(createActor2, {
        agentOptions: { identity }
      });
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const Id = Nat;
const BookingStatus = Variant({
  "cancelled": Null,
  "pending": Null,
  "completed": Null,
  "confirmed": Null
});
const Timestamp = Int;
const Booking = Record({
  "id": Id,
  "status": BookingStatus,
  "stayId": Opt(Id),
  "paymentStatus": Text,
  "trekId": Opt(Id),
  "name": Text,
  "createdAt": Timestamp,
  "travelDates": Text,
  "email": Text,
  "razorpaySignature": Opt(Text),
  "yatraId": Opt(Id),
  "razorpayOrderId": Opt(Text),
  "paymentId": Opt(Text),
  "amountINR": Nat,
  "phone": Text,
  "groupSize": Nat,
  "packageId": Opt(Id)
});
const BookingInput = Record({
  "stayId": Opt(Id),
  "trekId": Opt(Id),
  "name": Text,
  "travelDates": Text,
  "email": Text,
  "yatraId": Opt(Id),
  "amountINR": Nat,
  "phone": Text,
  "groupSize": Nat,
  "packageId": Opt(Id)
});
const RazorpayOrderResult = Record({
  "orderId": Text,
  "currency": Text,
  "amount": Nat,
  "keyId": Text
});
const BookingWithPaymentResult = Record({
  "bookingId": Text,
  "razorpayOrder": RazorpayOrderResult
});
const Slug = Text;
const BlogPost = Record({
  "id": Id,
  "title": Text,
  "content": Text,
  "readTimeMin": Nat,
  "slug": Slug,
  "authorName": Text,
  "publishedAt": Timestamp,
  "readTime": Nat,
  "imageUrl": Text,
  "excerpt": Text,
  "category": Text
});
const PackageTier = Record({
  "name": Text,
  "pricePerPerson": Nat
});
const PriceRange = Record({
  "minINR": Nat,
  "maxINR": Nat
});
const DayItinerary = Record({
  "day": Nat,
  "endAltitudeM": Nat,
  "title": Text,
  "startAltitudeM": Nat,
  "campsite": Text,
  "difficulty": Text,
  "description": Text,
  "landmarks": Vec(Text),
  "distanceKm": Float64,
  "mealsIncluded": Text,
  "route": Text
});
const Package = Record({
  "id": Id,
  "tiers": Vec(PackageTier),
  "duration": Text,
  "accommodationType": Text,
  "name": Text,
  "slug": Slug,
  "description": Text,
  "inclusions": Vec(Text),
  "priceRange": PriceRange,
  "imageUrl": Text,
  "groupSizeMax": Nat,
  "exclusions": Vec(Text),
  "category": Text,
  "groupSize": Text,
  "itinerary": Vec(DayItinerary),
  "problemSolved": Text
});
const Stay = Record({
  "id": Id,
  "nearbyAttractions": Vec(Text),
  "ownerNote": Text,
  "pricePerNightMax": Nat,
  "pricePerNightMin": Nat,
  "stayType": Text,
  "name": Text,
  "slug": Slug,
  "description": Text,
  "amenities": Vec(Text),
  "imageUrl": Text,
  "location": Text
});
const Trek = Record({
  "id": Id,
  "region": Text,
  "durationDays": Nat,
  "durationNights": Nat,
  "difficulty": Text,
  "name": Text,
  "slug": Slug,
  "description": Text,
  "inclusions": Vec(Text),
  "highlights": Vec(Text),
  "priceRange": PriceRange,
  "state": Text,
  "imageUrl": Text,
  "distanceKm": Float64,
  "maxAltitudeM": Nat,
  "exclusions": Vec(Text),
  "category": Text,
  "endPoint": Text,
  "maxAltitudeFt": Nat,
  "startPoint": Text,
  "itinerary": Vec(DayItinerary),
  "bestSeason": Text
});
const Yatra = Record({
  "id": Id,
  "spiritualSignificance": Text,
  "duration": Text,
  "helicopterInfo": Opt(Text),
  "temples": Vec(Text),
  "registration": Text,
  "name": Text,
  "slug": Slug,
  "description": Text,
  "season": Text,
  "priceRange": PriceRange,
  "permits": Text,
  "imageUrl": Text,
  "pujaGuide": Text,
  "templeTimings": Text,
  "registrationInfo": Text,
  "itinerary": Vec(DayItinerary),
  "route": Text,
  "accessibility": Text
});
const SearchResults = Record({
  "treks": Vec(Trek),
  "packages": Vec(Package),
  "blogPosts": Vec(BlogPost),
  "stays": Vec(Stay),
  "yatras": Vec(Yatra)
});
Service({
  "confirmBookingPayment": Func(
    [Nat, Text, Text],
    [Opt(Booking)],
    []
  ),
  "createBooking": Func([BookingInput], [Booking], []),
  "createBookingWithPayment": Func(
    [BookingInput],
    [BookingWithPaymentResult],
    []
  ),
  "getAllBlogPosts": Func([], [Vec(BlogPost)], ["query"]),
  "getAllBookings": Func([], [Vec(Booking)], ["query"]),
  "getAllPackages": Func([], [Vec(Package)], ["query"]),
  "getAllStays": Func([], [Vec(Stay)], ["query"]),
  "getAllTreks": Func([], [Vec(Trek)], ["query"]),
  "getAllYatras": Func([], [Vec(Yatra)], ["query"]),
  "getBlogPostBySlug": Func([Text], [Opt(BlogPost)], ["query"]),
  "getPackageBySlug": Func([Text], [Opt(Package)], ["query"]),
  "getStayBySlug": Func([Text], [Opt(Stay)], ["query"]),
  "getTrekBySlug": Func([Text], [Opt(Trek)], ["query"]),
  "getTreksByDifficulty": Func([Text], [Vec(Trek)], ["query"]),
  "getTreksByState": Func([Text], [Vec(Trek)], ["query"]),
  "getUserBookings": Func([Text], [Vec(Booking)], ["query"]),
  "getYatraBySlug": Func([Text], [Opt(Yatra)], ["query"]),
  "searchAll": Func([Text], [SearchResults], ["query"]),
  "searchTreks": Func([Text], [Vec(Trek)], ["query"]),
  "setRazorpayKeys": Func([Text, Text], [], [])
});
const idlFactory = ({ IDL }) => {
  const Id2 = IDL.Nat;
  const BookingStatus2 = IDL.Variant({
    "cancelled": IDL.Null,
    "pending": IDL.Null,
    "completed": IDL.Null,
    "confirmed": IDL.Null
  });
  const Timestamp2 = IDL.Int;
  const Booking2 = IDL.Record({
    "id": Id2,
    "status": BookingStatus2,
    "stayId": IDL.Opt(Id2),
    "paymentStatus": IDL.Text,
    "trekId": IDL.Opt(Id2),
    "name": IDL.Text,
    "createdAt": Timestamp2,
    "travelDates": IDL.Text,
    "email": IDL.Text,
    "razorpaySignature": IDL.Opt(IDL.Text),
    "yatraId": IDL.Opt(Id2),
    "razorpayOrderId": IDL.Opt(IDL.Text),
    "paymentId": IDL.Opt(IDL.Text),
    "amountINR": IDL.Nat,
    "phone": IDL.Text,
    "groupSize": IDL.Nat,
    "packageId": IDL.Opt(Id2)
  });
  const BookingInput2 = IDL.Record({
    "stayId": IDL.Opt(Id2),
    "trekId": IDL.Opt(Id2),
    "name": IDL.Text,
    "travelDates": IDL.Text,
    "email": IDL.Text,
    "yatraId": IDL.Opt(Id2),
    "amountINR": IDL.Nat,
    "phone": IDL.Text,
    "groupSize": IDL.Nat,
    "packageId": IDL.Opt(Id2)
  });
  const RazorpayOrderResult2 = IDL.Record({
    "orderId": IDL.Text,
    "currency": IDL.Text,
    "amount": IDL.Nat,
    "keyId": IDL.Text
  });
  const BookingWithPaymentResult2 = IDL.Record({
    "bookingId": IDL.Text,
    "razorpayOrder": RazorpayOrderResult2
  });
  const Slug2 = IDL.Text;
  const BlogPost2 = IDL.Record({
    "id": Id2,
    "title": IDL.Text,
    "content": IDL.Text,
    "readTimeMin": IDL.Nat,
    "slug": Slug2,
    "authorName": IDL.Text,
    "publishedAt": Timestamp2,
    "readTime": IDL.Nat,
    "imageUrl": IDL.Text,
    "excerpt": IDL.Text,
    "category": IDL.Text
  });
  const PackageTier2 = IDL.Record({
    "name": IDL.Text,
    "pricePerPerson": IDL.Nat
  });
  const PriceRange2 = IDL.Record({ "minINR": IDL.Nat, "maxINR": IDL.Nat });
  const DayItinerary2 = IDL.Record({
    "day": IDL.Nat,
    "endAltitudeM": IDL.Nat,
    "title": IDL.Text,
    "startAltitudeM": IDL.Nat,
    "campsite": IDL.Text,
    "difficulty": IDL.Text,
    "description": IDL.Text,
    "landmarks": IDL.Vec(IDL.Text),
    "distanceKm": IDL.Float64,
    "mealsIncluded": IDL.Text,
    "route": IDL.Text
  });
  const Package2 = IDL.Record({
    "id": Id2,
    "tiers": IDL.Vec(PackageTier2),
    "duration": IDL.Text,
    "accommodationType": IDL.Text,
    "name": IDL.Text,
    "slug": Slug2,
    "description": IDL.Text,
    "inclusions": IDL.Vec(IDL.Text),
    "priceRange": PriceRange2,
    "imageUrl": IDL.Text,
    "groupSizeMax": IDL.Nat,
    "exclusions": IDL.Vec(IDL.Text),
    "category": IDL.Text,
    "groupSize": IDL.Text,
    "itinerary": IDL.Vec(DayItinerary2),
    "problemSolved": IDL.Text
  });
  const Stay2 = IDL.Record({
    "id": Id2,
    "nearbyAttractions": IDL.Vec(IDL.Text),
    "ownerNote": IDL.Text,
    "pricePerNightMax": IDL.Nat,
    "pricePerNightMin": IDL.Nat,
    "stayType": IDL.Text,
    "name": IDL.Text,
    "slug": Slug2,
    "description": IDL.Text,
    "amenities": IDL.Vec(IDL.Text),
    "imageUrl": IDL.Text,
    "location": IDL.Text
  });
  const Trek2 = IDL.Record({
    "id": Id2,
    "region": IDL.Text,
    "durationDays": IDL.Nat,
    "durationNights": IDL.Nat,
    "difficulty": IDL.Text,
    "name": IDL.Text,
    "slug": Slug2,
    "description": IDL.Text,
    "inclusions": IDL.Vec(IDL.Text),
    "highlights": IDL.Vec(IDL.Text),
    "priceRange": PriceRange2,
    "state": IDL.Text,
    "imageUrl": IDL.Text,
    "distanceKm": IDL.Float64,
    "maxAltitudeM": IDL.Nat,
    "exclusions": IDL.Vec(IDL.Text),
    "category": IDL.Text,
    "endPoint": IDL.Text,
    "maxAltitudeFt": IDL.Nat,
    "startPoint": IDL.Text,
    "itinerary": IDL.Vec(DayItinerary2),
    "bestSeason": IDL.Text
  });
  const Yatra2 = IDL.Record({
    "id": Id2,
    "spiritualSignificance": IDL.Text,
    "duration": IDL.Text,
    "helicopterInfo": IDL.Opt(IDL.Text),
    "temples": IDL.Vec(IDL.Text),
    "registration": IDL.Text,
    "name": IDL.Text,
    "slug": Slug2,
    "description": IDL.Text,
    "season": IDL.Text,
    "priceRange": PriceRange2,
    "permits": IDL.Text,
    "imageUrl": IDL.Text,
    "pujaGuide": IDL.Text,
    "templeTimings": IDL.Text,
    "registrationInfo": IDL.Text,
    "itinerary": IDL.Vec(DayItinerary2),
    "route": IDL.Text,
    "accessibility": IDL.Text
  });
  const SearchResults2 = IDL.Record({
    "treks": IDL.Vec(Trek2),
    "packages": IDL.Vec(Package2),
    "blogPosts": IDL.Vec(BlogPost2),
    "stays": IDL.Vec(Stay2),
    "yatras": IDL.Vec(Yatra2)
  });
  return IDL.Service({
    "confirmBookingPayment": IDL.Func(
      [IDL.Nat, IDL.Text, IDL.Text],
      [IDL.Opt(Booking2)],
      []
    ),
    "createBooking": IDL.Func([BookingInput2], [Booking2], []),
    "createBookingWithPayment": IDL.Func(
      [BookingInput2],
      [BookingWithPaymentResult2],
      []
    ),
    "getAllBlogPosts": IDL.Func([], [IDL.Vec(BlogPost2)], ["query"]),
    "getAllBookings": IDL.Func([], [IDL.Vec(Booking2)], ["query"]),
    "getAllPackages": IDL.Func([], [IDL.Vec(Package2)], ["query"]),
    "getAllStays": IDL.Func([], [IDL.Vec(Stay2)], ["query"]),
    "getAllTreks": IDL.Func([], [IDL.Vec(Trek2)], ["query"]),
    "getAllYatras": IDL.Func([], [IDL.Vec(Yatra2)], ["query"]),
    "getBlogPostBySlug": IDL.Func([IDL.Text], [IDL.Opt(BlogPost2)], ["query"]),
    "getPackageBySlug": IDL.Func([IDL.Text], [IDL.Opt(Package2)], ["query"]),
    "getStayBySlug": IDL.Func([IDL.Text], [IDL.Opt(Stay2)], ["query"]),
    "getTrekBySlug": IDL.Func([IDL.Text], [IDL.Opt(Trek2)], ["query"]),
    "getTreksByDifficulty": IDL.Func([IDL.Text], [IDL.Vec(Trek2)], ["query"]),
    "getTreksByState": IDL.Func([IDL.Text], [IDL.Vec(Trek2)], ["query"]),
    "getUserBookings": IDL.Func([IDL.Text], [IDL.Vec(Booking2)], ["query"]),
    "getYatraBySlug": IDL.Func([IDL.Text], [IDL.Opt(Yatra2)], ["query"]),
    "searchAll": IDL.Func([IDL.Text], [SearchResults2], ["query"]),
    "searchTreks": IDL.Func([IDL.Text], [IDL.Vec(Trek2)], ["query"]),
    "setRazorpayKeys": IDL.Func([IDL.Text, IDL.Text], [], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async confirmBookingPayment(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.confirmBookingPayment(arg0, arg1, arg2);
        return from_candid_opt_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.confirmBookingPayment(arg0, arg1, arg2);
      return from_candid_opt_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async createBooking(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createBooking(to_candid_BookingInput_n8(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Booking_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createBooking(to_candid_BookingInput_n8(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Booking_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async createBookingWithPayment(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createBookingWithPayment(to_candid_BookingInput_n8(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createBookingWithPayment(to_candid_BookingInput_n8(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async getAllBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllBlogPosts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllBlogPosts();
      return result;
    }
  }
  async getAllBookings() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllBookings();
        return from_candid_vec_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllBookings();
      return from_candid_vec_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllPackages() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllPackages();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllPackages();
      return result;
    }
  }
  async getAllStays() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllStays();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllStays();
      return result;
    }
  }
  async getAllTreks() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllTreks();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllTreks();
      return result;
    }
  }
  async getAllYatras() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllYatras();
        return from_candid_vec_n11(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllYatras();
      return from_candid_vec_n11(this._uploadFile, this._downloadFile, result);
    }
  }
  async getBlogPostBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPostBySlug(arg0);
        return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPostBySlug(arg0);
      return from_candid_opt_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async getPackageBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getPackageBySlug(arg0);
        return from_candid_opt_n15(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPackageBySlug(arg0);
      return from_candid_opt_n15(this._uploadFile, this._downloadFile, result);
    }
  }
  async getStayBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getStayBySlug(arg0);
        return from_candid_opt_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getStayBySlug(arg0);
      return from_candid_opt_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTrekBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTrekBySlug(arg0);
        return from_candid_opt_n17(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTrekBySlug(arg0);
      return from_candid_opt_n17(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTreksByDifficulty(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTreksByDifficulty(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTreksByDifficulty(arg0);
      return result;
    }
  }
  async getTreksByState(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTreksByState(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTreksByState(arg0);
      return result;
    }
  }
  async getUserBookings(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserBookings(arg0);
        return from_candid_vec_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserBookings(arg0);
      return from_candid_vec_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async getYatraBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getYatraBySlug(arg0);
        return from_candid_opt_n18(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getYatraBySlug(arg0);
      return from_candid_opt_n18(this._uploadFile, this._downloadFile, result);
    }
  }
  async searchAll(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchAll(arg0);
        return from_candid_SearchResults_n19(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchAll(arg0);
      return from_candid_SearchResults_n19(this._uploadFile, this._downloadFile, result);
    }
  }
  async searchTreks(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchTreks(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchTreks(arg0);
      return result;
    }
  }
  async setRazorpayKeys(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setRazorpayKeys(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setRazorpayKeys(arg0, arg1);
      return result;
    }
  }
}
function from_candid_BookingStatus_n4(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n5(_uploadFile, _downloadFile, value);
}
function from_candid_Booking_n2(_uploadFile, _downloadFile, value) {
  return from_candid_record_n3(_uploadFile, _downloadFile, value);
}
function from_candid_SearchResults_n19(_uploadFile, _downloadFile, value) {
  return from_candid_record_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Yatra_n12(_uploadFile, _downloadFile, value) {
  return from_candid_record_n13(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Booking_n2(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n14(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n15(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n17(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n18(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Yatra_n12(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    spiritualSignificance: value.spiritualSignificance,
    duration: value.duration,
    helicopterInfo: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.helicopterInfo)),
    temples: value.temples,
    registration: value.registration,
    name: value.name,
    slug: value.slug,
    description: value.description,
    season: value.season,
    priceRange: value.priceRange,
    permits: value.permits,
    imageUrl: value.imageUrl,
    pujaGuide: value.pujaGuide,
    templeTimings: value.templeTimings,
    registrationInfo: value.registrationInfo,
    itinerary: value.itinerary,
    route: value.route,
    accessibility: value.accessibility
  };
}
function from_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    treks: value.treks,
    packages: value.packages,
    blogPosts: value.blogPosts,
    stays: value.stays,
    yatras: from_candid_vec_n11(_uploadFile, _downloadFile, value.yatras)
  };
}
function from_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_BookingStatus_n4(_uploadFile, _downloadFile, value.status),
    stayId: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.stayId)),
    paymentStatus: value.paymentStatus,
    trekId: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.trekId)),
    name: value.name,
    createdAt: value.createdAt,
    travelDates: value.travelDates,
    email: value.email,
    razorpaySignature: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.razorpaySignature)),
    yatraId: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.yatraId)),
    razorpayOrderId: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.razorpayOrderId)),
    paymentId: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.paymentId)),
    amountINR: value.amountINR,
    phone: value.phone,
    groupSize: value.groupSize,
    packageId: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.packageId))
  };
}
function from_candid_variant_n5(_uploadFile, _downloadFile, value) {
  return "cancelled" in value ? "cancelled" : "pending" in value ? "pending" : "completed" in value ? "completed" : "confirmed" in value ? "confirmed" : value;
}
function from_candid_vec_n10(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Booking_n2(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n11(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Yatra_n12(_uploadFile, _downloadFile, x));
}
function to_candid_BookingInput_n8(_uploadFile, _downloadFile, value) {
  return to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_record_n9(_uploadFile, _downloadFile, value) {
  return {
    stayId: value.stayId ? candid_some(value.stayId) : candid_none(),
    trekId: value.trekId ? candid_some(value.trekId) : candid_none(),
    name: value.name,
    travelDates: value.travelDates,
    email: value.email,
    yatraId: value.yatraId ? candid_some(value.yatraId) : candid_none(),
    amountINR: value.amountINR,
    phone: value.phone,
    groupSize: value.groupSize,
    packageId: value.packageId ? candid_some(value.packageId) : candid_none()
  };
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  useQuery as a,
  createActor as c,
  useActor as u
};
