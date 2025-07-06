export declare type CurrentTime = {
    /** 剩余总时间,单位毫秒 */
    total: number;
    /** 剩余天数	 */
    days: number;
    /** 剩余小时	 */
    hours: number;
    /** 剩余分钟	 */
    minutes: number;
    /** 剩余秒数	 */
    seconds: number;
    /** 剩余毫秒	 */
    milliseconds: number;
};
export declare type UseCountDownOptions = {
    /** 倒计时时长，单位毫秒 */
    time: number;
    /** 是否开启毫秒级渲染 */
    millisecond?: boolean;
    /** 是否自动开始倒计时 */
    autostart?: boolean;
    /** 倒计时改变时触发的回调函数 */
    onChange?: (current: CurrentTime) => void;
    /** 倒计时结束时触发的回调函数 */
    onFinish?: () => void;
};
export default function useCountDown(options: UseCountDownOptions): {
    readonly start: () => void;
    readonly pause: () => void;
    readonly reset: (totalTime?: number) => void;
    readonly current: CurrentTime;
};
