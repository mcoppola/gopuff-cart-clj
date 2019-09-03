["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/log/log.js"],"~:js","goog.provide(\"goog.log\");\ngoog.provide(\"goog.log.Level\");\ngoog.provide(\"goog.log.LogRecord\");\ngoog.provide(\"goog.log.Logger\");\ngoog.require(\"goog.debug\");\ngoog.require(\"goog.debug.LogManager\");\ngoog.require(\"goog.debug.LogRecord\");\ngoog.require(\"goog.debug.Logger\");\n/** @define {boolean} */ goog.define(\"goog.log.ENABLED\", goog.debug.LOGGING_ENABLED);\n/** @const @type {string} */ goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;\n/** @final @constructor */ goog.log.Logger = goog.debug.Logger;\n/** @final @constructor */ goog.log.Level = goog.debug.Logger.Level;\n/** @final @constructor */ goog.log.LogRecord = goog.debug.LogRecord;\n/**\n * @param {string} name\n * @param {goog.log.Level=} opt_level\n * @return {goog.log.Logger}\n */\ngoog.log.getLogger = function(name, opt_level) {\n  if (goog.log.ENABLED) {\n    var logger = goog.debug.LogManager.getLogger(name);\n    if (opt_level && logger) {\n      logger.setLevel(opt_level);\n    }\n    return logger;\n  } else {\n    return null;\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {Function} handler\n */\ngoog.log.addHandler = function(logger, handler) {\n  if (goog.log.ENABLED && logger) {\n    logger.addHandler(handler);\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {Function} handler\n * @return {boolean}\n */\ngoog.log.removeHandler = function(logger, handler) {\n  if (goog.log.ENABLED && logger) {\n    return logger.removeHandler(handler);\n  } else {\n    return false;\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {goog.log.Level} level\n * @param {goog.debug.Loggable} msg\n * @param {(Error|Object)=} opt_exception\n */\ngoog.log.log = function(logger, level, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.log(level, msg, opt_exception);\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg\n * @param {Error=} opt_exception\n */\ngoog.log.error = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.severe(msg, opt_exception);\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg\n * @param {Error=} opt_exception\n */\ngoog.log.warning = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.warning(msg, opt_exception);\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg\n * @param {Error=} opt_exception\n */\ngoog.log.info = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.info(msg, opt_exception);\n  }\n};\n/**\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg\n * @param {Error=} opt_exception\n */\ngoog.log.fine = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.fine(msg, opt_exception);\n  }\n};\n","~:source","// Copyright 2013 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Basic strippable logging definitions.\n * @see http://go/closurelogging\n *\n * @author johnlenz@google.com (John Lenz)\n */\n\ngoog.provide('goog.log');\ngoog.provide('goog.log.Level');\ngoog.provide('goog.log.LogRecord');\ngoog.provide('goog.log.Logger');\n\ngoog.require('goog.debug');\ngoog.require('goog.debug.LogManager');\ngoog.require('goog.debug.LogRecord');\ngoog.require('goog.debug.Logger');\n\n\n/** @define {boolean} Whether logging is enabled. */\ngoog.define('goog.log.ENABLED', goog.debug.LOGGING_ENABLED);\n\n\n/** @const {string} */\ngoog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;\n\n\n\n/**\n * @constructor\n * @final\n */\ngoog.log.Logger = goog.debug.Logger;\n\n\n\n/**\n * @constructor\n * @final\n */\ngoog.log.Level = goog.debug.Logger.Level;\n\n\n\n/**\n * @constructor\n * @final\n */\ngoog.log.LogRecord = goog.debug.LogRecord;\n\n\n/**\n * Finds or creates a logger for a named subsystem. If a logger has already been\n * created with the given name it is returned. Otherwise a new logger is\n * created. If a new logger is created its log level will be configured based\n * on the goog.debug.LogManager configuration and it will configured to also\n * send logging output to its parent's handlers.\n * @see goog.debug.LogManager\n *\n * @param {string} name A name for the logger. This should be a dot-separated\n *     name and should normally be based on the package name or class name of\n *     the subsystem, such as goog.net.BrowserChannel.\n * @param {goog.log.Level=} opt_level If provided, override the\n *     default logging level with the provided level.\n * @return {goog.log.Logger} The named logger or null if logging is disabled.\n */\ngoog.log.getLogger = function(name, opt_level) {\n  if (goog.log.ENABLED) {\n    var logger = goog.debug.LogManager.getLogger(name);\n    if (opt_level && logger) {\n      logger.setLevel(opt_level);\n    }\n    return logger;\n  } else {\n    return null;\n  }\n};\n\n\n// TODO(johnlenz): try to tighten the types to these functions.\n/**\n * Adds a handler to the logger. This doesn't use the event system because\n * we want to be able to add logging to the event system.\n * @param {goog.log.Logger} logger\n * @param {Function} handler Handler function to add.\n */\ngoog.log.addHandler = function(logger, handler) {\n  if (goog.log.ENABLED && logger) {\n    logger.addHandler(handler);\n  }\n};\n\n\n/**\n * Removes a handler from the logger. This doesn't use the event system because\n * we want to be able to add logging to the event system.\n * @param {goog.log.Logger} logger\n * @param {Function} handler Handler function to remove.\n * @return {boolean} Whether the handler was removed.\n */\ngoog.log.removeHandler = function(logger, handler) {\n  if (goog.log.ENABLED && logger) {\n    return logger.removeHandler(handler);\n  } else {\n    return false;\n  }\n};\n\n\n/**\n * Logs a message. If the logger is currently enabled for the\n * given message level then the given message is forwarded to all the\n * registered output Handler objects.\n * @param {goog.log.Logger} logger\n * @param {goog.log.Level} level One of the level identifiers.\n * @param {goog.debug.Loggable} msg The message to log.\n * @param {Error|Object=} opt_exception An exception associated with the\n *     message.\n */\ngoog.log.log = function(logger, level, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.log(level, msg, opt_exception);\n  }\n};\n\n\n/**\n * Logs a message at the Level.SEVERE level.\n * If the logger is currently enabled for the given message level then the\n * given message is forwarded to all the registered output Handler objects.\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg The message to log.\n * @param {Error=} opt_exception An exception associated with the message.\n */\ngoog.log.error = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.severe(msg, opt_exception);\n  }\n};\n\n\n/**\n * Logs a message at the Level.WARNING level.\n * If the logger is currently enabled for the given message level then the\n * given message is forwarded to all the registered output Handler objects.\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg The message to log.\n * @param {Error=} opt_exception An exception associated with the message.\n */\ngoog.log.warning = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.warning(msg, opt_exception);\n  }\n};\n\n\n/**\n * Logs a message at the Level.INFO level.\n * If the logger is currently enabled for the given message level then the\n * given message is forwarded to all the registered output Handler objects.\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg The message to log.\n * @param {Error=} opt_exception An exception associated with the message.\n */\ngoog.log.info = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.info(msg, opt_exception);\n  }\n};\n\n\n/**\n * Logs a message at the Level.Fine level.\n * If the logger is currently enabled for the given message level then the\n * given message is forwarded to all the registered output Handler objects.\n * @param {goog.log.Logger} logger\n * @param {goog.debug.Loggable} msg The message to log.\n * @param {Error=} opt_exception An exception associated with the message.\n */\ngoog.log.fine = function(logger, msg, opt_exception) {\n  if (goog.log.ENABLED && logger) {\n    logger.fine(msg, opt_exception);\n  }\n};\n","~:compiled-at",1567297116809,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.log.log.js\",\n\"lineCount\":102,\n\"mappings\":\"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\",\n\"sources\":[\"goog/log/log.js\"],\n\"sourcesContent\":[\"// Copyright 2013 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Basic strippable logging definitions.\\n * @see http://go/closurelogging\\n *\\n * @author johnlenz@google.com (John Lenz)\\n */\\n\\ngoog.provide('goog.log');\\ngoog.provide('goog.log.Level');\\ngoog.provide('goog.log.LogRecord');\\ngoog.provide('goog.log.Logger');\\n\\ngoog.require('goog.debug');\\ngoog.require('goog.debug.LogManager');\\ngoog.require('goog.debug.LogRecord');\\ngoog.require('goog.debug.Logger');\\n\\n\\n/** @define {boolean} Whether logging is enabled. */\\ngoog.define('goog.log.ENABLED', goog.debug.LOGGING_ENABLED);\\n\\n\\n/** @const {string} */\\ngoog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;\\n\\n\\n\\n/**\\n * @constructor\\n * @final\\n */\\ngoog.log.Logger = goog.debug.Logger;\\n\\n\\n\\n/**\\n * @constructor\\n * @final\\n */\\ngoog.log.Level = goog.debug.Logger.Level;\\n\\n\\n\\n/**\\n * @constructor\\n * @final\\n */\\ngoog.log.LogRecord = goog.debug.LogRecord;\\n\\n\\n/**\\n * Finds or creates a logger for a named subsystem. If a logger has already been\\n * created with the given name it is returned. Otherwise a new logger is\\n * created. If a new logger is created its log level will be configured based\\n * on the goog.debug.LogManager configuration and it will configured to also\\n * send logging output to its parent's handlers.\\n * @see goog.debug.LogManager\\n *\\n * @param {string} name A name for the logger. This should be a dot-separated\\n *     name and should normally be based on the package name or class name of\\n *     the subsystem, such as goog.net.BrowserChannel.\\n * @param {goog.log.Level=} opt_level If provided, override the\\n *     default logging level with the provided level.\\n * @return {goog.log.Logger} The named logger or null if logging is disabled.\\n */\\ngoog.log.getLogger = function(name, opt_level) {\\n  if (goog.log.ENABLED) {\\n    var logger = goog.debug.LogManager.getLogger(name);\\n    if (opt_level && logger) {\\n      logger.setLevel(opt_level);\\n    }\\n    return logger;\\n  } else {\\n    return null;\\n  }\\n};\\n\\n\\n// TODO(johnlenz): try to tighten the types to these functions.\\n/**\\n * Adds a handler to the logger. This doesn't use the event system because\\n * we want to be able to add logging to the event system.\\n * @param {goog.log.Logger} logger\\n * @param {Function} handler Handler function to add.\\n */\\ngoog.log.addHandler = function(logger, handler) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.addHandler(handler);\\n  }\\n};\\n\\n\\n/**\\n * Removes a handler from the logger. This doesn't use the event system because\\n * we want to be able to add logging to the event system.\\n * @param {goog.log.Logger} logger\\n * @param {Function} handler Handler function to remove.\\n * @return {boolean} Whether the handler was removed.\\n */\\ngoog.log.removeHandler = function(logger, handler) {\\n  if (goog.log.ENABLED && logger) {\\n    return logger.removeHandler(handler);\\n  } else {\\n    return false;\\n  }\\n};\\n\\n\\n/**\\n * Logs a message. If the logger is currently enabled for the\\n * given message level then the given message is forwarded to all the\\n * registered output Handler objects.\\n * @param {goog.log.Logger} logger\\n * @param {goog.log.Level} level One of the level identifiers.\\n * @param {goog.debug.Loggable} msg The message to log.\\n * @param {Error|Object=} opt_exception An exception associated with the\\n *     message.\\n */\\ngoog.log.log = function(logger, level, msg, opt_exception) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.log(level, msg, opt_exception);\\n  }\\n};\\n\\n\\n/**\\n * Logs a message at the Level.SEVERE level.\\n * If the logger is currently enabled for the given message level then the\\n * given message is forwarded to all the registered output Handler objects.\\n * @param {goog.log.Logger} logger\\n * @param {goog.debug.Loggable} msg The message to log.\\n * @param {Error=} opt_exception An exception associated with the message.\\n */\\ngoog.log.error = function(logger, msg, opt_exception) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.severe(msg, opt_exception);\\n  }\\n};\\n\\n\\n/**\\n * Logs a message at the Level.WARNING level.\\n * If the logger is currently enabled for the given message level then the\\n * given message is forwarded to all the registered output Handler objects.\\n * @param {goog.log.Logger} logger\\n * @param {goog.debug.Loggable} msg The message to log.\\n * @param {Error=} opt_exception An exception associated with the message.\\n */\\ngoog.log.warning = function(logger, msg, opt_exception) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.warning(msg, opt_exception);\\n  }\\n};\\n\\n\\n/**\\n * Logs a message at the Level.INFO level.\\n * If the logger is currently enabled for the given message level then the\\n * given message is forwarded to all the registered output Handler objects.\\n * @param {goog.log.Logger} logger\\n * @param {goog.debug.Loggable} msg The message to log.\\n * @param {Error=} opt_exception An exception associated with the message.\\n */\\ngoog.log.info = function(logger, msg, opt_exception) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.info(msg, opt_exception);\\n  }\\n};\\n\\n\\n/**\\n * Logs a message at the Level.Fine level.\\n * If the logger is currently enabled for the given message level then the\\n * given message is forwarded to all the registered output Handler objects.\\n * @param {goog.log.Logger} logger\\n * @param {goog.debug.Loggable} msg The message to log.\\n * @param {Error=} opt_exception An exception associated with the message.\\n */\\ngoog.log.fine = function(logger, msg, opt_exception) {\\n  if (goog.log.ENABLED && logger) {\\n    logger.fine(msg, opt_exception);\\n  }\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"define\",\"debug\",\"LOGGING_ENABLED\",\"log\",\"ROOT_LOGGER_NAME\",\"Logger\",\"Level\",\"LogRecord\",\"getLogger\",\"goog.log.getLogger\",\"name\",\"opt_level\",\"ENABLED\",\"logger\",\"LogManager\",\"setLevel\",\"addHandler\",\"goog.log.addHandler\",\"handler\",\"removeHandler\",\"goog.log.removeHandler\",\"goog.log.log\",\"level\",\"msg\",\"opt_exception\",\"error\",\"goog.log.error\",\"severe\",\"warning\",\"goog.log.warning\",\"info\",\"goog.log.info\",\"fine\",\"goog.log.fine\"]\n}\n"]