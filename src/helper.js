

const MEAS_TYPE = 'measure';
const MARK_TYPE = 'mark';

class ClearHelper {
  constructor(perfPtr) {
      this.perfPtr = perfPtr;
  }

  _set(perfPtr) {
    this.perfPtr = perfPtr;
  }

  mark() {
    this.perfPtr.clearMarks();
  }

  meas() {
    this.perfPtr.clearMeasures();
  }
}


class LsHelper  {
  constructor(perfPtr) {
    this.perfPtr = perfPtr;
  }
  _set(perfPtr) {
    this.perfPtr = perfPtr;
  }

  mark() {
    var marks = this.perfPtr.getEntriesByType(MARK_TYPE);
    var result = [];
    for (var i = 0; i < marks.length ; i++) {
      result.push(marks[i].name);
    }
    return result;
  }

  meas() {
    var marks = this.perfPtr.getEntriesByType(MEAS_TYPE);
    var result = [];
    for (var i = 0; i < marks.length ; i++) {
      result.push(marks[i].name);
    }
    return result;
  }
}

function FindHelper(perfPtr) {
  this.perfPtr = perfPtr;
}

FindHelper.prototype = {
  constructor(perfPtr) {
      this.perfPtr = perfPtr;
  }

  _set(perfPtr) {
    this.perfPtr = perfPtr;
  }

  mark(context) {
    var marks = this.perfPtr.getEntriesByType(MARK_TYPE);
    var result = [];
    for (var i = 0; i < marks.length ; i++) {
      var current = marks[i];
      if (current.name.indexOf(context) !== -1) {
        result.push(current);
      }
    }
    return result;
  }

  meas(context) {
    var meas = this.perfPtr.getEntriesByType(MEAS_TYPE);
    var result = [];
    for (var i = 0; i < meas.length ; i++) {
      var current = meas[i];
      if (current.name.indexOf(context) !== -1) {
        result.push(current);
      }
    }
    return result;
  }
}


export class PerfHelper {
  constructor(perfPtr) {
    this._perfPtr = perfPtr;
    this.clearHelper = new ClearHelper(perfPtr);
    this.lsHelper = new LsHelper(perfPtr);
    this.findHelper = new FindHelper(perfPtr);
  }

  get find() {
    return this.findHelper;
  }

  get clr() {
    return this.clearHelper;
  }

  get ls() {
    return this.lsHelper;
  }

  _set(perfPtr) {
    this._perfPtr = perfPtr;
    this.clearHelper._set(perfPtr);
    this.lsHelper._set(perfPtr);
    this.findHelper._set(perfPtr);
  }  
}
