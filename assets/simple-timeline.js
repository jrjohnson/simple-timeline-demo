"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('simple-timeline/adapters/application', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  var RESTAdapter = _emberData['default'].RESTAdapter;
  exports['default'] = RESTAdapter.extend({});
});
define('simple-timeline/app', ['exports', 'ember', 'simple-timeline/resolver', 'ember-load-initializers', 'simple-timeline/config/environment'], function (exports, _ember, _simpleTimelineResolver, _emberLoadInitializers, _simpleTimelineConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _simpleTimelineConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _simpleTimelineConfigEnvironment['default'].podModulePrefix,
    Resolver: _simpleTimelineResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _simpleTimelineConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('simple-timeline/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'simple-timeline/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _simpleTimelineConfigEnvironment) {

  var name = _simpleTimelineConfigEnvironment['default'].APP.name;
  var version = _simpleTimelineConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('simple-timeline/components/fa-icon', ['exports', 'ember-cli-font-awesome/components/fa-icon'], function (exports, _emberCliFontAwesomeComponentsFaIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaIcon['default'];
    }
  });
});
define('simple-timeline/components/fa-list-icon', ['exports', 'ember-cli-font-awesome/components/fa-list-icon'], function (exports, _emberCliFontAwesomeComponentsFaListIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaListIcon['default'];
    }
  });
});
define('simple-timeline/components/fa-list', ['exports', 'ember-cli-font-awesome/components/fa-list'], function (exports, _emberCliFontAwesomeComponentsFaList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaList['default'];
    }
  });
});
define('simple-timeline/components/fa-stack', ['exports', 'ember-cli-font-awesome/components/fa-stack'], function (exports, _emberCliFontAwesomeComponentsFaStack) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFontAwesomeComponentsFaStack['default'];
    }
  });
});
define('simple-timeline/components/focus-timeline', ['exports', 'ember'], function (exports, _ember) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  exports['default'] = Component.extend({
    steps: null,
    firstDay: null,
    lastDay: null,
    totalDays: null,
    classNames: ['focus-timeline'],
    start: computed('firstDay', 'lastDay', function () {
      return [this.get('firstDay'), this.get('lastDay')];
    }),
    range: computed('steps', function () {
      return {
        'min': 0,
        'max': this.get('steps')
      };
    })
  });
});
define('simple-timeline/components/pikaday-input', ['exports', 'ember', 'ember-pikaday/components/pikaday-input'], function (exports, _ember, _emberPikadayComponentsPikadayInput) {
  exports['default'] = _emberPikadayComponentsPikadayInput['default'];
});
define('simple-timeline/components/range-slider', ['exports', 'ember', 'ember-cli-nouislider/components/range-slider'], function (exports, _ember, _emberCliNouisliderComponentsRangeSlider) {
  exports['default'] = _emberCliNouisliderComponentsRangeSlider['default'].extend({});
});
define('simple-timeline/components/task-editor', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var isPresent = _ember['default'].isPresent;
  exports['default'] = Component.extend({
    tagName: 'tr',
    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      var task = this.get('task');
      this.set('name', task.get('name'));
      this.set('startDate', task.get('startDate'));
      this.set('endDate', task.get('endDate'));
      this.set('bandHexValue', task.get('bandHexValue'));
    },
    isSaving: false,
    isRemoving: false,
    name: null,
    startDate: null,
    endDate: null,
    bandHexValue: null,
    hexValueOptions: ['#000000', '#BB0000', '#00BB00', '#0000BB'],
    showSaveButton: computed('name', 'startDate', 'endDate', 'bandHexValue', 'isSaving', function () {
      var _this = this;

      if (this.get('isSaving')) {
        return true;
      }
      var task = this.get('task');
      var keysWithChangeValues = ['name', 'startDate', 'endDate', 'bandHexValue'].filter(function (key) {
        return _this.get(key) !== task.get(key);
      });

      return keysWithChangeValues.length > 0;
    }),
    actions: {
      changeDuration: function changeDuration(days) {
        if (isPresent(days)) {
          var startDate = (0, _moment['default'])(this.get('startDate'));
          var endDate = startDate.add(days, 'days').toDate();
          this.set('endDate', endDate);
        }
      },
      save: function save() {
        var _this2 = this;

        this.set('isSaving', true);
        var task = this.get('task');
        task.set('name', this.get('name'));
        task.set('startDate', this.get('startDate'));
        task.set('endDate', this.get('endDate'));
        task.set('bandHexValue', this.get('bandHexValue'));
        task.save().then(function () {
          _this2.set('isSaving', false);
        });
      },
      remove: function remove() {
        this.set('isRemoving', true);
        var task = this.get('task');
        task.deleteRecord();
        task.save();
      }
    }
  });
});
define('simple-timeline/components/task-set', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['task-set'],
    tasks: []

  });
});
define('simple-timeline/components/time-line', ['exports', 'ember', 'moment', 'ember-resize/mixins/resize-aware'], function (exports, _ember, _moment, _emberResizeMixinsResizeAware) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  exports['default'] = Component.extend(_emberResizeMixinsResizeAware['default'], {
    init: function init() {
      var _this = this;

      this._super();
      run.later(function () {
        _this.set('width', _this.$().innerWidth());
      });
    },
    classNames: ['time-line'],
    tasks: [],
    startDate: null,
    endDate: null,
    width: null,
    daysOfCoverage: computed('startDate', 'endDate', function () {
      var startDate = (0, _moment['default'])(this.get('startDate'), 'MMDDYYYY'),
          endDate = (0, _moment['default'])(this.get('endDate'), 'MMDDYYYY');
      return endDate.diff(startDate, 'days');
    }),
    widthOfADay: computed('daysOfCoverage', 'width', function () {
      var daysOfCoverage = this.get('daysOfCoverage'),
          width = parseInt(this.get('width'));

      if (!width) {
        return 1;
      }

      return width / daysOfCoverage;
    }),
    topTasks: computed('tasks.@each.startDate', function () {
      var topTasks = [];
      var dates = [];
      this.get('tasks').forEach(function (task) {
        var date = (0, _moment['default'])(task.get('startDate')).format('MMDDYYYY');
        if (!dates.contains(date)) {
          topTasks.pushObject(task.get('id'));
          dates.pushObject(date);
        }
      });

      return topTasks;
    }),
    proxiedTasks: computed('startDate', 'endDate', 'tasks.@each.startDate', function () {
      var startDate = (0, _moment['default'])(this.get('startDate'), 'MMDDYYYY'),
          endDate = (0, _moment['default'])(this.get('endDate'), 'MMDDYYYY'),
          topTasks = this.get('topTasks');

      return this.get('tasks').filter(function (task) {
        var taskStartDate = (0, _moment['default'])(task.get('startDate'));

        return taskStartDate.isSameOrAfter(startDate, 'day') && taskStartDate.isSameOrBefore(endDate, 'day');
      }).map(function (task) {
        var taskStartDate = (0, _moment['default'])(task.get('startDate'));
        var leftBy = taskStartDate.diff(startDate, 'days');
        var showLabel = topTasks.contains(task.get('id'));
        return { task: task, leftBy: leftBy, showLabel: showLabel };
      });
    })
  });
});
define('simple-timeline/components/timeline-task', ['exports', 'ember'], function (exports, _ember) {
  var Component = _ember['default'].Component;
  var Handlebars = _ember['default'].Handlebars;
  var computed = _ember['default'].computed;
  var SafeString = Handlebars.SafeString;
  var Utils = Handlebars.Utils;
  var escape = Utils.escapeExpression;
  var floor = Math.floor;
  var reads = computed.reads;
  exports['default'] = Component.extend({
    dayWidth: 100,
    task: null,
    showLabel: false,
    classNames: ['timeline-task'],
    attributeBindings: ['style', 'title'],
    leftBy: 0,
    title: reads('task.name'),
    style: computed('leftBy', 'dayWidth', function () {
      var leftBy = this.get('leftBy');
      var dayWidth = floor(this.get('dayWidth'));
      var left = leftBy * dayWidth;
      var showLabel = this.get('showLabel');
      var zindex = showLabel ? 100 : 10;
      return new SafeString('left: ' + escape(left) + 'px;\n        width: ' + escape(dayWidth) + 'px;\n        z-index: ' + escape(zindex) + ';');
    }),
    bandStyle: computed('task.{durationInDays,bandHexValue}', 'dayWidth', function () {
      var duration = this.get('task.durationInDays');
      if (duration === 0) {
        return false;
      }
      var backgroundColor = this.get('task.bandHexValue');
      var dayWidth = this.get('dayWidth');
      var width = duration * dayWidth;

      return new SafeString('background-color: ' + escape(backgroundColor) + ';\n      width: ' + escape(width) + 'px;\n      display: block;');
    })
  });
});
define('simple-timeline/controllers/application', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  var Controller = _ember['default'].Controller;
  var computed = _ember['default'].computed;
  exports['default'] = Controller.extend({
    queryParams: ['start', 'end', 'focusStart', 'focusEnd'],
    start: (0, _moment['default'])().format('MMDDYYYY'),
    end: (0, _moment['default'])().add(14, 'days').format('MMDDYYYY'),
    focusStart: 0,
    focusEnd: 3,
    focusStartDate: computed('start', 'focusStart', function () {
      var startDate = (0, _moment['default'])(this.get('start'), 'MMDDYYYY'),
          focusStart = this.get('focusStart');

      return startDate.add(focusStart, 'days').format('MMDDYYYY');
    }),
    focusEndDate: computed('start', 'focusEnd', function () {
      var startDate = (0, _moment['default'])(this.get('start'), 'MMDDYYYY'),
          focusEnd = this.get('focusEnd');

      return startDate.add(focusEnd, 'days').format('MMDDYYYY');
    }),
    totalDays: computed('start', 'end', function () {
      var startDate = (0, _moment['default'])(this.get('start'), 'MMDDYYYY'),
          endDate = (0, _moment['default'])(this.get('end'), 'MMDDYYYY');

      return endDate.diff(startDate, 'days');
    }),
    actions: {
      changeFocus: function changeFocus(arr) {
        this.set('focusStart', arr[0]);
        this.set('focusEnd', arr[1]);
      }
    }
  });
});
define('simple-timeline/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('simple-timeline/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('simple-timeline/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _emberMomentHelpersMomentCalendar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentCalendar['default'];
    }
  });
  Object.defineProperty(exports, 'momentCalendar', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentCalendar.momentCalendar;
    }
  });
});
define('simple-timeline/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('simple-timeline/helpers/moment-format', ['exports', 'ember', 'simple-timeline/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _simpleTimelineConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_simpleTimelineConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('simple-timeline/helpers/moment-from-now', ['exports', 'ember', 'simple-timeline/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _simpleTimelineConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_simpleTimelineConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('simple-timeline/helpers/moment-to-now', ['exports', 'ember', 'simple-timeline/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _simpleTimelineConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_simpleTimelineConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('simple-timeline/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('simple-timeline/helpers/range', ['exports', 'ember'], function (exports, _ember) {
  exports.range = range;

  //modified from original at https://github.com/emberjs/ember.js/issues/10178#issuecomment-69364267

  function range(params /*, hash*/) {
    var start = params[0];
    var count = params[1];

    var ret = [];
    for (var i = 0; i < count; i++) {
      ret.push(i + start);
    }
    return ret;
  }

  exports['default'] = _ember['default'].Helper.helper(range);
});
define('simple-timeline/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('simple-timeline/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('simple-timeline/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'simple-timeline/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _simpleTimelineConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_simpleTimelineConfigEnvironment['default'].APP.name, _simpleTimelineConfigEnvironment['default'].APP.version)
  };
});
define('simple-timeline/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('simple-timeline/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('simple-timeline/initializers/ember-cli-mirage', ['exports', 'ember-cli-mirage/utils/read-modules', 'simple-timeline/config/environment', 'simple-timeline/mirage/config', 'ember-cli-mirage/server'], function (exports, _emberCliMirageUtilsReadModules, _simpleTimelineConfigEnvironment, _simpleTimelineMirageConfig, _emberCliMirageServer) {
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }
      var environment = _simpleTimelineConfigEnvironment['default'].environment;

      if (_shouldUseMirage(environment, _simpleTimelineConfigEnvironment['default']['ember-cli-mirage'])) {
        var modules = (0, _emberCliMirageUtilsReadModules['default'])(_simpleTimelineConfigEnvironment['default'].modulePrefix);
        var options = _.assign(modules, { environment: environment, baseConfig: _simpleTimelineMirageConfig['default'], testConfig: _simpleTimelineMirageConfig.testConfig });

        new _emberCliMirageServer['default'](options);
      }
    }
  };

  function _shouldUseMirage(env, addonConfig) {
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('simple-timeline/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('simple-timeline/initializers/export-application-global', ['exports', 'ember', 'simple-timeline/config/environment'], function (exports, _ember, _simpleTimelineConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_simpleTimelineConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _simpleTimelineConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_simpleTimelineConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('simple-timeline/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('simple-timeline/initializers/resize', ['exports', 'ember-resize/services/resize', 'simple-timeline/config/environment'], function (exports, _emberResizeServicesResize, _simpleTimelineConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];

    var resizeServiceDefaults = _simpleTimelineConfigEnvironment['default'].resizeServiceDefaults;
    var injectionFactories = resizeServiceDefaults.injectionFactories;

    application.register('config:resize-service', resizeServiceDefaults, { instantiate: false });
    application.register('service:resize', _emberResizeServicesResize['default']);
    application.inject('service:resize', 'resizeServiceDefaults', 'config:resize-service');

    injectionFactories.forEach(function (factory) {
      application.inject(factory, 'resizeService', 'service:resize');
    });
  }

  exports['default'] = {
    name: 'resize',
    initialize: initialize
  };
});
define('simple-timeline/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('simple-timeline/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('simple-timeline/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("simple-timeline/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('simple-timeline/mirage/config', ['exports'], function (exports) {
  exports['default'] = function () {
    this.get('/tasks/:id', 'task');
    this.get('/tasks', 'tasks');
    this.put('/tasks/:id');
    this.del('/tasks/:id');
  };
});
define('simple-timeline/mirage/factories/task', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage['default'].Factory.extend({
    'name': function name() {
      return _emberCliMirage.faker.lorem.sentence();
    },
    'startDate': function startDate() {
      return _emberCliMirage.faker.date.past();
    },
    'endDate': function endDate() {
      return _emberCliMirage.faker.date.future();
    },
    'bandHexValue': '#BB0000'
  });
});
define('simple-timeline/mirage/scenarios/default', ['exports', 'moment'], function (exports, _moment) {
  exports['default'] = function (server) {
    var today = (0, _moment['default'])();
    server.create('task', {
      name: 'single long event name',
      startDate: today.toDate(),
      endDate: today.toDate()
    });
    server.create('task', {
      name: 'multi',
      startDate: today.clone().add(1, 'day').toDate(),
      endDate: today.clone().add(2, 'days').toDate()
    });
    server.create('task', {
      name: 'multi2',
      startDate: today.clone().add(4, 'day').toDate(),
      endDate: today.clone().add(8, 'days').toDate()
    });

    for (var i = 0; i < 5; i++) {
      server.create('task', {
        name: 'task ' + i,
        startDate: today.clone().add(i, 'days').toDate(),
        endDate: today.clone().add(i, 'days').toDate()
      });
    }
  };
});
define('simple-timeline/mixins/resize-aware', ['exports', 'ember-resize/mixins/resize-aware'], function (exports, _emberResizeMixinsResizeAware) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberResizeMixinsResizeAware['default'];
    }
  });
});
define('simple-timeline/models/task', ['exports', 'ember-data/model', 'ember-data/attr', 'moment'], function (exports, _emberDataModel, _emberDataAttr, _moment) {
  var _Ember = Ember;
  var computed = _Ember.computed;
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    startDate: (0, _emberDataAttr['default'])('date'),
    endDate: (0, _emberDataAttr['default'])('date'),
    bandHexValue: (0, _emberDataAttr['default'])('string'),
    durationInDays: computed('startDate', 'endDate', function () {
      var startDate = (0, _moment['default'])(this.get('startDate')),
          endDate = (0, _moment['default'])(this.get('endDate'));

      return endDate.diff(startDate, 'days');
    })
  });
});
define('simple-timeline/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('simple-timeline/router', ['exports', 'ember', 'simple-timeline/config/environment'], function (exports, _ember, _simpleTimelineConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _simpleTimelineConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('simple-timeline/routes/application', ['exports', 'ember'], function (exports, _ember) {
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Route.extend({
    store: service(),
    model: function model() {
      return this.get('store').findAll('task');
    }
  });
});
define('simple-timeline/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('simple-timeline/services/moment', ['exports', 'ember', 'simple-timeline/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _simpleTimelineConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_simpleTimelineConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('simple-timeline/services/resize', ['exports', 'ember-resize/services/resize'], function (exports, _emberResizeServicesResize) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberResizeServicesResize['default'];
    }
  });
});
define("simple-timeline/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "time-line", [], ["tasks", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 18], [1, 23]]]]], [], []], "startDate", ["subexpr", "@mut", [["get", "start", ["loc", [null, [1, 34], [1, 39]]]]], [], []], "endDate", ["subexpr", "@mut", [["get", "end", ["loc", [null, [1, 48], [1, 51]]]]], [], []]], ["loc", [null, [1, 0], [1, 53]]]], ["inline", "focus-timeline", [], ["steps", ["subexpr", "@mut", [["get", "totalDays", ["loc", [null, [3, 23], [3, 32]]]]], [], []], "firstDay", ["subexpr", "@mut", [["get", "focusStart", ["loc", [null, [3, 42], [3, 52]]]]], [], []], "lastDay", ["subexpr", "@mut", [["get", "focusEnd", ["loc", [null, [3, 61], [3, 69]]]]], [], []], "changeFocus", ["subexpr", "action", ["changeFocus"], [], ["loc", [null, [3, 82], [3, 104]]]]], ["loc", [null, [3, 0], [3, 106]]]], ["inline", "time-line", [], ["tasks", ["subexpr", "@mut", [["get", "model", ["loc", [null, [5, 18], [5, 23]]]]], [], []], "startDate", ["subexpr", "@mut", [["get", "focusStartDate", ["loc", [null, [5, 34], [5, 48]]]]], [], []], "endDate", ["subexpr", "@mut", [["get", "focusEndDate", ["loc", [null, [5, 57], [5, 69]]]]], [], []]], ["loc", [null, [5, 0], [5, 71]]]], ["inline", "task-set", [], ["tasks", ["subexpr", "@mut", [["get", "model", ["loc", [null, [7, 17], [7, 22]]]]], [], []]], ["loc", [null, [7, 0], [7, 24]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("simple-timeline/templates/components/focus-timeline", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/focus-timeline.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "range-slider", [], ["start", ["subexpr", "@mut", [["get", "start", ["loc", [null, [2, 8], [2, 13]]]]], [], []], "step", 1, "margin", 1, "range", ["subexpr", "@mut", [["get", "range", ["loc", [null, [5, 8], [5, 13]]]]], [], []], "connect", true, "change", ["subexpr", "@mut", [["get", "this.attrs.changeFocus", ["loc", [null, [7, 9], [7, 31]]]]], [], []]], ["loc", [null, [1, 0], [8, 2]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("simple-timeline/templates/components/range-slider", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/range-slider.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("simple-timeline/templates/components/task-editor", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 17,
                  "column": 8
                },
                "end": {
                  "line": 19,
                  "column": 8
                }
              },
              "moduleName": "simple-timeline/templates/components/task-editor.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("option");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1]);
              var morphs = new Array(4);
              morphs[0] = dom.createAttrMorph(element1, 'selected');
              morphs[1] = dom.createUnsafeAttrMorph(element1, 'style');
              morphs[2] = dom.createAttrMorph(element1, 'value');
              morphs[3] = dom.createMorphAt(element1, 0, 0);
              return morphs;
            },
            statements: [["attribute", "selected", ["subexpr", "eq", [["get", "code", ["loc", [null, [18, 32], [18, 36]]]], ["get", "bandHexValue", ["loc", [null, [18, 37], [18, 49]]]]], [], ["loc", [null, [18, 27], [18, 51]]]]], ["attribute", "style", ["subexpr", "concat", ["color: ", ["get", "code", ["loc", [null, [18, 78], [18, 82]]]]], [], ["loc", [null, [18, 58], [18, 85]]]]], ["attribute", "value", ["get", "code", ["loc", [null, [18, 94], [18, 98]]]]], ["content", "code", ["loc", [null, [18, 101], [18, 109]]]]],
            locals: ["code"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 4
              },
              "end": {
                "line": 21,
                "column": 4
              }
            },
            "moduleName": "simple-timeline/templates/components/task-editor.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("select");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element2, 'onchange');
            morphs[1] = dom.createMorphAt(element2, 1, 1);
            return morphs;
          },
          statements: [["attribute", "onchange", ["subexpr", "action", [["subexpr", "mut", [["get", "bandHexValue", ["loc", [null, [16, 37], [16, 49]]]]], [], ["loc", [null, [16, 32], [16, 50]]]]], ["value", "target.value"], ["loc", [null, [16, 23], [16, 73]]]]], ["block", "each", [["get", "hexValueOptions", ["loc", [null, [17, 16], [17, 31]]]]], [], 0, null, ["loc", [null, [17, 8], [19, 17]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 26,
                  "column": 8
                },
                "end": {
                  "line": 28,
                  "column": 8
                }
              },
              "moduleName": "simple-timeline/templates/components/task-editor.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "fa-icon", ["spinner"], ["spin", true], ["loc", [null, [27, 10], [27, 41]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 28,
                  "column": 8
                },
                "end": {
                  "line": 30,
                  "column": 8
                }
              },
              "moduleName": "simple-timeline/templates/components/task-editor.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "fa-icon", ["check"], [], ["loc", [null, [29, 10], [29, 29]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.1",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 4
              },
              "end": {
                "line": 32,
                "column": 4
              }
            },
            "moduleName": "simple-timeline/templates/components/task-editor.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "save");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'disabled');
            morphs[1] = dom.createElementMorph(element0);
            morphs[2] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["attribute", "disabled", ["subexpr", "if", [["get", "isSaving", ["loc", [null, [25, 28], [25, 36]]]], true], [], ["loc", [null, [25, 23], [25, 43]]]]], ["element", "action", ["save"], [], ["loc", [null, [25, 44], [25, 61]]]], ["block", "if", [["get", "isSaving", ["loc", [null, [26, 14], [26, 22]]]]], [], 0, 1, ["loc", [null, [26, 8], [30, 15]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "simple-timeline/templates/components/task-editor.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2, "size", "50");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2, "size", "4");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" days\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("td");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "remove");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 1]);
          var element4 = dom.childAt(fragment, [7, 1]);
          var element5 = dom.childAt(fragment, [11]);
          var element6 = dom.childAt(element5, [3]);
          var morphs = new Array(10);
          morphs[0] = dom.createAttrMorph(element3, 'value');
          morphs[1] = dom.createAttrMorph(element3, 'onkeyup');
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(fragment, [5]), 1, 1);
          morphs[4] = dom.createAttrMorph(element4, 'value');
          morphs[5] = dom.createAttrMorph(element4, 'onkeyup');
          morphs[6] = dom.createMorphAt(dom.childAt(fragment, [9]), 1, 1);
          morphs[7] = dom.createMorphAt(element5, 1, 1);
          morphs[8] = dom.createElementMorph(element6);
          morphs[9] = dom.createMorphAt(element6, 0, 0);
          return morphs;
        },
        statements: [["attribute", "value", ["get", "name", ["loc", [null, [3, 27], [3, 31]]]]], ["attribute", "onkeyup", ["subexpr", "action", [["subexpr", "mut", [["get", "name", ["loc", [null, [3, 56], [3, 60]]]]], [], ["loc", [null, [3, 51], [3, 61]]]]], ["value", "target.value"], ["loc", [null, [3, 42], [3, 84]]]]], ["inline", "pikaday-input", [], ["size", 10, "value", ["subexpr", "@mut", [["get", "startDate", ["loc", [null, [6, 34], [6, 43]]]]], [], []], "format", "MM/DD/YYYY"], ["loc", [null, [6, 4], [6, 65]]]], ["inline", "pikaday-input", [], ["size", 10, "value", ["subexpr", "@mut", [["get", "endDate", ["loc", [null, [9, 34], [9, 41]]]]], [], []], "format", "MM/DD/YYYY"], ["loc", [null, [9, 4], [9, 63]]]], ["attribute", "value", ["get", "task.durationInDays", ["loc", [null, [12, 26], [12, 45]]]]], ["attribute", "onkeyup", ["subexpr", "action", ["changeDuration"], ["value", "target.value"], ["loc", [null, [12, 56], [12, 104]]]]], ["block", "if", [["subexpr", "gt", [["get", "task.durationInDays", ["loc", [null, [15, 14], [15, 33]]]], 0], [], ["loc", [null, [15, 10], [15, 36]]]]], [], 0, null, ["loc", [null, [15, 4], [21, 11]]]], ["block", "if", [["get", "showSaveButton", ["loc", [null, [24, 10], [24, 24]]]]], [], 1, null, ["loc", [null, [24, 4], [32, 11]]]], ["element", "action", ["remove"], [], ["loc", [null, [33, 12], [33, 31]]]], ["inline", "fa-icon", ["times"], [], ["loc", [null, [33, 47], [33, 66]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/task-editor.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "unless", [["get", "isRemoving", ["loc", [null, [1, 10], [1, 20]]]]], [], 0, null, ["loc", [null, [1, 0], [35, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("simple-timeline/templates/components/task-set", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 4
            },
            "end": {
              "line": 15,
              "column": 4
            }
          },
          "moduleName": "simple-timeline/templates/components/task-set.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "task-editor", [], ["task", ["subexpr", "@mut", [["get", "task", ["loc", [null, [14, 25], [14, 29]]]]], [], []]], ["loc", [null, [14, 6], [14, 31]]]]],
        locals: ["task"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/task-set.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Task Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Start");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("End");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Duration");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Banding");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "tasks", ["loc", [null, [13, 12], [13, 17]]]]], [], 0, null, ["loc", [null, [13, 4], [15, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("simple-timeline/templates/components/time-line", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "simple-timeline/templates/components/time-line.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "timeline-task", [], ["task", ["subexpr", "@mut", [["get", "taskProxy.task", ["loc", [null, [3, 25], [3, 39]]]]], [], []], "leftBy", ["subexpr", "@mut", [["get", "taskProxy.leftBy", ["loc", [null, [3, 47], [3, 63]]]]], [], []], "dayWidth", ["subexpr", "@mut", [["get", "widthOfADay", ["loc", [null, [3, 73], [3, 84]]]]], [], []], "showLabel", ["subexpr", "@mut", [["get", "taskProxy.showLabel", ["loc", [null, [3, 95], [3, 114]]]]], [], []]], ["loc", [null, [3, 4], [3, 116]]]]],
        locals: ["taskProxy"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/time-line.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "proxiedTasks", ["loc", [null, [2, 10], [2, 22]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("simple-timeline/templates/components/timeline-task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "simple-timeline/templates/components/timeline-task.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "date");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          return morphs;
        },
        statements: [["content", "task.name", ["loc", [null, [3, 23], [3, 36]]]], ["inline", "moment-format", [["get", "task.startDate", ["loc", [null, [4, 38], [4, 52]]]], "MM/DD/YYYY"], [], ["loc", [null, [4, 22], [4, 67]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "simple-timeline/templates/components/timeline-task.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "task");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "icon");
        var el3 = dom.createTextNode("♦");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "band");
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [5]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createUnsafeAttrMorph(element1, 'style');
        return morphs;
      },
      statements: [["block", "if", [["get", "showLabel", ["loc", [null, [2, 8], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 2], [5, 9]]]], ["attribute", "style", ["get", "bandStyle", ["loc", [null, [7, 29], [7, 38]]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('simple-timeline/config/environment', ['ember'], function(Ember) {
  var prefix = 'simple-timeline';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("simple-timeline/app")["default"].create({"name":"simple-timeline","version":"0.0.0+4f3c4cd8"});
}

/* jshint ignore:end */
//# sourceMappingURL=simple-timeline.map