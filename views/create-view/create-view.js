import { useState, useEffect } from "react"
import { Header, DropDown } from "../../components"
import { cars, transmissionArr, fuelTypeArr, conditionArr, locations } from "../../services/data"
import "./styles.scss"
import loadingGif from "../../static/relax-and-chill.json"
import Lottie from 'react-lottie'
import { useAlert, types } from 'react-alert'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingGif,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}


const stepDetail = [
  {
    heading: "Vehicle Details",
    subHeading: "Tell us about your vehicle",
    tips: null
  },
  {
    heading: "Upload Photos",
    subHeading: "Give us some rocking photos of your car",
    tips: {
      heading: "Good tips for great pics",
      tip1: "Make sure to clean exterior and interior before taking photos",
      tip2: "Try multiple angles for your photos",
      tip3: "Inerior photos like steering wheel, gear lever atrracts buys eyes.",
      tip4: "Center you car in the picture. Try to use clear backgrounds"
    }
  },
  {
    heading: "Personal Details",
    subHeading: "Make sure everyone can contact you",
    tips: null
  },
  {
    heading: "More about your car",
    subHeading: "More details to attracts more buyes",
    tips: null
  },
  {
    heading: "Attractive title and aprice",
    subHeading: "A good ad title include name and the model of the vehicle",
    tips: null
  },
  {
    heading: "Review Your Add",
    subHeading: "Does this sounds cool?",
    tips: null
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
  const alert = useAlert()


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

    if(step === 1 && inputs.images.length < 1) {
      alert.show("Please add atleast one image ", {
        timeout: 9000,
        type: types.ERROR,
      })
      return
    }

    if(step === 2 && inputs.phoneNumber === "" || step === 2 && isNaN(inputs.phoneNumber)) {
      alert.show("Please enter a valid phone number ", {
        timeout: 9000,
        type: types.ERROR,
      })
      return
    }

    if(step === 4 && inputs.title === "" ) {
      alert.show("Please enter a title", {
        timeout: 9000,
        type: types.ERROR,
      })
      return
    }


    if(step === 4 && inputs.price === "" ) {
      alert.show("You need to add a price", {
        timeout: 9000,
        type: types.ERROR,
      })
      return
    }

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

  const renderTips = () => {
    return (
      <div className="create-view__tips">
        <h2>{stepDetail[step].tips.heading}</h2>
        <ul>
          <li>{stepDetail[step].tips.tip1}</li>
          <li>{stepDetail[step].tips.tip2}</li>
          <li>{stepDetail[step].tips.tip3}</li>
          <li>{stepDetail[step].tips.tip4}</li>
        </ul>
      </div>
    )
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
        <div className="upload-form--loading">
          <h2>Your add is creating. Please wait</h2>
          <Lottie
            options={defaultOptions}
            height={100}
            width={200}/>
        </div>
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
                <input type="text" className="upload-textInput" onChange={textChage} name="title" placeholder="Title (Eg: 2017 Toyota axio)"/>
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

            {stepDetail[step].tips && renderTips()}
          </form>
        </div>
        </>
        )}
      </div>
    </div>
  )
}
