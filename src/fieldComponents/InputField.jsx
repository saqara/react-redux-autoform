import { object } from 'prop-types'

import { componentType, labelPropTypes, autoFormShape } from '../constants/types'

const InputField = ({
  autoFormProps,
  containerComponent: ContainerComponent,
  containerProps,
  innerComponent: InnerComponent,
  innerProps,
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
  const labelElement = label && <LabelComponent {...labelProps}>{label}</LabelComponent>
  return (
    <ContainerComponent {...containerProps}>
      {labelPosition === 'before' && labelElement}
      <InnerComponent {...innerProps}>
        {InputComponent === 'input'
          ? <InputComponent {...input} {...props} />
          : <InputComponent input={input} meta={meta} {...props} />}
      </InnerComponent>
      {labelPosition === 'after' && labelElement}
    </ContainerComponent>
  )
}

InputField.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  containerComponent: componentType,
  containerProps: object,
  innerComponent: componentType,
  innerProps: object,
  input: object.isRequired,
  inputComponent: componentType,
  meta: object.isRequired,
  reduxFormProps: object.isRequired,
  ...labelPropTypes
}
InputField.defaultProps = {
  containerComponent: 'div',
  containerProps: {},
  innerComponent: 'div',
  innerProps: {},
  inputComponent: 'input',
  labelComponent: 'label',
  labelPosition: 'before',
  labelProps: {}
}

export default InputField
