const computeProps = (entityProps, props) => {
  if (typeof entityProps === 'function') {
    return entityProps(props)
  }
  return entityProps
}

export default computeProps
