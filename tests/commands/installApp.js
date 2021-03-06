// Sandstorm - Personal Cloud Sandbox
// Copyright (c) 2014 Sandstorm Development Group, Inc. and contributors
// All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

var utils = require("../utils"),
    short_wait = utils.short_wait,
    medium_wait = utils.medium_wait,
    long_wait = utils.long_wait,
    very_long_wait = utils.very_long_wait;

exports.command = function(url, packageId, dontStartGrain, callback) {
  var ret = this;
  if (!this.sandstormAccount) {
    ret = ret.loginGithub();
  }

  ret = ret
    .url(this.launch_url + "/install/" + packageId + "?url=" + url)
    .waitForElementVisible("#step-confirm", very_long_wait)
    .click("#confirmInstall")
    .waitForElementVisible(".new-grain-button", short_wait)
    .resizeWindow(utils.default_width, utils.default_height);

  if (!dontStartGrain) {
    ret = ret
      .click(".new-grain-button")
      .waitForElementVisible("#grainTitle", medium_wait);
  }

  if (typeof callback === "function") {
    return ret.status(callback);
  } else {
    return ret;
  }
};
