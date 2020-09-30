

import {Tracker} from "./tracker.js"
import {BrowserFlags, OsFlags} from "./flags.js"
import {PerfHelper} from "./helper.js"
import {TrackerSection} from "./section.js"

class TrackerManager {
  constructor() {
    this.trackers = {};
    this.sections = {};
    this.perfHelper = new PerfHelper(this.perfPtr);
    this.setPerfPtr(window.performance);
    this.enabled = true;
  }

  get BrowserFlags() {
    return BrowserFlags;
  }

  get OsFlags() {
    return OsFlags;
  }

  set buffersize(value) {
    this._perfPtr.setResourceTimingBufferSize(value);
  }

  setPerfPtr(object) {
    if (object.mark && object.measure && object.getEntriesByType) {
      this._perfPtr = object;
      this.perfHelper._set(object);
      if (object.onresourcetimingbufferfull) {
        object.onresourcetimingbufferfull  = function() {
          console.error('You cannot make more marks and measures try upping your buffersize');
        }
      }
    }
  }

  start(name) {
    if (!this.enabled) {
      return;
    }
    this.trackers[name] = new Tracker(this.perfPtr, name);
  }

  end(name) {
    if (!this.enabled) {
      return;
    }

    if (this.trackers[name]) {
      this.trackers[name].end();
    }
  }

  endnmeas(name) {
    if (!this.enabled) {
      return;
    }

    if (this.trackers[name]) {
      return this.trackers[name].endnmeas();
    }
  }

  meas(name) {
    if (!this.enabled) {
      return;
    }

    if (this.trackers[name]) {
      return this.trackers[name].meas();
    }
  }

  specificMeas(name, startMarkName, endMarkName) {
    this.perfPtr.measure(name, startMarkName, endMarkName);
    var meass = this.perfPtr.getEntriesByType('measure');
    return meass.filter(function(m) {
      return m.name === name;
    });
  }

  withMeas(name, callback) {
    try {
      this.start(name);
      callback();
    } finally {
      this.end(name);
    }
  }

  addOrGetSection(name) {
    if (!this.enabled) {
      return;
    }
    var check = this.sections[name];
    if (check) {
      return check;
    } else {
      var trackerPrefix = this.trackerPrefix + '.' + this.name;
      check = this.sections[name] = new TrackerSection(this.perfPtr, name, trackerPrefix);
    }

    return check;
  }

  enable(enabled) {
    this.enabled = enabled;
  }

  get perfPtr() {
    return this._perfPtr;
  }

  get perf() {
    return this.perfHelper;
  }
}


const meas = new TrackerManager();
export { meas };
