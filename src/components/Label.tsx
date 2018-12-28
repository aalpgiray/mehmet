import * as React from "react";

import mehmetStyles from "./Mehmet.scss";
export interface ILabelProps {
  label: string;
}

class Label extends React.Component<ILabelProps> {
  public render() {
    const { label } = this.props;

    return <label className={mehmetStyles.car}>{label}</label>;
  }
}

export default Label;
