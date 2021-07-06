type Callback = (...args: any[]) => void;
type EventMap = {
  [type: string]: Array<Callback>;
};
type Saga = {
  /**
   * listen for events
   * @param {string} type Type of event, `'*'` is all events
   * @param {Function} callback Function
   */
  on(type: string, callback: Callback): () => Callback;
  /**
   * Trigger event
   * @param {string} type Type of event
   * @param  args Callback arguments
   */
  emit(type: string, ...args: any[]): void;
};

function saga(eventMap?: EventMap): Saga {
  const map = eventMap || Object.create(null);
  return {
    on(type: string, callback: Callback) {
      (map[type] || (map[type] = [])).push(callback);
      return () => map[type].splice(map[type].indexOf(callback) >>> 0, 1);
    },

    emit(type: string, ...args: any[]) {
      (map[type] || []).forEach((callback: Callback) => {
        callback(...args);
      });
      type !== "*" && (map["*"] || []).forEach((callback: Callback) => {
        callback(...args);
      });
    },
  };
}

export default saga;
