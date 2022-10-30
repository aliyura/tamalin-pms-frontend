import React, { useState, createContext } from 'react';

 export const ClientFormContext = createContext({})

const ClientFormProvider = ({ children }) => {

    const pageTitle = {
        0: "Client's Information",
        1: "Guarantor Information",
        2: "Documents"
    }

    const [page, setPage]=useState(0)
    const [client, setClient] = useState({
        name: "",
        phone: "",
        identityImage: "",
        identityImageUrl: "",
        identityType: "",
        identityNumber: "",
        passportPhotograph: "",
        passportPhotographUrl: "",
        guarantorName: "",
        guarantorPhone: "",
        guarantorIdentityImage: "",
        guarantorIdentityImageUrl: "",
        guarantoIdentityNumber: "",
        guarantorIdentityType: "",
        guarantorPassportPhotograph: "",
        guarantorPassportPhotographUrl: "",
        guarantorRelationship: "",
        guarantorAddress: ""
    })
 
    return (
        <ClientFormContext.Provider value={ {pageTitle, page, setPage, client, setClient} }>
            { children }
        </ClientFormContext.Provider>
    )
}
export default ClientFormProvider;
