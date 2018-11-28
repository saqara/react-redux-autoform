import { func, object, string } from 'prop-types'

import { ACTIONS, FIELDS, GROUPS } from './constants/entities'
import { autoFormShape, componentType } from './constants/types'
import Action from './Action'
import Field from './Field'
import computeProps from './utils/computeProps'
import createKey from './utils/createKey'

const Group = ({
  component: groupComponent,
  entityName,
  entityType,
  handleSubmit,
  ...props
}) => {
  const { autoFormProps: { entities } } = props
  const entity = entities[entityType][entityName]
  const { component, ...computedProps } = computeProps(entity, props)
  const GroupComponent = (
    component ||
    (handleSubmit ? groupComponent : props.autoFormProps.groupComponent) ||
    groupComponent
  )

  if (typeof GroupComponent !== 'string') {
    return <GroupComponent handleSubmit={handleSubmit} {...computedProps} {...props} />
  }

  const {
    actions,
    actionsPosition = 'after',
    fields,
    groups,
    onSubmit,
    ...rest
  } = computedProps
  const groupProps = { ...rest }
  if (handleSubmit) {
    groupProps.onSubmit = onSubmit ? handleSubmit(onSubmit) : handleSubmit
  }
  const actionElements = actions && actions.length > 0 && actions.map(
    actionName => <Action entityName={actionName} key={createKey(ACTIONS, actionName)} {...props} />
  )
  const fieldElements = fields && fields.length > 0 && fields.map(
    fieldName => <Field entityName={fieldName} key={createKey(FIELDS, fieldName)} {...props} />
  )
  const groupElements = groups && groups.length > 0 && groups.map(
    groupName => <Group entityName={groupName} key={createKey(GROUPS, groupName)} {...props} />
  )
  return (
    <GroupComponent {...groupProps}>
      {actionsPosition === 'before' && actionElements}
      {fieldElements}
      {groupElements}
      {actionsPosition === 'after' && actionElements}
    </GroupComponent>
  )
}

Group.propTypes = {
  autoFormProps: autoFormShape.isRequired,
  component: componentType,
  entityName: string.isRequired,
  entityType: string,
  handleSubmit: func,
  reduxFormProps: object
}
Group.defaultProps = {
  component: 'div',
  entityType: GROUPS
}

export default Group
