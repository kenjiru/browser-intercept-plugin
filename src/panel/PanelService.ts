export interface IRequestRow {
    name: string;
    method: string;
    status: number;
    type: string;
    size: number;
}

export default class PanelService {
    public static getRequestRows(): Promise<IRequestRow[]> {
        return new Promise((resolve, reject) => {
            chrome.devtools.network.getHAR((harLog: any) => {
                const harEntries = harLog.entries;
                const requestRows: IRequestRow[] = harEntries.map(PanelService.mapRequestToRow);

                resolve(requestRows);
            });
        });
    }

    private static mapRequestToRow = (request) => ({
        name: PanelService.getFileName(request.request.url),
        method: request.request.method,
        status: request.response.status,
        type: "",
        size: request.response.bodySize,
    })

    private static getFileName(path: string): string {
        return path.split("\\").pop().split("/").pop().substr(0, 20);
    }
}
