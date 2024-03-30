import { useFormik } from "formik"
import { memo } from "react"
import { ChangeAbout, ProfileData } from "store/profile/profileReducer"
import { S } from "./About_Styles"
import { Checkbox } from "components/common/checkbox/Checkbox"
import { AlertType } from "store/app/appReducer"

type Props = {
    profileData: ProfileData
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: ChangeAbout) => void
}

type FormikError = {
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
}

export const AboutForm: React.FC<Props> = memo((props) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = props.profileData
    const CONTACTS_MAX_LENGTH = 40

    const formik = useFormik({
        initialValues: {
            fullName: fullName,
            aboutMe: aboutMe,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            props.changeProfileAbout(values)
        },
        validate: (values) => {
            const errors: FormikError = {}
            if (values.fullName.length >= CONTACTS_MAX_LENGTH) {
                errors.fullName = `FullName must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert("failed", errors.fullName)
            }
            return errors
        },
    })

    return (
        <S.Wrapper>
            <form onSubmit={formik.handleSubmit}>
                <S.Category>
                    <S.ContactIcon iconId={"profile"} viewBox="-4 -4 22 22" />
                    <S.DescriptionEditable
                        actualValue={fullName}
                        onSand={formik.handleSubmit}
                        {...formik.getFieldProps("fullName")}
                    />
                </S.Category>
                <S.Category>
                    <S.ContactIcon iconId={"info"} />
                    <S.DescriptionEditable
                        actualValue={aboutMe}
                        onSand={formik.handleSubmit}
                        {...formik.getFieldProps("aboutMe")}
                    />
                </S.Category>
                <S.Category>
                    <Checkbox
                        label="Looking job"
                        id="lookingForAJob"
                        onSand={formik.handleSubmit}
                        checked={lookingForAJob}
                        {...formik.getFieldProps("lookingForAJob")}
                    />
                </S.Category>
                {lookingForAJob && (
                    <S.Category>
                        <S.ContactIcon iconId={"info"} />
                        <S.DescriptionEditable
                            actualValue={lookingForAJobDescription}
                            onSand={formik.handleSubmit}
                            {...formik.getFieldProps("lookingForAJobDescription")}
                        />
                    </S.Category>
                )}
            </form>
        </S.Wrapper>
    )
})
