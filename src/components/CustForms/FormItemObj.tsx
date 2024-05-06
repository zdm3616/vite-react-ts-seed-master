import type {
  CheckboxProps,
  DatePickerProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from 'antd'
import { Button, Checkbox, DatePicker, Input, Radio, Select, Switch } from 'antd'
import { TextAreaProps } from 'antd/es/input/TextArea'
import React from 'react'
import InputSeletct from './CustFormItem/InputSeletct'
import type { FormItemType } from './index'
type RenderFn = (item: FormItemType) => React.ReactNode
const renderInput: RenderFn = (item) => <Input {...item.renderFormItemProps} />
const renderInputPassword: RenderFn = (item) => <Input.Password {...item.renderFormItemProps} />
const renderTextArea: RenderFn = (item) => (
  <Input.TextArea {...(item.renderFormItemProps as TextAreaProps)} />
)
const renderInputseletct: RenderFn = (item) => (
  <InputSeletct {...(item.renderFormItemProps as SelectProps)} />
)
const renderSelect: RenderFn = (item) => <Select {...(item.renderFormItemProps as SelectProps)} />
const renderDatePicker: RenderFn = (item) => (
  <DatePicker {...(item.renderFormItemProps as DatePickerProps)} />
)
const renderSwitch: RenderFn = (item) => <Switch {...(item.renderFormItemProps as SwitchProps)} />
const renderCheckbox: RenderFn = (item) => (
  <Checkbox {...(item.renderFormItemProps as CheckboxProps)} />
)
const renderRadio: RenderFn = (item) => (
  <Radio.Group {...(item.renderFormItemProps as RadioGroupProps)} />
)
const renderButton: RenderFn = (item) => <Button htmlType="button" {...item.renderFormItemProps} />
const renderSubmitButton: RenderFn = (item) => (
  <Button {...item.renderFormItemProps} type="primary" htmlType="submit" />
)
const FormItemObj = {
  input: renderInput,
  inputPassword: renderInputPassword,
  textArea: renderTextArea,
  select: renderSelect,
  inputseletct: renderInputseletct,
  datepicker: renderDatePicker,
  switch: renderSwitch,
  radio: renderRadio,
  checkbox: renderCheckbox,
  button: renderButton,
  submitBtn: renderSubmitButton,
}
export default FormItemObj
