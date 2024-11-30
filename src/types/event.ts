export interface Event{
    id: number;
    title: string;
    description?: string;
    start_time: Date;
    end_time: Date;
    time_zone: string;
    location?: string;
    created_at: Date;
    updated_at: Date;
}