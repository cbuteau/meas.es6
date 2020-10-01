

const MEAS_TYPE = 'measure';
const MARK_TYPE = 'mark';

export class Tracker {
  constructor(perPtr, name) {
    this._perfPtr = perPtr;
    this.startName = name + '_start';
    this.endName = name + '_end';
    this.measName = name + '_meas';
    this.hasMeasured = false;
    this._perfPtr.mark(this.startName);
  }

  end() {
    this._perfPtr.mark(this.endName);
  }

  endnmeas(name) {
    this.end();
    return this.meas();
  }

  meas() {
    if (!this.hasMeasured) {
      this._perfPtr.measure(this.measName, this.startName, this.endName);
      this.hasMeasured = true;
    }
    return this._findmeas();
  }

  _findmeas() {
    var measures = this._perfPtr.getEntriesByType(MEAS_TYPE);
    for (var i = 0; i < measures.length; i++) {
      var current = measures[i];
      if (current.name === this.measName) {
        return current;
      }
    }
  }

  dump(prefix) {
    var measures = this._perfPtr.getEntriesByType(MEAS_TYPE);
    var that = this;
    var filtered = measures.filter(function(m) {
      return m.name === that.measName;
    });
    var prefixPath = prefix || '';
    if (this.options && this.options.stats) {
      var sum = 0;
      var min = Number.MAX_SAFE_INTEGER;
      var max = Number.MIN_SAFE_INTEGER;
      var len = filtered.length;
      for (var i = 0; i < len; i++) {
        var cur = filtered[i];
        var dur = cur.duration;
        sum += dur;
        if (dur < min) {
          min = dur;
        }
        if (dur > max) {
          max = dur;
        }
      }
      var avg = sum / len;

      var variance = 0;
      for (var j = 0; j < len; j++) {
        var varcalc = filtered[j];
        variance += (varcalc.duration - avg) ^ 2;
      }
      variance /= len;

      var stddev = Math.sqrt(variance);

      var formatted = 'name=' + this.name + ' cnt=' + len + ' avg=' + avg + ' min=' + min + ' max=' + max + ' σ2=' + variance + ' σ=' + stddev;
      console.log(formatted);
    } else {
      var len2 = filtered.length;
      if (len2 > 1) {
        console.warn('there are more than one entry...maybe you should do stats');
      }
      var current = filtered[len2 - 1];
      var formatted2 = 'name=' + this.name + ' value=' + current.duration;
      console.log(formatted2);
    }
  }
}
