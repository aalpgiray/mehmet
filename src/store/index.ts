import { Action, combineReducers, createStore } from "redux";

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

type ActionType = IIncrementAction | IDecrementAction;

export interface IStoreState {
  counter: ICounterState;
  counter2: ICounterState;
}

export interface ICounterState {
  count: number;
}

function counter(
  state: ICounterState = {
    count: 0,
  },
  action: ActionType,
): ICounterState {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + (action.by || 1),
      };
    case "DECREMENT":
      return {
        count: state.count - (action.byDecrement || 1),
      };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(
  combineReducers({
    counter,
    counter2: counter,
  }),
);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

export interface IIncrementAction extends Action {
  type: "INCREMENT";
  by?: number;
}

export interface IDecrementAction extends Action {
  type: "DECREMENT";
  byDecrement?: number;
}

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch<IIncrementAction>({ type: "INCREMENT" });
// tslint:disable-next-line:no-console
console.log(store.getState());

store.dispatch<IIncrementAction>({ type: "INCREMENT", by: 10 });
// tslint:disable-next-line:no-console
console.log(store.getState());

store.dispatch<IDecrementAction>({ type: "DECREMENT" });
// tslint:disable-next-line:no-console
console.log(store.getState());

// tslint:disable-next-line:no-console
console.log(store.getState());
