import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ICounterState, IIncrementAction, IStoreState } from "../store";
import styles from "./CarList.scss";

interface ICarListRouteParams {
  user: string;
}

interface ICarListState {
  cars: ICar[];
}

interface ICar {
  name: string;
}

interface IStateProps {
  count: number;
}

interface IDispatchProps {
  increment: (by?: number) => void;
}

interface IProps
  extends RouteComponentProps<ICarListRouteParams>,
    IStateProps,
    IDispatchProps {}

class CarList extends React.PureComponent<IProps, ICarListState> {
  public state: ICarListState = {
    cars: [],
  };
  public render(): React.ReactNode {
    return (
      <div>
        <div>{this.props.count}</div>
        {this.state.cars.map((car) => (
          <div className={styles.coolClass} key={car.name}>
            {car.name}
          </div>
        ))}
        <button onClick={() => this.props.increment(1)}>Count</button>
      </div>
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.match.params.user !== prevProps.match.params.user) {
      this.getCars();
    }
  }
  public componentDidMount() {
    this.getCars();
  }

  private async getCars() {
    const headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + btoa("interview_1:int_candidate12"),
    );

    const response = await fetch(
      `http://rest.learncode.academy/api/${
        this.props.match.params.user
      }/toycars`,
    );

    const cars: ICar[] = await response.json();

    this.setState((state) => ({
      ...state,
      cars,
    }));
  }
}

const mapStateToProps = (store: IStoreState) => ({
  count: store.counter.count,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IIncrementAction>,
): IDispatchProps => {
  return {
    increment: (by) => dispatch({ type: "INCREMENT", by }),
  };
};

const connectedCarList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarList);

const CarListWithRouter = withRouter(connectedCarList);

export default hot(module)(CarListWithRouter);
