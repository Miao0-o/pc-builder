// ============================================================
// AsyncState — Unified async state machine
// ============================================================

const STATE = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', EMPTY: 'empty', ERROR: 'error', STALE: 'stale' };

export class AsyncState {
  constructor(initialState = STATE.IDLE) {
    this.state = initialState;
    this.data = null;
    this.error = null;
    this.retryCount = 0;
    this.listeners = [];
  }

  onStateChange(fn) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }

  _notify() {
    for (const fn of this.listeners) {
      fn({ state: this.state, data: this.data, error: this.error });
    }
  }

  _setState(state) {
    this.state = state;
    this._notify();
  }

  async execute(asyncFn, options = {}) {
    const { maxRetries = 3, retryDelay = 1000, backoff = 'exponential' } = options;
    this._setState(STATE.LOADING);
    this.retryCount = 0;
    try {
      this.data = await this._withRetry(asyncFn, { maxRetries, retryDelay, backoff });
      if (this.data === null || this.data === undefined || (Array.isArray(this.data) && this.data.length === 0)) {
        this._setState(STATE.EMPTY);
      } else {
        this._setState(STATE.SUCCESS);
      }
      return this.data;
    } catch (err) {
      this.error = err;
      this._setState(STATE.ERROR);
      throw err;
    }
  }

  async _withRetry(fn, { maxRetries, retryDelay, backoff }) {
    let lastErr;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        this.retryCount = attempt;
        return await fn();
      } catch (err) {
        lastErr = err;
        if (attempt < maxRetries) {
          const delay = backoff === 'exponential' ? retryDelay * Math.pow(2, attempt) : retryDelay;
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    throw lastErr;
  }

  markStale() {
    if (this.state === STATE.SUCCESS || this.state === STATE.EMPTY) {
      this._setState(STATE.STALE);
    }
  }

  reset() {
    this.data = null;
    this.error = null;
    this.retryCount = 0;
    this._setState(STATE.IDLE);
  }
}

export { STATE };
