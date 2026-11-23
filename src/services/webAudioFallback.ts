import { AudioFormat, TrimSettings } from '../types';

/**
 * Encodes AudioBuffer into 16-bit PCM WAV Blob
 */
function bufferToWave(abuffer: AudioBuffer, offset: number, len: number): Blob {
  const numOfChan = abuffer.numberOfChannels;
  const length = len * numOfChan * 2 + 44;
  const out = new ArrayBuffer(length);
  const view = new DataView(out);
  const channels: Float32Array[] = [];
  let sample: number;
  let pos = 0;

  function setUint16(data: number) {
    view.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    view.setUint32(pos, data, true);
    pos += 4;
  }

  // write WAVE header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(abuffer.sampleRate);
  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit precision

  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  for (let i = 0; i < abuffer.numberOfChannels; i++) {
    channels.push(abuffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < numOfChan; i++) {
      sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      view.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([out], { type: 'audio/wav' });
}

export async function extractAudioViaWebAudio(
  file: File,
  options: {
    format: AudioFormat;
    trim: TrimSettings;
  },
  onStatusUpdate?: (status: string) => void
): Promise<{ blob: Blob; duration: number }> {
  if (onStatusUpdate) onStatusUpdate('Reading video file into memory buffer...');
  const arrayBuffer = await file.arrayBuffer();

  if (onStatusUpdate) onStatusUpdate('Decoding audio stream with Web Audio API...');
  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  
  try {
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const sampleRate = audioBuffer.sampleRate;
    const totalDuration = audioBuffer.duration;

    let startSample = 0;
    let endSample = audioBuffer.length;

    if (options.trim.enabled) {
      if (options.trim.startTime > 0) {
        startSample = Math.floor(Math.min(options.trim.startTime, totalDuration) * sampleRate);
      }
      if (options.trim.endTime > 0 && options.trim.endTime > options.trim.startTime) {
        endSample = Math.floor(Math.min(options.trim.endTime, totalDuration) * sampleRate);
      }
    }

    const duration = Math.max(0, (endSample - startSample) / sampleRate);

    if (onStatusUpdate) onStatusUpdate('Encoding audio into output format...');
    const wavBlob = bufferToWave(audioBuffer, startSample, endSample - startSample);

    return { blob: wavBlob, duration };
  } finally {
    if (audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
    }
  }
}
