import { arrayOf, object, oneOf, string } from 'prop-types'

import { LAYOUTS } from '../constants/entities'
import { componentType } from '../constants/types'
import Action from '../Action'
import Group from '../Group'

const ArrayField = ({
  actions,
  actionsPosition,
  containerComponent: ContainerComponent,
  containerProps,
  fieldComponent,
  fields,
  layout,
  meta,
  ...props
}) => {
  const actionProps = {
    ...props,
    reduxFormProps: { ...props.reduxFormProps, fields, meta }
  }
  const actionElement = actions && actions.length > 0 && actions.map(
    actionName => <Action entityName={actionName} key={actionName} {...actionProps} />
  )
  return (
    <ContainerComponent {...containerProps}>
      {actionsPosition === 'before' && actionElement}
      {fields.map((member, index) => {
        const groupProps = {
          ...props,
          reduxFormProps: { ...props.reduxFormProps, fields, index, meta }
        }
        return (
          <Group
            component="li"
            entityName={layout}
            entityPrefix={member}
            entityType={LAYOUTS}
            key={member}
            {...groupProps}
          />
        )
      })}
      {actionsPosition === 'after' && actionElement}
    </ContainerComponent>
  )
}
ArrayField.propTypes = {
  actions: arrayOf(string),
  actionsPosition: oneOf(['after', 'before']),
  containerComponent: componentType,
  containerProps: object,
  fieldComponent: componentType,
  fields: object.isRequired,
  layout: string,
  meta: object.isRequired,
  reduxFormProps: object
}
ArrayField.defaultProps = {
  actionsPosition: 'after',
  containerComponent: 'ul',
  containerProps: {}
}

export default ArrayField
