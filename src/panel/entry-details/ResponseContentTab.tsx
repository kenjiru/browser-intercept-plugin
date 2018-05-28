import {PureComponent, ReactElement} from "react";
import * as React from "react";
import HarService from "../../services/HarService";

interface IResponseContentTabProps {
    harEntry: any;
}

interface IResponseContentTabState {
    responseContent?: string;
}

export default class ResponseContentTab extends PureComponent<IResponseContentTabProps, IResponseContentTabState> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        this.getResponseContent(this.props.harEntry);
    }

    public componentWillReceiveProps(nextProps: IResponseContentTabProps): void {
        if (this.props.harEntry !== nextProps.harEntry) {
            this.getResponseContent(nextProps.harEntry);
        }
    }

    public render(): ReactElement<any> {
        return (
            <pre className="response-content-tab">
                {this.state.responseContent}
            </pre>
        );
    }

    private async getResponseContent(harEntry): Promise<void> {
        const responseContent: any = await HarService.getHarEntryContent(harEntry);

        this.setState({
            responseContent,
        });
    }

    /*
        private renderResponseContent(): string {
            const { harEntry} = this.props;
            const contentType: string = harEntry.response.headers["content-type"];

            console.log(contentType);

            if (contentType && contentType.indexOf("application/json") > -1) {
                return JSON.parse(harResponse.content.text);
            }

            return harResponse.content.text;
        }
    */
}
