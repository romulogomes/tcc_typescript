import * as React from 'react';
import { Field } from 'react-final-form'

export interface InputProps {
    label: string;
    name: string;

}

export default class InputText extends React.Component<InputProps, any> {
  public render() {
    return (
        <div className="form-group">
        <label htmlFor="name">{this.props.label}</label>
            <Field name={this.props.name} component="input" type="text" className="form-control" />
        </div>
    );
  }
}
