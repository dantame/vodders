export const getAudioPeaks = (videoFile) => {
  const URL = window.URL || window.webkitURL
  const videoObjectUrl = URL.createObjectURL(videoFile)

  const context = new AudioContext()
  const audio = new Audio(videoObjectUrl)
  audio.play().then(() => {
    audio.pause()
    const offlineContext = new OfflineAudioContext(2,44100*audio.duration,44100)
    const source = context.createBufferSource()
    const scriptNode = context.createScriptProcessor(0, 1, 1)

    scriptNode.onaudioprocess = (e) => {

    }

    source.onended = () => {
      console.log("playback ended")
      source.disconnect(scriptNode)
      scriptNode.disconnect(context.destination)
    }

    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      context.decodeAudioData(e.target.result).then((buffer) => {
        console.log("DECODED")
        source.buffer = buffer
        source.connect(scriptNode)
        scriptNode.connect(context.destination)
        source.start()
      })
    }
    fileReader.readAsArrayBuffer(videoFile)

  })
}
