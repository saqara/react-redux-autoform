import AutoForm from '../AutoForm'

import { fieldArraysProps, simpleFormProps } from './mocks'

export default [{
  component: AutoForm,
  name: 'Simple Form',
  props: simpleFormProps,
  reduxState: {}
}, {
  component: AutoForm,
  name: 'Simple Form with initial values',
  props: {
    ...simpleFormProps,
    initialValues: {
      employed: true,
      favoriteColor: 'Green',
      firstName: 'John',
      lastName: 'Doe',
      sex: 'Male'
    }
  },
  reduxState: {}
}, {
  component: AutoForm,
  name: 'Field Arrays',
  props: fieldArraysProps,
  reduxState: {}
}, {
  component: AutoForm,
  name: 'Field Arrays with intial values',
  props: {
    ...fieldArraysProps,
    initialValues: {
      clubName: 'Developer',
      members: [{ firstName: 'John', lastName: 'Doe', hobbies: [{ hobby: 'JavaScript' }] }]
    }
  },
  reduxState: {}
}]
