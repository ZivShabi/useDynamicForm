
import { useState, useCallback } from 'react'
import Joi from 'joi'
import { initialFormData, formValidationSchema } from '../hook/useformConfigure'

function useDynamicForm() {
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState({})
    const [fieldValidationStatus, setFieldValidationStatus] = useState({})

    const validateField = useCallback((fieldName, fieldValue) => {
        const fieldParts = fieldName.split('.') // פיצול שם השדה לחלקים מהאובייקטים  
        let currentSchema = formValidationSchema

        // מעבר על חלקי השדה כדי להגיע לסכמה הנכונה
        for (const part of fieldParts) {
            if (!currentSchema[part]) {
                return ''
            }
            currentSchema = currentSchema[part]
        }
        const { error } = Joi.object({ [fieldName]: currentSchema }).validate({ [fieldName]: fieldValue })

        return error ? error.details[0].message : ''
    }, [formValidationSchema])

    function handleFieldChange(event) {       // פונקציה לעדכון ערך שדה בטופס
        const { name, value } = event.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))

        // בדיקת ולידציה עבור השדה
        const fieldErrorMessage = validateField(name, value)

        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrorMessage }))
        // עדכון סטטוס 
        setFieldValidationStatus((prevStatus) => ({ ...prevStatus, [name]: !fieldErrorMessage }))
    }

    function submitForm(onSuccessCallback) {        // לבדוק האם השדות עברו וולידציה 

        const isFormValid = Object.values(fieldValidationStatus).every((status) => status)
        if (isFormValid) { onSuccessCallback(formData) }
    }

    return { formData, formErrors, handleFieldChange, submitForm, fieldValidationStatus }
}

export default useDynamicForm
