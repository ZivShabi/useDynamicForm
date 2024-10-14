

import useDynamicForm from '../hook/useDynamicForm'
import { formFieldsConfig } from '../hook/useformConfigure'
import FormField from './FormField'
function DynamicFormComponent() {
    const {
        formData, formErrors, fieldValidationStatus,
        handleFieldChange, submitForm, getFieldInfo,
    } = useDynamicForm()

    function receivingConsoleData(event) {
        event.preventDefault()
        submitForm((data) => { console.log(data) })
    }
    return (
        <form onSubmit={receivingConsoleData}>
            <div className="formFields"> {formFieldsConfig.map(({ name, type, label, required }) => {

                const fieldValue = getFieldInfo(formData, name)
                const fieldErrorMessage = getFieldInfo(formErrors, name) || null
                const isFieldValid = fieldValidationStatus[name] || false
                return (
                    <FormField
                        key={name}
                        name={name}
                        type={type}
                        label={label}
                        required={required}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        errorMessage={fieldErrorMessage}
                        isValid={isFieldValid}
                    />
                )
            })} </div> <button className='submit' type="submit">Submit</button>
        </form>
    )
}
export default DynamicFormComponent
