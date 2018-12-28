import * as React from "react";
import { hot } from "react-hot-loader";
import Label from "./Label";

import CarListScss from "./CarList.scss";
interface IState {
  name: string;
}

class About extends React.Component<{}, IState> {
  public state: IState = {
    name: "",
  };
  public render() {
    const InfoJSON = this.infoJSON;
    const hede = "sada";
    return (
      <React.Fragment>
        <h2>About Me</h2>
        <Label label="Adınız" />
        <input type="text" value={this.state.name} onChange={this.onChange} />
        <InfoJSON />
      </React.Fragment>
    );
  }

  private infoJSON = () => (
    <div className={CarListScss.jsonShower}>{JSON.stringify(this.state)}</div>
  )

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setName(event.target.value)

  private setName(name: string) {
    this.setState({
      name,
    });
  }
}

export default hot(module)(About);
