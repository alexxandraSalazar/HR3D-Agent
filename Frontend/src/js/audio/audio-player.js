let audioContext = null;
let audioPlayerNode = null;

export async function startAudioPlayerWorklet() {
  audioContext = new window.AudioContext({ sampleRate: 24000 });
  const workletURL = process.env.PUBLIC_URL + "/audio/pcm-player-processor.js";
  await audioContext.audioWorklet.addModule(workletURL);

  audioPlayerNode = new AudioWorkletNode(audioContext, "pcm-player-processor");
  audioPlayerNode.connect(audioContext.destination);

  return [audioPlayerNode, audioContext];
}

export function stopAudioPlayer() {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}