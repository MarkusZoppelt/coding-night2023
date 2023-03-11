import { VideoData } from "./VideoData";

export interface SessionState
{
    seed :string;
    videoNumber :number;
    actualViews :number[];
    guessedViews :number[];
    videoData: VideoData[];
}