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
    .inputOption([
      "-vsync 0",
      "-hwaccel cuvid",
      "-c:v h264_cuvid"
    ])
    .inputFormat("mp4")
    .audioCodec("copy") // 音频流直接复制
    .videoCodec("h264_nvenc") // 编码使用nvenc
  return { ffmpeg_source: newFF };
}
