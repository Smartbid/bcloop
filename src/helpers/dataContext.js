import React from 'react'

export const UserContext = React.createContext({
    firstName: "test",
    email: "test@gmail.com",
    lastName: '',
    password: '',
    phoneNumber: '',
    countryCode: '',
    getValueFromInputs: (e) => {},
    savedPhoneNumber: (value) => {},
    defaultCountry: (countryData) => {}
    }
);