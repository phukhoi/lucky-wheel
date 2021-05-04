import React from 'react';
import * as CnvDesign from '@cnv.tech/cnv-design';

interface GameTemplateState {
    open: boolean;
}

class GameTemplate extends React.Component<{}, GameTemplateState> {
    constructor(props: any) {
        super(props);
        this.state = {open: false}
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            open: ! this.state.open
        });
    }

    render() {
        return (
            <div>
                <CnvDesign.Components.Inputs.Button variant={"primary"} onClick={this.toggle}>
                    Choose game
                </CnvDesign.Components.Inputs.Button>

                <CnvDesign.Components.Popup width={'50%'} show={this.state.open}>
                    <div className="popup-header mb-3">
                        <h2>Create game</h2>
                    </div>

                    <div className="popup-body">
                        <CnvDesign.Components.Form.Group>
                            <CnvDesign.Components.Form.Control></CnvDesign.Components.Form.Control>
                        </CnvDesign.Components.Form.Group>
                    </div>

                    <div className="popup-footer">
                        <button className="btn btn-primary text-right" onClick={this.toggle}>Save</button>
                    </div>
                </CnvDesign.Components.Popup>
            </div>
        );
    }
}

export default GameTemplate;