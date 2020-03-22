import { useState } from "react"
import css from "./styles.scss"
import { Header, DropDown } from "../../components"
import { genre } from "../../services/genre"

const initialInputs ={
  title: "",
  description: "",
  genre: {
    name: "",
    code: ""
  }
}

export const UploadMusicView = ({ upload }) => {

  const [songFile, setSong] = useState(null)
  const [imageFile, setImage] = useState(null)
  const [input, setInput] = useState(initialInputs)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    if(event.target.files.length < 1)
      return

    const file = event.target.files[0]
    const blobUrl = URL.createObjectURL(event.target.files[0])

    if(file.type.indexOf("audio") === -1) {
      return
    }

    setSong({
      blobUrl,
      file
    })

    setInput({
      ...input,
      title: file.name
    })
  }

  const handleImageFileChange =  (event) => {
    if(event.target.files.length < 1)
      return

    const file = event.target.files[0]
    const blobUrl = URL.createObjectURL(event.target.files[0])

    if(file.type.indexOf("image") === -1) {
      return
    }

    setImage({
      blobUrl,
      file
    })
  }

  const onChangeText = (e) => {
    setInput({
      ...input,
      [e.target.name]:  e.target.value
    })
  }

  const selectGenre = (item) => {
    setInput({
      ...input,
      genre: item
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      songFile,
      imageFile,
      input
    }

    try {
      await upload(data)
      setLoading(false)
    }catch(err) {
      setLoading(false)

      console.log(err)
    }
  }

  const validForm = input.title !== "" && input.genre.name !== "" && songFile !== null && imageFile !== null

  return (
    <div className={"upload-container"}>
      <Header />
      <div className={"upload-formWrapper"}>
        <div className={"upload-formItem"}>
          <h1>Upload your music here</h1>
        </div>
        {!songFile ? (
          <div className={"upload-formItem"}>
            <input type="file" name="file" id="file" className={"upload-inputfile"} onChange={handleFileChange} />
            <label htmlFor="file" className={"upload-labelFile"}> Upload your track</label>
          </div>
        ) : (
          <div>
            <form onSubmit={submitForm}>
              <div className={"upload-formItem"}>
                <input type="file" name="file" id="file" className={"upload-inputfile"} onChange={handleImageFileChange} />
                <label htmlFor="file" className={"upload-labelImage"} style={imageFile && ({ backgroundImage: `url(${imageFile.blobUrl})` })}>{!imageFile && ("Upload Image")}</label>
              </div>
              <div className={"upload-formItem"}>
                <input type="text" value={input.title} name={"title"} onChange={onChangeText} className={"upload-textInput"} placeholder="Title"/>
              </div>
              <div className={"upload-formItem"}>
                <DropDown  list={genre} placeHolder={"Select genre"} select={selectGenre} selected={input.genre.name} />
              </div>
              <div className={"upload-formItem"}>
                <textarea value={input.description}  name={"description"} onChange={onChangeText} className={"upload-textArea"}  placeholder="Description"></textarea>
              </div>
              <div className={"upload-formItem"}>
                {validForm ? (
                  loading ? (
                    <div className={"upload-loading"} />
                  ) : (
                    <input type="submit" className={"upload-btnSubmit"} value={"Upload"} />
                  )
                ): ("Fill the required to contoinue") }
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
