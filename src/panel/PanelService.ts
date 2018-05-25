import * as _ from "lodash";
import {rowsStore} from "../model/RowsStore";
import FormattingUtils from "../utils/FormattingUtils";

export interface IRequestRow {
    key: number;
    name: string;
    url: string;
    method: string;
    status: number;
    type: string;
    size: number;
    sizeString: string;
    time: number;
    harEntry: any;
}

export default class PanelService {
    public static handleRequests(): void {
        PanelService.getInitialRequests();
        PanelService.handleNewRequests();
    }

    private static handleNewRequests(): void {
        chrome.devtools.network.onRequestFinished.addListener((harEntry: any) => {
            const index: number = rowsStore.getRows().length;
            const requestRow: IRequestRow = PanelService.mapEntryToRow(harEntry, index);

            rowsStore.addSingleItem(requestRow);
        });
    }

    private static getInitialRequests(): void {
        setTimeout(() => {
            PanelService.getRequestRows().then((requestRows) =>
                rowsStore.addMultipleItems(requestRows));
        }, 5000);
    }

    private static getRequestRows(): Promise<IRequestRow[]> {
        return new Promise((resolve, reject) => {
            chrome.devtools.network.getHAR((harLog: any) => {
                const harEntries = harLog.entries;
                const requestRows: IRequestRow[] = harEntries.map(PanelService.mapEntryToRow);

                resolve(requestRows);
            });
        });
    }

    private static mapEntryToRow = (entry: any, index: number): IRequestRow => {
        const time: number = Math.round(entry.time);
        const size: number = PanelService.calculateSize(entry.response);

        return {
            key: index,
            name: PanelService.getFileName(entry.request.url),
            url: entry.request.url,
            method: entry.request.method,
            status: entry.response.status,
            type: entry.response.content ? entry.response.content.mimeType : "",
            size,
            sizeString: PanelService.formatSize(size),
            time,
            harEntry: entry,
        };
    }

    private static calculateSize(response): number {
        if (response.bodySize === 0 && response.headersSize === 0) {
            return 0;
        }

        if (response.bodySize < 0 && response.headersSize < 0) {
            return -1;
        }

        return response.bodySize + response.headersSize;
    }

    private static formatSize(size: number): string {
        if (size === 0) {
            return "From cache";
        }

        if (size === -1) {
            return "Not available";
        }

        if (size < 0) {
            return _.toString(size);
        }

        return FormattingUtils.formatBytes(size);
    }

    private static getFileName(path: string): string {
        return path.split("\\").pop().split("/").pop().substr(0, 20);
    }
}
