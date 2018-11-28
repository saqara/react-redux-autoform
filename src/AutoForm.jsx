import { func, object, string } from 'prop-types'
import { reduxForm } from 'redux-form'

import { LAYOUTS } from './constants/entities'
import { componentType, entitiesShape } from './constants/types'
import Group from './Group'

const AutoForm = ({
  actionComponent,
  entities,
  fieldComponentByType,
  formComponent,
  groupComponent,
  initialLayout,
  ...reduxFormProps
}) => {
  const autoFormProps = {
    actionComponent,
    entities,
    fieldComponentByType,
    groupComponent
  }
  return (
    <Group
      autoFormProps={autoFormProps}
      component={formComponent}
      entityName={initialLayout || reduxFormProps.form}
      entityType={LAYOUTS}
      handleSubmit={reduxFormProps.handleSubmit}
      reduxFormProps={reduxFormProps}
    />
  )
}

AutoForm.propTypes = {
  actionComponent: componentType,
  entities: entitiesShape.isRequired,
  fieldComponentByType: object,
  form: string.isRequired,
  formComponent: componentType,
  groupComponent: componentType,
  handleSubmit: func.isRequired,
  initialLayout: string
}

AutoForm.defaultProps = {
  actionComponent: 'button',
  fieldComponentByType: {},
  formComponent: 'form',
  groupComponent: 'div'
}

export default reduxForm()(AutoForm)
