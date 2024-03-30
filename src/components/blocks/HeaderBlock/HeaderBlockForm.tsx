import { EditableSpan } from "components/common/editableSpan/EditableSpan"
import { useFormik } from "formik"
import { AlertType } from "store/app/appReducer"

type Props = {
  status: string
  changeProfileStatus: (newStatus: string) => void
  addAppAlert: (type: AlertType, message: string) => void
}
type FormikError = {
  formStatus?: string
}
export const HeaderBlockForm: React.FC<Props> = ({ changeProfileStatus, addAppAlert, status }) => {
  const STATUS_MAX_LENGTH = 300

  const formik = useFormik({
    initialValues: {
      status: status,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      changeProfileStatus(values.status)
    },
    validate: (values) => {
      const errors: FormikError = {}
      if (values.status.length >= STATUS_MAX_LENGTH) {
        errors.formStatus = `Status must be less than ${STATUS_MAX_LENGTH} symbols`
        addAppAlert("failed", errors.formStatus)
      }
      return errors
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <EditableSpan
        onSand={formik.handleSubmit}
        name={"status"}
        emptyText={"No status..."}
        value={formik.values.status}
        actualValue={status}
        onChange={formik.handleChange}
        error={!!formik.errors.status ? "true" : "false"}
      />
    </form>
  )
}
