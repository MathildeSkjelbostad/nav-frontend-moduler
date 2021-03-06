import React from 'react';

import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

import ModuleBrowser from './../../../../components/module-browser/ModuleBrowser';
import { Bash } from './../../../../components/code/Code';

class Technical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeModule: 0
        };
    }

    renderInstallInstructions = () => (
        <div className="install-doc">
            <Systemtittel id="installering">Installering</Systemtittel>
            <Bash>
                { this.props.componentData.installInstructions }
            </Bash>
        </div>
    );

    render() {
        const { name, version } = this.props.componentData.manifest;

        return (
            <React.Fragment>
                <section className="section full">
                    <Systemtittel id="npm-pakke">NPM-pakke</Systemtittel>
                    <table className="tabell">
                        <tbody>
                            <tr>
                                <th>Navn:</th>
                                <td>
                                    <Lenke href={`https://www.npmjs.com/package/${name}`}>
                                        {name}
                                    </Lenke>
                                </td>
                            </tr>
                            <tr>
                                <th>Siste versjon:</th>
                                <td>
                                    <Lenke href={`https://www.npmjs.com/package/${name}?activeTab=versions`}>
                                        {version}
                                    </Lenke>
                                </td>
                            </tr>
                            <tr>
                                <th>Peer&nbsp;dependencies:</th>
                                <td className="dependencies">
                                    {
                                        Object.keys(this.props.componentData.manifest.peerDependencies).map((dep) =>
                                            [
                                                <Lenke
                                                    key={dep}
                                                    href={`https://www.npmjs.com/package/${dep}`}
                                                >
                                                    {dep}
                                                </Lenke>,
                                                ' '
                                            ]
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="section full">
                    { this.renderInstallInstructions() }
                </section>
                <section className="section full">
                    <ModuleBrowser data={this.props.componentData} package={this.props.componentData.manifest} />
                </section>
            </React.Fragment>
        );
    }
}

export default Technical;
