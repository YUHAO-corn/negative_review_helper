import { UploaderValueItem, UploaderMaxSize, UploaderResultType } from './PropsType';
export declare function toArray<T>(item: T | T[]): T[];
export declare function readFileContent(file: File, resultType: UploaderResultType): Promise<string | void>;
export declare function isOversize(files: File[], maxSize: UploaderMaxSize): boolean;
export declare function filterFiles(items: File[], maxSize: UploaderMaxSize): {
    valid: File[];
    invalid: File[];
};
export declare function isImageUrl(url: string): boolean;
export declare function isImageFile(item: UploaderValueItem, isImage?: boolean): boolean;
