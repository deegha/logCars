import { useEffect, useState } from "react"
import axios from "axios"
export const Player = ({ url }) => {

  const [play, setPlay ] = useState(false)

  useEffect(() =>{

    playMusic(url)
  }, [url])


  const playMusic =  async (url) => {
    if(url !== "") {
      console.log("start playing")
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
       });
       // create audio context
       const audioContext = getAudioContext();
       // create audioBuffer (decode audio file)
       const audioBuffer = await audioContext.decodeAudioData(response.data);

       // create audio source
       const source = audioContext.createBufferSource();
       source.buffer = audioBuffer;
       source.connect(audioContext.destination);

       source.start()
    }

  }

  return (
    <div>

      <div onClick={() => setPlay(true)}>play</div>
    </div>
  )
}
