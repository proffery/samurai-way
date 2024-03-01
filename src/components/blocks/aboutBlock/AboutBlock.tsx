import React from "react"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Icon } from "../../micro/icon/Icon"
import { font } from "../../../styles/Font"
import { ProfileDataType } from "../../../redux/profileReducer"
import { AuthStateType } from "../../../redux/authReducer"
import { EditableSpan } from "../../micro/editableSpan/EditableSpan"

type AboutBlockPropsType = {
    authData: AuthStateType
    className?: string
    profileAboutData: ProfileDataType
}

export const AboutBlock: React.FC<AboutBlockPropsType> = (props) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.profileAboutData.contacts
    const { userId } = props.profileAboutData
    const { id: authId } = props.authData
    
    return (
        <About id="about" className={props.className}>
            <BlockHeader>About</BlockHeader>
            {userId !== authId ?
                <CategoryWrapper>
                    {facebook &&
                        <ContactCategory>
                            <ContactIcon iconId="facebook" />
                            <Description>{facebook}</Description>
                        </ContactCategory>
                    }
                    {twitter &&
                        <ContactCategory>
                            <ContactIcon iconId="twitter" />
                            <Description>{twitter}</Description>
                        </ContactCategory>
                    }
                    {instagram &&
                        <ContactCategory>
                            <ContactIcon iconId="instagram" />
                            <Description>{instagram}</Description>
                        </ContactCategory>
                    }
                    {youtube &&
                        <ContactCategory>
                            <ContactIcon iconId="youtube" />
                            <Description>{youtube}</Description>
                        </ContactCategory>
                    }
                    {github &&
                        <ContactCategory>
                            <ContactIcon iconId="github" viewBox="-10 -10 150 150" />
                            <Description>{github}</Description>
                        </ContactCategory>
                    }
                    {vk &&
                        <ContactCategory>
                            <ContactIcon iconId="vk" viewBox="-3 -3 40 40" />
                            <Description>{vk}</Description>
                        </ContactCategory>
                    }
                    {website &&
                        <ContactCategory>
                            <ContactIcon iconId="home" viewBox="-2 -2 24 24" />
                            <Description>{website}</Description>
                        </ContactCategory>
                    }
                    {mainLink &&
                        <ContactCategory>
                            <ContactIcon iconId="linkedin" viewBox="0 2 24 24" />
                            <Description>{mainLink}</Description>
                        </ContactCategory>
                    }
                    {!facebook && !twitter && !instagram && !youtube && !github && !vk && !website && !mainLink &&
                        <Description>No info...</Description>
                    }
                </CategoryWrapper> :
                <CategoryWrapper>
                    <form>
                        <ContactCategory>
                            <ContactIcon iconId="facebook" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="twitter" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="instagram" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="youtube" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="github" viewBox="-10 -10 150 150" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="vk" viewBox="-3 -3 40 40" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="home" viewBox="-2 -2 24 24" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="linkedin" viewBox="0 2 24 24" />
                            <EditableSpan
                                value={''}
                                actualValue={''}
                                onSand={() => { }}
                                onChange={() => { }}
                            />
                        </ContactCategory>
                    </form>
                </CategoryWrapper>
            }
        </About >
    )
}

const About = styled(BlockSection)`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary};
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
`
const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 5px;
    @media ${theme.media.mobile} {
        flex-direction: row;
    }
`
const ContactCategory = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: fit-content;
    gap: 5px;
    padding: 5px 0;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0%;
    }
    @media ${theme.media.mobile} {
        flex-direction: row;
        width: 30%;
        &::after {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
        }
    }
`
const ContactIcon = styled(Icon)`
    width: 20%;
    min-width: 24px;
    @media ${theme.media.mobile} {
        min-width: 18px;
        width: 18px;
    }
 `
const Description = styled.span`
    display: flex;
    align-items: center;
    width: 75%;
    overflow-wrap: anywhere;
 `
