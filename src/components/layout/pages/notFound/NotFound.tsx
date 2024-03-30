import { BlockHeader } from "components/blocks/BlockHeader.styled"
import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { Button } from "components/common/button/Button"
import { memo } from "react"
import { useHistory } from "react-router-dom"
import { S } from "./NotFound_Styles"

const NotFound: React.FC = memo(() => {
  const history = useHistory()

  const handleHome = () => {
    history.push("/")
  }
  const handleBack = () => {
    history.goBack()
  }

  return (
    <main id="404">
      <S.Section>
        <BlockHeader>Error 404</BlockHeader>
        <S.Wrapper>
          <h3>Page Not Found</h3>
          <S.Text>The page you are looking for doesn't exist. Here are some helpful links:</S.Text>
          <FlexWrapper gap="min(30px, 2vw)" wrap={"wrap"} justify={"center"}>
            <Button ariaLabel={"Go back button"} variant={"outlined"} onClick={handleBack}>
              ← Back
            </Button>
            <Button ariaLabel={"Go home button"} variant={"primary"} onClick={handleHome}>
              Go home
            </Button>
          </FlexWrapper>
        </S.Wrapper>
      </S.Section>
    </main>
  )
})

export default NotFound
