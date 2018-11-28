import { object } from 'prop-types'

import { autoFormShape, componentType, labelPropTypes } from '../constants/types'

const CheckboxField = ({
  autoFormProps,
  input,
  inputComponent: InputComponent,
  label,
  labelComponent: LabelComponent,
  labelPosition,
  labelProps,
  meta,
  reduxFormProps,
  ...props
}) => {
  const inputElement = InputComponent === 'input'
    ? <InputComponent {...input} {...props} />
    : <InputComponent input={input} meta={meta} {...props} />
  if (label) {
    return (
      <LabelComponent {...labelProps}>
        {labelPosition === 'before' && label}
        {inputElement}
        {labelPosition === 'after' && label}
      </LabelComponent>
    )
  }
  return inputElement
}
CheckboxField.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  input: object.isRequired,
  inputComponent: componentType,
  meta: object.isRequired,
  reduxFormProps: object.isRequired,
  ...labelPropTypes
}
CheckboxField.defaultProps = {
  inputComponent: 'input',
  labelComponent: 'label',
  labelPosition: 'before',
  labelProps: {}
}

export default CheckboxField
