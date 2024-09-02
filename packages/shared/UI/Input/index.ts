import type { InputProps, InputRef } from './Input'
import InternalInput from './Input'
import { default as Numeric } from './NumericInput'
import { default as Password } from './Password'
import { default as TextArea } from './TextArea'
import { default as AutoComplete } from './AutoComplete'
import { default as Select } from './Select'
import { default as ImageDropFile } from './DropFile/ImageDropFile'
import { default as ImageDropFileForm } from './DropFile/ImageDropFileForm'
import { default as ImageDropFileFormMultiple } from './DropFile/ImageDropFileFormMultiple'
import { default as DatePicker } from './DatePicker'
import { default as RichTextEditor } from './RichTextEditor'
import { default as Color } from './Color'

import './styles.scss'

type CompoundedComponent = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> & {
  Numeric: typeof Numeric
  Password: typeof Password
  TextArea: typeof TextArea
  AutoComplete: typeof AutoComplete
  Select: typeof Select
  ImageDropFile: typeof ImageDropFile
  ImageDropFileForm: typeof ImageDropFileForm
  ImageDropFileFormMultiple: typeof ImageDropFileFormMultiple
  DatePicker: typeof DatePicker
  RichTextEditor: typeof RichTextEditor
  Color: typeof Color
}

const Input = InternalInput as CompoundedComponent

Input.Numeric = Numeric
Input.Password = Password
Input.TextArea = TextArea
Input.AutoComplete = AutoComplete
Input.Select = Select
Input.ImageDropFile = ImageDropFile
Input.ImageDropFileForm = ImageDropFileForm
Input.ImageDropFileFormMultiple = ImageDropFileFormMultiple
Input.DatePicker = DatePicker
Input.RichTextEditor = RichTextEditor
Input.Color = Color

export default Input
