
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '../config/config'

import request from 'superagent'

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}


// export const trackPageView = (url) => {
//   try {
//     window.gtag('config', 'UA-226459781', {
//       page_location: url
//     });
//   } catch (error) {
//     // silences the error in dev mode
//     // and/or if gtag fails to load
//   }
// }


export const makeid = (name) => {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nums = '0123456789'
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length) + 1]
  }
  for (let i = 0; i < 6; i++) {
    id += nums[Math.floor(Math.random() * nums.length) + 1]
  }

  return id+Date.now()+name;
}

export const uploadImage = async (file) => {
  try{
    let response = await request
    .post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('folder', 'logcars')
    .field('file', file)

    if(response.body){
      return response.body.secure_url
    }else {
      return ""
    }
  }catch(err) {
    console.log(err)
    return ""
  }
}
