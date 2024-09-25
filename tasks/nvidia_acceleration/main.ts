import type { Context } from "@oomol/types/oocana";
import { FfmpegCommand } from "fluent-ffmpeg";

type Inputs = Readonly<{ ffmpeg_source: FfmpegCommand }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand }>;

export default async function (
  inputs: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const newFF = inputs.ffmpeg_source
    .clone()
    .outputOptions("-vsync 0")
    .outputOptions("-hwaccel cuvid")
    .inputFormat("mp4")
    .videoCodec("h264_cuvid") // 解码使用cuvid
    .audioCodec("copy") // 音频流直接复制
    .videoCodec("h264_nvenc") // 编码使用nvenc
    .videoBitrate("5M"); // 视频比特率设置为5Mbps
  return { ffmpeg_source: newFF };
}
