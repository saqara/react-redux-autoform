import {
  ArrayField,
  CheckboxField,
  FieldsField,
  InputField,
  SelectField
} from '../fieldComponents'

const defaultFieldByType = {
  array: ArrayField,
  checkbox: CheckboxField,
  fields: FieldsField,
  radio: CheckboxField,
  select: SelectField
}

const getFieldComponentByType = (type, fieldComponentByType = {}) => {
  const Field = fieldComponentByType[type] || defaultFieldByType[type]
  return Field || InputField
}

export default getFieldComponentByType
