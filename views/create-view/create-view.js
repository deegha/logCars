import { useState, useEffect } from "react"
import { Header, DropDown } from "../../components"
import { cars, transmissionArr, fuelTypeArr, conditionArr, locations } from "../../services/data"
import "./styles.scss"

const stepDetail = [
  {
    heading: "Vehicle Details",
    subHeading: "Tell us about your vehicle"
  },
  {
    heading: "Upload Photos",
    subHeading: "Give us some rocking photos of your car"
  },
  {
    heading: "Personal Details",
    subHeading: "Make sure everyone can contact you"
  },
  {
    heading: "More about your car",
    subHeading: "More details to attracts more buyes"
  },
  {
    heading: "Attractive price point",
    subHeading: "Poeple always look in to price first"
  },
  {
    heading: "Review Your Add",
    subHeading: "Does this sounds cool?"
  },
]

const initialInputs = {
  title: "",
  name:"",
  email: "",
  phoneNumber: "",
  images: [],
  location: "",
  make: "",
  model: "",
  transmission: "",
  engineCapacity: "",
  mileage: "",
  modelYear: "",
  condition: "",
  bodyType: "",
  fuelType: "",
  description: "",
  price: "",
  negotiable: false,
  validForm: false,
  loading: false,
  review: false
}

export const CreateView = ({ creatFeed }) => {

  const [step, setStep] = useState(0)
  const [inputs, setInputs] = useState(initialInputs)
  const [loading, setLoading] = useState(false)

  const setItem = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value
    })

    if(name === "model") {
      nextStep()
    }
  }

  const nextStep = (e) => {
    if(e)
      e.preventDefault()

    if(step < 4)
      setStep(step+1)
    else
      createAdd()
  }

  const createAdd = async () => {
    try {
      const data = inputs
      setInputs(initialInputs)
      setLoading(true)
      await creatFeed(data)
      setLoading(false)
    }catch(err) {
      setInputs(initialInputs)
      setLoading(false)
      console.log(err)
    }
  }

  const textChage = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const checkBoxUpdate = () => {

    setInputs({
      ...inputs,
      negotiable: !inputs.negotiable
    })
  }

  const handleFileChange = (event) => {
    if(event.target.files.length < 1)
      return

    const file = event.target.files[0]
    const blobUrl = URL.createObjectURL(event.target.files[0])

    if(file.type.indexOf("image") === -1) {
      return
    }

    setInputs({
      ...inputs,
      images: [
        ...inputs.images,
        {
          file,
          url: blobUrl
        }
      ]
    })
  }

  const goBack = () => {
    if(step > 0) {
      setStep(step-1)
    }
  }

  const visible = "visible"
  const inVisible = "inVisible"
  let models = []
  if(inputs.make && inputs.make !== "")
    models = cars.filter(item => item.make === inputs.make)[0].models

  return (
    <div className={"upload-container"}>
      <Header />
      <div className={"upload-formWrapper"}>
      {loading ? (
        <div><h2>Your add is creating</h2></div>
      ) : (
        <>
        <div className={"upload-formItem"}>
          <h1>{stepDetail[step].heading}</h1>
        </div>
        <div className={"upload-formItem upload-formItem-subheading"}>
          <p>{stepDetail[step].subHeading}</p>
        </div>
        <div className="upload-formItem">
          <form onSubmit={nextStep}>
            <div className={step === 0 ? visible : inVisible}>
              <div className={`upload-formItem`}>
                <DropDown
                  list={cars}
                  placeHolder={"Select Make"}
                  sreachContext={'make'}
                  name={"make"}
                  select={setItem}
                  selected={inputs.make !== "" && inputs.make} />
              </div>
              {inputs.make !== "" && (
              <div className={`upload-formItem`}>
                <DropDown
                  list={models}
                  placeHolder={"Select Model"}
                  sreachContext={'modelName'}
                  name={"model"}
                  select={setItem}
                  selected={inputs.model !== "" && inputs.model} />
              </div>
              )}

            </div>

            <div className={step ===  1 ? visible : inVisible}>
              <div className={`upload-formItem`}>
                {inputs.images.map(image =>  <div key={image.url} style={{backgroundImage: `url(${image.url}`}} className={"upload-image-preview"} />)}
                {inputs.images.length < 5 && (
                  <div>
                    <input type="file" name="file" id="file" className={"upload-inputfile"} onChange={handleFileChange} />
                    <label htmlFor="file" className={"upload-image-upload"} >Add Photos</label>
                  </div>
                )}
              </div>
            </div>

            <div className={step ===  2 ? visible : inVisible}>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="phoneNumber" placeholder="Phone number (eg: 0715332365)" />
              </div>
              <div className={`upload-formItem`}>
                <DropDown
                  list={locations}
                  placeHolder={"District"}
                  sreachContext={'name'}
                  name={"location"}
                  select={setItem}
                  selected={inputs.location !== "" && inputs.location} />
              </div>

            </div>

            <div className={step ===  3 ? visible : inVisible}>
              <div className={`upload-formItem`}>
                <DropDown
                  list={transmissionArr}
                  placeHolder={"Transmission"}
                  sreachContext={'transmission'}
                  name={"transmission"}
                  select={setItem}
                  selected={inputs.transmission !== "" && inputs.transmission} />
              </div>
              <div className={`upload-formItem`}>
                <DropDown
                  list={conditionArr}
                  placeHolder={"Condition"}
                  sreachContext={'condition'}
                  name={"condition"}
                  select={setItem}
                  selected={inputs.condition !== "" && inputs.condition} />
              </div>
              <div className={`upload-formItem`}>
                <DropDown
                  list={fuelTypeArr}
                  placeHolder={"Fuel Type"}
                  sreachContext={'type'}
                  name={"fuelType"}
                  select={setItem}
                  selected={inputs.fuelType !== "" && inputs.fuelType} />
              </div>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="engineCapacity" placeholder="Engine Capacity (eg: 1500)" />
              </div>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="mileage" placeholder="Mileage (KM)" />
              </div>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="modelYear" placeholder="Model Year (eg: 2010)" />
              </div>
            </div>

            <div className={step ===  4 ? visible : inVisible}>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="title" placeholder="Title (Toyota axio)"/>
              </div>
              <div className={`upload-formItem`}>
                <input type="text" className="upload-textInput" onChange={textChage} name="price" placeholder="Price"/>
              </div>
              <div className={`upload-formItem`}>
                <span>Is price negotiable?</span><input checked={inputs.negotiable} type="checkbox" onChange={checkBoxUpdate} />
              </div>

              <div className={`upload-formItem`}>
                <textarea placeholder="Description" name="description" onChange={textChage} className="upload-textArea"/>
              </div>
            </div>

            {/* <div className={step ===  5 ? visible : inVisible}>
              <div className={`upload-formItem`}>

              </div>
            </div> */}

            {step > 0 && (
              <div className={`upload-formItem`}>
                <div  className="upload-goback-button" onClick={goBack} >go back</div>
                <input type="submit" value={step > 3?"Create":"Next"} className="upload-btnSubmit" />
              </div>
            )}
          </form>
        </div>
        </>
        )}
      </div>
    </div>
  )
}
