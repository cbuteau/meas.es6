
export class TrackerSection {
  constructor(perfPtr, name, trackerPrefix) {
    this.perfPtr = perfPtr;
    this.name = name;
    this.trackerPrefix = trackerPrefix;
    this.enabled = true;
    this.trackers = {};
    this.sections = {};
  }

  start(trackerName, options) {
    if (!this.enabled) {
      return;
    }

    var prefixedName = this.trackerPrefix + '.' + trackerName;

    if (this.trackers[trackerName]) {
      // at least end the current before replacing.
      this.trackers[trackerName].endnmeas();
    }

    this.trackers[trackerName] = new Tracker(this.perfPtr, prefixedName, options);
  }


  end(trackerName) {
    if (!this.enabled) {
      return;
    }

    if (this.trackers[trackerName]) {
      this.trackers[trackerName].end();
    }
  }

  enable(enabled) {
    this.enabled = enabled;

    var sectionKeys = Object.keys(this.sections);
    for (var j = 0; j < sectionKeys.length; j++) {
      var sectionId = sectionKeys[j];
      this.sections[sectionId].enable(enabled);
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

  dump(prefix) {
    var prefixPath = prefix || '';
    if (prefixPath.length) {
      prefixPath += '.' + this.name;
    } else {
      prefixPath = this.name;
    }

    var trackerKeys = Object.keys(this.trackers);
    for (var i = 0; i < trackerKeys.length; i++) {
      var trackerId = trackerKeys[i];
      var tracker = this.trackers[trackerId];
      tracker.meas();
      this.trackers[trackerId].dump(prefixPath);
    }

    var sectionKeys = Object.keys(this.sections);
    for (var j = 0; j < sectionKeys.length; j++) {
      var sectionId = sectionKeys[j];
      this.sections[sectionId].dump(prefixPath);
    }
  }

}
