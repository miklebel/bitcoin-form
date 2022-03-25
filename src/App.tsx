import React, { useState, ChangeEvent } from 'react'
import { validate } from 'class-validator'
import './App.css'
import IntlTelInput, { CountryData } from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import { Form } from './validators/Form'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('')

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  })

  const validateForm = async () => {
    const form = new Form()
    form.firstName = firstName
    form.lastName = lastName
    form.email = email
    form.phone = phone

    const validation = await validate(form)
    const newErrors = validation.reduce(
      (prev, curr) => {
        const { property } = curr
        return { ...prev, [property]: true }
      },
      {
        firstName: false,
        lastName: false,
        email: false,
        phone: false
      }
    )
    setErrors(newErrors)
    if (!validation.length) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
      const urlencoded = new URLSearchParams()
      urlencoded.append('first_name', firstName)
      urlencoded.append('last_name', lastName)
      urlencoded.append('password', 'Obwriu48')
      urlencoded.append('email', email)
      urlencoded.append('funnel', 'bitcoin-buyer-v2')
      urlencoded.append('affid', '10039')
      urlencoded.append('area_code', `+${countryCode}`)
      urlencoded.append('phone', phone)

      const rawResponse = await fetch('https://api.wickedtrack.com/leads', {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
      })

      const response = await rawResponse.json()
      const url = response?.extras?.redirect?.url

      if (url) window.location.href = url
    }
  }

  const onChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onPhoneNumberChange = (valid: boolean, value: string, countryData: CountryData) => {
    const code = countryData.dialCode ?? ''
    const phone = valid ? value : ''
    setPhone(phone)
    setCountryCode(code)
  }

  return (
    <div className="container mx-auto px-4">
      <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errors.firstName ? (
          <p className="text-red-500 text-xs italic">First name field can not be empty.</p>
        ) : (
          <p></p>
        )}
        <input
          type="text"
          name="firstname"
          className={`shadow appearance-none border border-${
            errors.firstName ? 'red' : 'grey'
          }-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          placeholder="First name"
          value={firstName}
          onChange={onChangeFirstName}
        />
        {errors.lastName ? (
          <p className="text-red-500 text-xs italic">Second name field can not be empty.</p>
        ) : (
          <p></p>
        )}
        <input
          type="text"
          name="lastname"
          className={`shadow appearance-none border border-${
            errors.lastName ? 'red' : 'grey'
          }-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          placeholder="Last name"
          value={lastName}
          onChange={onChangeLastName}
        />
        {errors.email ? (
          <p className="text-red-500 text-xs italic">Email must be valid.</p>
        ) : (
          <p></p>
        )}
        <input
          type="email"
          name="email"
          className={`shadow appearance-none border border-${
            errors.email ? 'red' : 'grey'
          }-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        {errors.phone ? (
          <p className="text-red-500 text-xs italic">Phone must be valid.</p>
        ) : (
          <p></p>
        )}
        <div className="mb-3">
          <IntlTelInput
            containerClassName="intl-tel-input"
            onPhoneNumberChange={onPhoneNumberChange}
            style={{ width: '100%' }}
            inputClassName={`shadow appearance-none border border-${
              errors.phone ? 'red' : 'grey'
            }-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <button
          className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={validateForm}
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default App
