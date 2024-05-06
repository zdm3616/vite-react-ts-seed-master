import type {
  CheckboxOptionType,
  FormInstance,
  FormItemProps,
  FormProps,
  RadioGroupProps,
  SelectProps,
  TreeSelectProps,
} from 'antd'
import { Form, Space } from 'antd'
import type {} from 'antd/es/form'
import { uniqueId } from 'lodash-es'
import React, { useImperativeHandle, useMemo } from 'react'
import FormItemComponent from './FormItemComponent'
import FormItemObj from './FormItemObj'
interface CustFormProps extends FormProps {
  /**
   * @description 表单内容数组
   */

  formItems: CustFormItemProps[]
}
export type CustFormInstance = { form: FormInstance }
type RenderFormItemPropsType = Partial<{
  //对照 antd补类型，不要加[propName:string]: any;
  options: SelectProps['options'] | RadioGroupProps['options'] | CheckboxOptionType[]
  disabled: boolean
  mode: 'multiple' | 'tags'
  size: 'large' | 'middle' | 'small'
  treeData: TreeSelectProps['treeData']
  maxLength: number
  allowClear: boolean | { clearIcon?: React.ReactNode }
  showSearch: boolean
  optionFilterProp: string
  filterOption: SelectProps['filterOption']
  notFoundContent: React.ReactNode
  labelInValue: boolean
}> &
  React.HTMLAttributes<HTMLElement>
export interface CustFormItemProps {
  key?: string
  type: keyof typeof FormItemObj
  /**
   * @description 传递给Form.Item的Props
   */
  antdFormItemProps?: Omit<FormItemProps, 'name' | 'label'> & {
    shouldUpdateCallbackFn?: (form: FormInstance, custRenderObj: React.ReactNode) => React.ReactNode
  }
  label?: React.ReactNode
  name?: string
  /**
   *@description 传递给Form.Item子组件的Props
   */
  renderFormItemProps?: RenderFormItemPropsType
  children?: CustFormItemProps[]
  /**
   *@description 但存在children是否用<Space.compact>连接
   */

  isCompact?: boolean
}
export type FormItemType = Omit<CustFormItemProps, 'colProps'>
const CustForm = React.memo(
  React.forwardRef<CustFormInstance, CustFormProps>((props, ref) => {
    const { formItems, layout = 'horizontal', ...args } = props
    const [form] = Form.useForm()
    useImperativeHandle(ref, () => ({
      form: form,
    }))
    //默认layout ==='horizontal'，表单元素布局
    const initFormItemLayout = useMemo(() => {
      return layout === 'horizontal' ? { labelcol: { span: 5 }, wrappercol: { span: 17 } } : null
    }, [layout])
    const loopRender = (formItems: CustFormItemProps[], isCompact: boolean) => {
      const list = formItems.map(({ children, isCompact = true, ...argsProps }) => {
        let child
        let key: string
        if (argsProps.key) {
          key = argsProps.key
        } else if (argsProps.name) {
          key = argsProps.type + argsProps.name
        } else {
          key = uniqueId() + argsProps.type
        }
        if (children && children.length > 0) {
          child = (
            <Form.Item
              key={key}
              label={argsProps.label}
              {...argsProps.antdFormItemProps}
              name={undefined}
            >
              {loopRender(children, isCompact)}
            </Form.Item>
          )
        } else {
          child = <FormItemComponent key={key} {...argsProps} />
        }
        return child
      })
      return isCompact ? <Space.Compact>{list}</Space.Compact> : list
    }
    return (
      <Form scrollToFirstError {...initFormItemLayout} layout={layout} {...args} form={form}>
        {loopRender(formItems, false)}
      </Form>
    )
  })
)
export default CustForm
