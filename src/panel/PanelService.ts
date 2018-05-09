export interface IRequestRow {
    name: string;
    method: string;
    status: number;
    type: string;
    size: number;
    time: number
}

export default class PanelService {
    public static getRequestRows(): Promise<IRequestRow[]> {
        return new Promise((resolve, reject) => {
            chrome.devtools.network.getHAR((harLog: any) => {
                const harEntries = harLog.entries;
                const requestRows: IRequestRow[] = harEntries.map(PanelService.mapEntryToRow);

                resolve(requestRows);
            });
        });
    }

    private static mapEntryToRow = (entry) => ({
        name: PanelService.getFileName(entry.request.url),
        method: entry.request.method,
        status: entry.response.status,
        type: "",
        size: entry.response.bodySize,
        time: Math.round(entry.time),
    })

    private static getFileName(path: string): string {
        return path.split("\\").pop().split("/").pop().substr(0, 20);
    }
}
