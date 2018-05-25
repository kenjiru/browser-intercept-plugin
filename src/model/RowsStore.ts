import {IObservableArray, observable} from "mobx";
import {IRequestRow} from "../panel/PanelService";

export class RowsStore {
    @observable
    private entries: IObservableArray<any> = observable.array([]);

    public addMultipleItems(items: any[]): void {
        const newEntries: any[] = this.entries.concat(items);

        this.entries.replace(newEntries);
    }

    public addSingleItem(item: any): void {
        this.entries.push(item);
    }

    public getRows(): IRequestRow[] {
        return this.entries;
    }
}

export const rowsStore: RowsStore = new RowsStore();
