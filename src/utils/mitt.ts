/**
 * https://github.com/developit/mitt
 */

export type EventType = string | symbol;

// 接受一个可选的事件参数
// 并且不应返回值
export type Handler<T = any> = (event?: T) => void;
export type WildcardHandler = (type: EventType, event?: any) => void;

// 当前所有注册的活动处理程序的数组
export type EventHandlerList = Array<Handler>;
export type WildCardEventHandlerList = Array<WildcardHandler>;

// 事件类型及其相应事件处理程序的map
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;

export interface Emitter {
  all: EventHandlerMap;

  on<T = any>(type: EventType, handler: Handler<T>): void;
  on(type: '*', handler: WildcardHandler): void;

  off<T = any>(type: EventType, handler: Handler<T>): void;
  off(type: '*', handler: WildcardHandler): void;

  emit<T = any>(type: EventType, event?: T): void;
  emit(type: '*', event?: any): void;
  clear(): void;
}

export default function mitt(all?: EventHandlerMap): Emitter {
  all = all || new Map();

  return {
    /**
     * 事件名称到已注册处理程序函数的映射.
     */
    all,

    /**
     * 注册事件.
     * @param {string|symbol} type 要监听的事件类型，或“*”表示所有事件
     * @param {Function} handler 响应函数
     */
    on<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      const added = handlers && handlers.push(handler);
      if (!added) {
        all?.set(type, [handler]);
      }
    },

    /**
     * 移除事件.
     * @param {string|symbol} type 事件类型，“*”表示所有事件
     * @param {Function} handler 删除函数
     */
    off<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },

    /**
     * 调用给定类型的所有事件
     *
     * 不支持手动触发“*”处理程序.
     *
     * @param {string|symbol} type 要调用的事件类型
     * @param {Any} [evt] 传递给每个处理程序的任何值(建议是对象
     */
    emit<T = any>(type: EventType, evt: T) {
      ((all?.get(type) || []) as EventHandlerList).slice().map((handler) => {
        handler(evt);
      });
      ((all?.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
        handler(type, evt);
      });
    },

    /**
     * 清除所有
     */
    clear() {
      this.all.clear();
    },
  };
}
