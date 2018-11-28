import { string } from 'prop-types'

import { ACTIONS } from './constants/entities'
import { autoFormShape } from './constants/types'
import computeProps from './utils/computeProps'

const Action = ({ entityName, entityType, ...props }) => {
  const entity = props.autoFormProps.entities[entityType][entityName]
  const {
    component,
    type = 'button',
    ...fieldProps
  } = computeProps(entity, props)
  const ActionComponent = component || props.autoFormProps.actionComponent
  if (typeof ActionComponent !== 'string') {
    return <ActionComponent {...props} type={type} {...fieldProps} />
  }
  return <ActionComponent type={type} {...fieldProps} />
}

Action.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  entityName: string.isRequired,
  entityType: string
}
Action.defaultProps = {
  entityType: ACTIONS
}

export default Action
