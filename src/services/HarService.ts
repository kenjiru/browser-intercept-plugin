import * as _ from "lodash";
import {rowsStore} from "../model/RowsStore";
import FormattingUtils from "../utils/FormattingUtils";

export interface IRequestRow {
    key: string;
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

export default class HarService {
    public static async getHarEntryContent(harEntry: any): Promise<any> {
        return new Promise((resolve, reject) => {
            harEntry.getContent(resolve);
        });
    }

    public static handleRequests(): void {
        HarService.getInitialRequests();
        HarService.handleNewRequests();
    }

    private static handleNewRequests(): void {
        chrome.devtools.network.onRequestFinished.addListener(async (harEntry: any) => {
            const requestRow: IRequestRow = await HarService.mapEntryToRow(harEntry);

            rowsStore.addSingleItem(requestRow);
        });
    }

    private static getInitialRequests(): void {
        HarService.getRequestRows().then(rowsStore.addMultipleItems);
    }

    private static async getRequestRows(): Promise<IRequestRow[]> {
        const harLog: any = await HarService.getHarLog();
        const harEntries: any[] = harLog.entries;

        return await harEntries.map(HarService.mapEntryToRow);
    }

    private static getHarLog(): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.devtools.network.getHAR(resolve);
        });
    }

    private static mapEntryToRow(entry: any): IRequestRow {
        const time: number = Math.round(entry.time);
        const size: number = HarService.calculateSize(entry.response);
        const method: string = entry.request.method;
        const key: string = `${time}-${entry.request.url}-${method}`;

        return {
            key,
            name: HarService.getName(entry),
            url: entry.request.url,
            method,
            status: entry.response.status,
            type: entry.response.content ? entry.response.content.mimeType : "",
            size,
            sizeString: HarService.formatSize(size),
            time,
            harEntry: entry,
        };
    }

    private static getName(harEntry: any): string {
        const url: string = harEntry.request.url;
        const fileName: string = HarService.getFileName(url);

        if (_.isEmpty(fileName) === false) {
            return fileName;
        }

        const hostName: string = HarService.getHostName(url);

        if (_.isEmpty(hostName) === false) {
            return hostName;
        }

        return harEntry.request.url;
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

    private static getHostName(path: string): string {
        const url = new URL(path);

        return url.hostname;
    }

    private static getFileName(path: string): string {
        return path.split("\\").pop().split("/").pop().substr(0, 20);
    }
}
