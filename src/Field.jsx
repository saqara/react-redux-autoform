import {
  Field as ReduxFormField,
  FieldArray as ReduxFormFieldArray,
  Fields as ReduxFormFields
} from 'redux-form'
import { string } from 'prop-types'

import { FIELDS } from './constants/entities'
import { autoFormShape } from './constants/types'
import computeProps from './utils/computeProps'
import createKey from './utils/createKey'
import getFieldComponentByType from './utils/getFieldComponentByType'

const Field = ({ entityName, entityPrefix, entityType, ...props }) => {
  let ReduxFormComponent
  const entity = props.autoFormProps.entities[entityType][entityName]
  const {
    component,
    fields,
    options = [],
    type = 'text',
    ...fieldProps
  } = computeProps(entity, props)
  const reduxFormFieldProps = { ...fieldProps, ...props }
  reduxFormFieldProps.component = component || getFieldComponentByType(
    type,
    props.autoFormProps.fieldComponentByType
  )
  if (type === 'fields') {
    ReduxFormComponent = ReduxFormFields
    reduxFormFieldProps.names = fields.map(
      fieldName => entityPrefix ? `${entityPrefix}.${fieldName}` : fieldName
    )
  } else {
    reduxFormFieldProps.name = entityPrefix ? `${entityPrefix}.${entityName}` : entityName
  }
  if (type !== 'array') {
    ReduxFormComponent = ReduxFormField
    reduxFormFieldProps.type = type
  } else {
    ReduxFormComponent = ReduxFormFieldArray
  }
  if (type === 'checkbox' || type === 'radio') {
    if (options.length > 0) {
      return options.map((optionProps, index) => (
        <ReduxFormComponent
          key={createKey(type, entityName, index)}
          {...reduxFormFieldProps}
          {...optionProps}
        />
      ))
    }
  } else if (options) {
    reduxFormFieldProps.options = options
  }
  return <ReduxFormComponent {...reduxFormFieldProps} />
}

Field.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  entityName: string.isRequired,
  entityPrefix: string,
  entityType: string
}
Field.defaultProps = {
  entityType: FIELDS
}

export default Field
