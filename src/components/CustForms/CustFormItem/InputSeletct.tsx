import { useControllableValue, useDebounce } from 'ahooks'
import type { SelectProps } from 'antd'
import { Select } from 'antd'
import { cloneDeep } from 'lodash-es'
import React, { useMemo, useState } from 'react'
type InputseletctProps = Omit<SelectProps, 'mode'>

const InputSeletct: React.FC<InputseletctProps> = ({
  value,
  onChange,
  labelInValue,
  options,
  onSearch,
  onClear,
  onBlur,
  ...agrs
}) => {
  const [currency, setCurrency] = useControllableValue<SelectProps['value']>({ value, onchange })
  const [inputVal, setInputVal] = useState<string>()
  const debouncedValue = useDebounce(inputVal, { wait: 100 })
  const TempOptions = useMemo(() => {
    const arr = options || []
    const text = debouncedValue ? debouncedValue.trim() : ''
    if (text === '') {
      return arr
    }
    const i = arr.findIndex((item) => item.label === text)
    if (i > -1) {
      return arr
    } else {
      const t = cloneDeep(arr)
      t.unshift({ label: text, value: text })
      return t
    }
  }, [debouncedValue, options])
  const onCurrencyChange: SelectProps['onChange'] = (newCurrency, option) => {
    setCurrency(newCurrency)
    onChange && onChange(newCurrency, option)
  }
  const inputSearch: SelectProps['onSearch'] = (value) => {
    setInputVal(value)
    onSearch && onSearch(value)
  }
  const onInputBlur = () => {
    const text = inputVal ? inputVal.trim() : ''
    if (text) {
      onCurrencyChange(labelInValue ? { label: text, value: text } : text, {
        label: text,
        value: text,
      })
    }
    onBlur && onBlur(value)
  }

  const clearInput = () => {
    setInputVal(undefined)
    onClear && onClear()
  }
  return (
    <Select
      {...agrs}
      value={value | currency}
      allowClear
      showSearch
      onSearch={inputSearch}
      onChange={onCurrencyChange}
      onBlur={onInputBlur}
      labelInValue={labelInValue}
      notFoundContent={null}
      options={TempOptions}
      onClear={clearInput}
    />
  )
}
export default InputSeletct
