import { Form, FormInstance } from 'antd'
import React from 'react'
import FormItemObj from './FormItemObj'
import type { FormItemType } from './index'
const FormItemComponent: React.FC<FormItemType> = React.memo((props) => {
  const { name, type, label, antdFormItemProps } = props
  if (type) {
    let formDiv
    const { shouldUpdate, dependencies, shouldUpdateCallbackFn, ...antdFormItemArgesProps } =
      antdFormItemProps || {}
    if (shouldUpdate && shouldUpdateCallbackFn) {
      formDiv = (form: FormInstance) => {
        const result = shouldUpdateCallbackFn(
          form,
          <Form.Item
            valuePropName={['switch', 'checkbox'].includes(type) ? 'checked' : undefined}
            name={name}
            label={label}
            {...antdFormItemArgesProps}
          >
            {FormItemObj[type](props)}
          </Form.Item>
        )
        return result
      }
    } else {
      formDiv = FormItemObj[type](props)
    }
    const isFn: boolean = !!shouldUpdate || !!dependencies
    return (
      <Form.Item
        valuePropName={['switch', 'checkbox'].includes(type) ? 'checked' : undefined}
        name={!isFn ? name : undefined}
        label={!isFn ? label : undefined}
        noStyle={isFn ? true : false}
        shouldUpdate={shouldUpdate}
        dependencies={dependencies}
        {...antdFormItemArgesProps}
      >
        {formDiv}
      </Form.Item>
    )
  }
  return null
})
export default FormItemComponent
