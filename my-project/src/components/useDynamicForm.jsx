import useDynamicForm from '../hook/useDynamicForm'
import { formFieldsConfig } from '../hook/useformConfigure'

function DynamicFormComponent() {

    const { formData, formErrors, handleFieldChange, submitForm, fieldValidationStatus, } = useDynamicForm()

    function onFormSubmitSuccess(submittedData) { console.log(submittedData) }

    return (
        <form onSubmit={(event) => { event.preventDefault(); submitForm(onFormSubmitSuccess) }}>

            <div className="formFields">
                {formFieldsConfig.map(({ name, type, label, required }) => {
                    // מציאת הערך הנוכחי של השדה באמצעות גישה לפי מפתח האובייקט
                    const fieldValue = name.split('.').reduce((acc, key) => acc?.[key] || '', formData)
                    const fieldErrorMessage = formErrors[name] || null
                    const isFieldValid = fieldValidationStatus[name] || false

                    return (
                        <div key={name} className="form-group">
                            <label>{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={fieldValue || ''}
                                onChange={handleFieldChange}
                                required={required}
                            />
                            {fieldErrorMessage &&
                                <p style={{ color: 'red' }}>{fieldErrorMessage}</p>
                            }
                            {isFieldValid ?
                                <span style={{ color: 'green' }}>✅</span> :
                                <span style={{ color: 'red' }}>❌</span>
                            }
                        </div>
                    )
                })}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default DynamicFormComponent
