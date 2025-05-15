export interface CardInt {
    data: string;
    id: string,
    name: string,
    description: string,
    date: string,
    time: string,
    importance: "CRITICAL" | "NORMAL" | "IMPORTANT"
}