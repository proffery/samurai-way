import { memo } from "react"
import { ProfileData } from "store/profile/profileReducer"
import { S } from "./About_Styles"
import { Checkbox } from "components/common/checkbox/Checkbox"

type Props = {
    profileData: ProfileData
}
export const About: React.FC<Props> = memo(({ profileData }) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = profileData
    return (
        <S.Wrapper>
            {fullName && (
                <S.Category>
                    <S.ContactIcon iconId={"profile"} viewBox="-4 -4 22 22" />
                    <S.Description>{fullName}</S.Description>
                </S.Category>
            )}
            {aboutMe && (
                <S.Category>
                    <S.ContactIcon iconId={"info"} />
                    <S.Description>{aboutMe}</S.Description>
                </S.Category>
            )}
            {lookingForAJob && (
                <S.Category>
                    <Checkbox
                        label="Looking job"
                        id="lookingForAJob"
                        checked={lookingForAJob}
                        onChange={() => {}}
                        readOnly
                    />
                </S.Category>
            )}
            {lookingForAJob && (
                <S.Category>
                    <S.ContactIcon iconId={"info"} />
                    <S.Description>{lookingForAJobDescription}</S.Description>
                </S.Category>
            )}
            {!fullName && !lookingForAJobDescription && !lookingForAJob && aboutMe && (
                <S.Description>No info...</S.Description>
            )}
        </S.Wrapper>
    )
})
