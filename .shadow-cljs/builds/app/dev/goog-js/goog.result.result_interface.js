["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/result/result_interface.js"],"~:js","goog.provide(\"goog.result.Result\");\ngoog.require(\"goog.Thenable\");\n/**\n * @interface\n * @extends {goog.Thenable}\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result = function() {\n};\n/**\n * @param {function(this:T,!goog.result.Result)} handler\n * @param {T=} opt_scope\n * @template T\n */\ngoog.result.Result.prototype.wait = function(handler, opt_scope) {\n};\n/**\n * @enum {string}\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result.State = {SUCCESS:\"success\", ERROR:\"error\", PENDING:\"pending\"};\n/**\n * @return {!goog.result.Result.State}\n */\ngoog.result.Result.prototype.getState = function() {\n};\n/**\n * @return {*}\n */\ngoog.result.Result.prototype.getValue = function() {\n};\n/**\n * @return {*}\n */\ngoog.result.Result.prototype.getError = function() {\n};\n/**\n * @return {boolean}\n */\ngoog.result.Result.prototype.cancel = function() {\n};\n/**\n * @return {boolean}\n */\ngoog.result.Result.prototype.isCanceled = function() {\n};\n/**\n * @final\n * @constructor\n * @extends {Error}\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result.CancelError = function() {\n};\ngoog.inherits(goog.result.Result.CancelError, Error);\n","~:source","// Copyright 2012 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Defines an interface that represents a Result.\n *\n * NOTE: goog.result is soft deprecated - we expect to replace this and\n * {@link goog.async.Deferred} with {@link goog.Promise}.\n */\n\ngoog.provide('goog.result.Result');\n\ngoog.require('goog.Thenable');\n\n\n\n/**\n * A Result object represents a value returned by an asynchronous\n * operation at some point in the future (e.g. a network fetch). This is akin\n * to a 'Promise' or a 'Future' in other languages and frameworks.\n *\n * @interface\n * @extends {goog.Thenable}\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result = function() {};\n\n\n/**\n * Attaches handlers to be called when the value of this Result is available.\n * Handlers are called in the order they were added by wait.\n *\n * @param {function(this:T, !goog.result.Result)} handler The function called\n *     when the value is available. The function is passed the Result object as\n *     the only argument.\n * @param {T=} opt_scope Optional scope for the handler.\n * @template T\n */\ngoog.result.Result.prototype.wait = function(handler, opt_scope) {};\n\n\n/**\n * The States this object can be in.\n *\n * @enum {string}\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result.State = {\n  /** The operation was a success and the value is available. */\n  SUCCESS: 'success',\n\n  /** The operation resulted in an error. */\n  ERROR: 'error',\n\n  /** The operation is incomplete and the value is not yet available. */\n  PENDING: 'pending'\n};\n\n\n/**\n * @return {!goog.result.Result.State} The state of this Result.\n */\ngoog.result.Result.prototype.getState = function() {};\n\n\n/**\n * @return {*} The value of this Result. Will return undefined if the Result is\n *     pending or was an error.\n */\ngoog.result.Result.prototype.getValue = function() {};\n\n\n/**\n * @return {*} The error slug for this Result. Will return undefined if the\n *     Result was a success, the error slug was not set, or if the Result is\n *     pending.\n */\ngoog.result.Result.prototype.getError = function() {};\n\n\n/**\n * Cancels the current Result, invoking the canceler function, if set.\n *\n * @return {boolean} Whether the Result was canceled.\n */\ngoog.result.Result.prototype.cancel = function() {};\n\n\n/**\n * @return {boolean} Whether this Result was canceled.\n */\ngoog.result.Result.prototype.isCanceled = function() {};\n\n\n\n/**\n * The value to be passed to the error handlers invoked upon cancellation.\n * @constructor\n * @extends {Error}\n * @final\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\n */\ngoog.result.Result.CancelError = function() {\n  // Note that this does not derive from goog.debug.Error in order to prevent\n  // stack trace capture and reduce the amount of garbage generated during a\n  // cancel() operation.\n};\ngoog.inherits(goog.result.Result.CancelError, Error);\n","~:compiled-at",1567297116834,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.result.result_interface.js\",\n\"lineCount\":56,\n\"mappings\":\"AAqBAA,IAAAC,QAAA,CAAa,oBAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,eAAb,CAAA;AAaA;;;;;AAAAF,IAAAG,OAAAC,OAAA,GAAqBC,QAAQ,EAAG;CAAhC;AAaA;;;;;AAAAL,IAAAG,OAAAC,OAAAE,UAAAC,KAAA,GAAoCC,QAAQ,CAACC,OAAD,EAAUC,SAAV,CAAqB;CAAjE;AASA;;;;AAAAV,IAAAG,OAAAC,OAAAO,MAAA,GAA2B,CAEzBC,QAAS,SAFgB,EAKzBC,MAAO,OALkB,EAQzBC,QAAS,SARgB,CAA3B;AAeA;;;AAAAd,IAAAG,OAAAC,OAAAE,UAAAS,SAAA,GAAwCC,QAAQ,EAAG;CAAnD;AAOA;;;AAAAhB,IAAAG,OAAAC,OAAAE,UAAAW,SAAA,GAAwCC,QAAQ,EAAG;CAAnD;AAQA;;;AAAAlB,IAAAG,OAAAC,OAAAE,UAAAa,SAAA,GAAwCC,QAAQ,EAAG;CAAnD;AAQA;;;AAAApB,IAAAG,OAAAC,OAAAE,UAAAe,OAAA,GAAsCC,QAAQ,EAAG;CAAjD;AAMA;;;AAAAtB,IAAAG,OAAAC,OAAAE,UAAAiB,WAAA,GAA0CC,QAAQ,EAAG;CAArD;AAWA;;;;;;AAAAxB,IAAAG,OAAAC,OAAAqB,YAAA,GAAiCC,QAAQ,EAAG;CAA5C;AAKA1B,IAAA2B,SAAA,CAAc3B,IAAAG,OAAAC,OAAAqB,YAAd,EAA8CG,KAA9C,CAAA;;\",\n\"sources\":[\"goog/result/result_interface.js\"],\n\"sourcesContent\":[\"// Copyright 2012 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Defines an interface that represents a Result.\\n *\\n * NOTE: goog.result is soft deprecated - we expect to replace this and\\n * {@link goog.async.Deferred} with {@link goog.Promise}.\\n */\\n\\ngoog.provide('goog.result.Result');\\n\\ngoog.require('goog.Thenable');\\n\\n\\n\\n/**\\n * A Result object represents a value returned by an asynchronous\\n * operation at some point in the future (e.g. a network fetch). This is akin\\n * to a 'Promise' or a 'Future' in other languages and frameworks.\\n *\\n * @interface\\n * @extends {goog.Thenable}\\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\\n */\\ngoog.result.Result = function() {};\\n\\n\\n/**\\n * Attaches handlers to be called when the value of this Result is available.\\n * Handlers are called in the order they were added by wait.\\n *\\n * @param {function(this:T, !goog.result.Result)} handler The function called\\n *     when the value is available. The function is passed the Result object as\\n *     the only argument.\\n * @param {T=} opt_scope Optional scope for the handler.\\n * @template T\\n */\\ngoog.result.Result.prototype.wait = function(handler, opt_scope) {};\\n\\n\\n/**\\n * The States this object can be in.\\n *\\n * @enum {string}\\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\\n */\\ngoog.result.Result.State = {\\n  /** The operation was a success and the value is available. */\\n  SUCCESS: 'success',\\n\\n  /** The operation resulted in an error. */\\n  ERROR: 'error',\\n\\n  /** The operation is incomplete and the value is not yet available. */\\n  PENDING: 'pending'\\n};\\n\\n\\n/**\\n * @return {!goog.result.Result.State} The state of this Result.\\n */\\ngoog.result.Result.prototype.getState = function() {};\\n\\n\\n/**\\n * @return {*} The value of this Result. Will return undefined if the Result is\\n *     pending or was an error.\\n */\\ngoog.result.Result.prototype.getValue = function() {};\\n\\n\\n/**\\n * @return {*} The error slug for this Result. Will return undefined if the\\n *     Result was a success, the error slug was not set, or if the Result is\\n *     pending.\\n */\\ngoog.result.Result.prototype.getError = function() {};\\n\\n\\n/**\\n * Cancels the current Result, invoking the canceler function, if set.\\n *\\n * @return {boolean} Whether the Result was canceled.\\n */\\ngoog.result.Result.prototype.cancel = function() {};\\n\\n\\n/**\\n * @return {boolean} Whether this Result was canceled.\\n */\\ngoog.result.Result.prototype.isCanceled = function() {};\\n\\n\\n\\n/**\\n * The value to be passed to the error handlers invoked upon cancellation.\\n * @constructor\\n * @extends {Error}\\n * @final\\n * @deprecated Use {@link goog.Promise} instead - http://go/promisemigration\\n */\\ngoog.result.Result.CancelError = function() {\\n  // Note that this does not derive from goog.debug.Error in order to prevent\\n  // stack trace capture and reduce the amount of garbage generated during a\\n  // cancel() operation.\\n};\\ngoog.inherits(goog.result.Result.CancelError, Error);\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"result\",\"Result\",\"goog.result.Result\",\"prototype\",\"wait\",\"goog.result.Result.prototype.wait\",\"handler\",\"opt_scope\",\"State\",\"SUCCESS\",\"ERROR\",\"PENDING\",\"getState\",\"goog.result.Result.prototype.getState\",\"getValue\",\"goog.result.Result.prototype.getValue\",\"getError\",\"goog.result.Result.prototype.getError\",\"cancel\",\"goog.result.Result.prototype.cancel\",\"isCanceled\",\"goog.result.Result.prototype.isCanceled\",\"CancelError\",\"goog.result.Result.CancelError\",\"inherits\",\"Error\"]\n}\n"]