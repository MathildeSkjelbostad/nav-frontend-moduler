import React from 'react';

import { Innholdstittel, Systemtittel, Undertittel } from 'NavFrontendModules/nav-frontend-typografi';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';

import Code, { Inline } from './../code/Code';
import TableOfContents from './../table-of-contents/TableOfContents';

import './styles.less';

class MdxContent extends React.Component {
    constructor(props) {
        super(props);
        this.headlines = [];
        this.state = {
            ready: false
        };
    }

    componentDidMount = () => {
        this.setState({ ready: true });
    }

    registerHeadline = (type, title) => {
        const id = this.generateHeadlineID(title.children);

        if (this.state.ready) return id;

        this.headlines.push({
            id,
            parent: undefined,
            type: parseInt(type.substring(2, 1), 10),
            title: title.children
        });

        return id;
    }

    generateHeadlineID = (content) => content.toLowerCase().split(' ').join('-')

    render() {
        return (
            <div className="mdx-content">
                <section className="section">
                    <this.props.children
                        components={{
                            h1: (props) => {
                                const id = this.generateHeadlineID(props.children);
                                return <Innholdstittel id={id} {...props} />;
                            },
                            h2: (props) => {
                                const id = this.registerHeadline('h2', props);
                                return <Systemtittel id={id} {...props} />;
                            },
                            h3: (props) => {
                                const id = this.registerHeadline('h3', props);
                                return <Undertittel id={id} {...props} tag="h3" />;
                            },
                            a: (props) => <Lenke {...props} />,
                            code: Code,
                            inlineCode: Inline
                        }}
                    />
                </section>
                { this.state.ready && <TableOfContents headlines={this.headlines} /> }
            </div>
        );
    }
}

export default MdxContent;
