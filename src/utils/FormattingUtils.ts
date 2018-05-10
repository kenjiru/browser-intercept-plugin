export default class FormattingUtils {
    public static formatBytes(bytes: number, decimals: number = 1): string {
        if (bytes === 0) {
            return "0";
        }

        const k: number = 1024;
        const sizes: string[] = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i: number = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
    }
}
