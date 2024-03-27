import { Button } from 'components/common/button/Button'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Input } from 'components/common/input/Input.styled'
import { KeyboardEvent } from 'react'
import { useFormik } from 'formik'
import { S } from './MessagesForm_Styles'
import { AlertType } from 'store/app/appReducer'

type Props = {
    addMessage: (message: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}
type FormikError = {
    message?: string
}
export const MessagesForm: React.FC<Props> = ({ addMessage, addAppAlert }) => {
    const addMessageKeyboardHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            formik.handleSubmit(e)
        }
    }
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values) => {
            addMessage(values.message)
            formik.resetForm()
        },
        validate: (values) => {
            const errors: FormikError = {}
            if (!values.message) {
                errors.message = 'Message is emtyt!'
            } else if (values.message.length > 300) {
                errors.message = 'Message must be less than 300 symbols!'
                addAppAlert('failed', errors.message)
            }
            return errors
        },
    })
    return <S.Form onSubmit={formik.handleSubmit}
        onKeyDown={addMessageKeyboardHandler}
    >
        <Input
            as={"textarea"}
            aria-label="enter your message"
            placeholder="Enter your message"
            bordered={'true'}
            id={'message'}
            error={!!formik.errors.message ? 'true' : 'false'}
            {...formik.getFieldProps('message')}
            autoFocus
        />
        <FlexWrapper>
            <Button
                type={'submit'}
                variant={'primary'}
                disabled={!!formik.errors.message}
                ariaLabel={'Submit button'}
            >{'Send'}</Button>
        </FlexWrapper>
    </S.Form>
}