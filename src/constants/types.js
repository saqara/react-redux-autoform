import { func, node, object, oneOf, oneOfType, shape, string } from 'prop-types'

export const componentType = oneOfType([func, object, string])

export const entitiesShape = shape({
  actions: object.isRequired,
  fields: object.isRequired,
  groups: object,
  layouts: object.isRequired
})

export const labelPropTypes = {
  label: oneOfType([node, string]),
  labelComponent: componentType,
  labelPosition: oneOf(['after', 'before']),
  labelProps: object
}

export const autoFormShape = shape({
  actionComponent: componentType.isRequired,
  entities: entitiesShape.isRequired,
  fieldComponentByType: object,
  groupComponent: componentType.isRequired
})
