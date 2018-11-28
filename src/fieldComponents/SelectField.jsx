import { arrayOf, bool, object, oneOfType, string } from 'prop-types'

import { componentType, labelPropTypes, autoFormShape } from '../constants/types'
import createKey from '../utils/createKey'

const SelectField = ({
  autoFormProps,
  containerComponent: ContainerComponent,
  containerProps,
  includeBlank,
  innerComponent: InnerComponent,
  innerProps,
  input,
  label,
  labelComponent: LabelComponent,
  labelPosition,
  labelProps,
  meta,
  optionComponent: OptionComponent,
  options,
  reduxFormProps,
  selectComponent: SelectComponent,
  ...props
}) => {
  const labelElement = label && <LabelComponent {...labelProps}>{label}</LabelComponent>
  return (
    <ContainerComponent {...containerProps}>
      {labelPosition === 'before' && labelElement}
      <InnerComponent {...innerProps}>
        {SelectComponent === 'select' ? (
          <SelectComponent {...input} {...props}>
            {includeBlank && <OptionComponent />}
            {options.map((option, index) => {
              let optionProps
              if (typeof option === 'object') {
                optionProps = option
              } else {
                optionProps = { children: option, value: option }
              }
              return (
                <OptionComponent
                  key={createKey('select', optionProps.value, index)}
                  {...optionProps}
                />
              )
            })}
          </SelectComponent>
        ) : <SelectComponent input={input} meta={meta} {...props} />}
      </InnerComponent>
      {labelPosition === 'after' && labelElement}
    </ContainerComponent>
  )
}

SelectField.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  containerComponent: componentType,
  containerProps: object,
  includeBlank: bool,
  innerComponent: componentType,
  innerProps: object,
  input: object.isRequired,
  meta: object.isRequired,
  optionComponent: componentType,
  options: arrayOf(oneOfType([object, string])),
  reduxFormProps: object.isRequired,
  selectComponent: componentType,
  ...labelPropTypes
}
SelectField.defaultProps = {
  containerComponent: 'div',
  containerProps: {},
  includeBlank: false,
  innerComponent: 'div',
  innerProps: {},
  labelComponent: 'label',
  labelPosition: 'before',
  labelProps: {},
  optionComponent: 'option',
  options: [],
  selectComponent: 'select'
}

export default SelectField
