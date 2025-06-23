let micStream = null;
let audioRecorderContext = null;
let audioRecorderNode = null;

export async function startAudioRecorderWorklet(audioRecorderHandler) {
  audioRecorderContext = new window.AudioContext({ sampleRate: 16000 });
  const workletURL = process.env.PUBLIC_URL + "/audio/pcm-recorder-processor.js";
  await audioRecorderContext.audioWorklet.addModule(workletURL);

  micStream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } });
  const source = audioRecorderContext.createMediaStreamSource(micStream);

  audioRecorderNode = new AudioWorkletNode(audioRecorderContext, "pcm-recorder-processor");
  source.connect(audioRecorderNode);

  audioRecorderNode.port.onmessage = (event) => {
    if (audioRecorderHandler) audioRecorderHandler(event.data);
  };

  return [audioRecorderNode, audioRecorderContext, micStream];
}

export function stopMicrophone() {
  if (micStream) {
    micStream.getTracks().forEach((track) => track.stop());
    micStream = null;
  }
  if (audioRecorderContext) {
    audioRecorderContext.close();
    audioRecorderContext = null;
  }
}