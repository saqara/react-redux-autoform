const reset = ({ reduxFormProps: { pristine, reset, submitting } }) => ({
  children: 'Clear Values',
  disabled: pristine || submitting,
  onClick: reset,
  type: 'reset'
})
const submit = ({ reduxFormProps: { submitting } }) => ({
  children: 'Submit',
  disabled: submitting,
  type: 'submit'
})

export const fieldArraysProps = {
  entities: {
    actions: {
      addHobby: ({ reduxFormProps: { fields } }) => ({
        children: 'Add Hobby',
        onClick: () => fields.push({})
      }),
      addMember: ({ reduxFormProps: { fields } }) => ({
        children: 'Add Member',
        onClick: () => fields.push({})
      }),
      removeHobby: ({ reduxFormProps: { fields, index } }) => ({
        children: 'Remove',
        onClick: () => fields.remove(index)
      }),
      removeMember: ({ reduxFormProps: { fields, index } }) => ({
        children: 'Remove',
        onClick: () => fields.remove(index)
      }),
      reset,
      submit
    },
    fields: {
      clubName: { label: 'Club Name' },
      email: ({ reduxFormProps: { index } }) => ({
        label: `Email #${index}`,
        type: 'email'
      }),
      firstName: { label: 'First Name' },
      hobbies: { actions: ['addHobby'], layout: 'hobbies', type: 'array' },
      hobby: ({ reduxFormProps: { index } }) => ({ label: `Hobby #${index}` }),
      lastName: { label: 'Last Name' },
      members: { actions: ['addMember'], layout: 'members', type: 'array' }
    },
    groups: {
      actions: { actions: ['submit', 'reset'] },
      clubName: { fields: ['clubName'] },
      firstName: { fields: ['firstName'] },
      hobbies: { fields: ['hobbies'] },
      hobby: {
        actions: ['removeHobby'],
        fields: ['hobby']
      },
      lastName: { fields: ['lastName'] },
      member: {
        actionsPosition: 'before',
        actions: ['removeMember'],
        groups: ['firstName', 'lastName']
      },
      members: { fields: ['members'] }
    },
    layouts: {
      fieldArrays: { groups: ['clubName', 'members', 'actions'] },
      hobbies: { groups: ['hobby'] },
      members: { groups: ['member', 'hobbies'] }
    }
  },
  form: 'fieldArrays',
  onSubmit: values => { alert(`Field Arrays submitted with ${JSON.stringify(values)}`) }
}

export const simpleFormProps = {
  entities: {
    actions: { reset, submit },
    fields: {
      employed: { label: 'Employed', type: 'checkbox' },
      favoriteColor: {
        includeBlank: true,
        label: 'Favorite Color',
        options: ['Red', 'Green', 'Blue'],
        type: 'select'
      },
      firstName: { label: 'First Name' },
      lastName: { label: 'Last Name' },
      sex: {
        label: 'Sex',
        options: [
          { label: 'Male', labelPosition: 'after', value: 'Male' },
          { label: 'Female', labelPosition: 'after', value: 'Female' }
        ],
        type: 'radio'
      }
    },
    groups: {
      actions: { actions: ['submit', 'reset'] },
      favoriteColor: { fields: ['favoriteColor'] },
      name: { fields: ['firstName', 'lastName'] },
      employed: { fields: ['employed'] },
      sex: { fields: ['sex'] }
    },
    layouts: {
      simpleForm: { groups: ['name', 'sex', 'favoriteColor', 'employed', 'actions'] }
    }
  },
  form: 'simpleForm',
  onSubmit: values => { alert(`Simple Form submitted with ${JSON.stringify(values)}`) }
}

export const synValidationProps = {
  entities: {
    actions: { reset, submit },
    fields: {
      age: { label: 'Age', type: 'number' },
      email: { label: 'Email' },
      username: { label: 'Username' }
    },
    groups: {
      actions: { actions: ['submit', 'reset'] },
      age: { fields: ['favoriteColor'] },
      username: { fields: ['username'] }
    },
    layouts: {
      simpleForm: { groups: ['name', 'sex', 'favoriteColor', 'employed', 'actions'] }
    }
  },
  validate: values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.age) {
      errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
      errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
      errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
  },
  warn: values => {
    const warnings = {}
    if (values.age < 19) {
      warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
  }
}
