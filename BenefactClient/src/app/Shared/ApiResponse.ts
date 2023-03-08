import { StatusType } from "./AtParEnums";

export class ApiResponse<T> {
    data: T | undefined;
    dataList!: T[];
    dataVariable!: Object;
    exceptionMessage!: string;
    statType!: StatusType;
    statusCode: any;
    statusMessage!: string; 
    dataDictionary!: T[];
}