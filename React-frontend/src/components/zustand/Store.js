import React from 'react'
import create from 'zustand'

const useStore = create(set => ({
  fullName: "",
  phoneNumber: "",
  relationship: "",
  email: "",
  latitude : "",
  longitude: ""
}))



export default useStore;