import * as React from 'react';

export default class BotaoSubmit extends React.Component<any, any> {
  public render() {
    const { labelCadastrar, submitting, pristine} = this.props;
    return (
            <button type="submit" disabled={submitting || pristine} className="btn btn-primary">{labelCadastrar ? labelCadastrar : 'Cadastrar'}</button>
        );
    }
}
