

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
  },
  meas() {
    if (!this.hasMeasured) {
      this._perfPtr.measure(this.measName, this.startName, this.endName);
      this.hasMeasured = true;
    }
    return this._findmeas();
  },
  _findmeas() {
    var measures = this._perfPtr.getEntriesByType(MEAS_TYPE);
    for (var i = 0; i < measures.length; i++) {
      var current = measures[i];
      if (current.name === this.measName) {
        return current;
      }
    }
  }
}
