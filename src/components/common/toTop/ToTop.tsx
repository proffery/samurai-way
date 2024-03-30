import { Icon } from "components/common/icon/Icon"
import { memo, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { S } from "./ToTop_Styles"

type Props = {
  anchor_id: string
}

export const ToTop: React.FC<Props> = memo(({ anchor_id }) => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const lastHash = useRef("")

  useEffect(() => {
    const main = document.querySelector("main")
    const onScroll = () => {
      if (main && main.scrollTop > 300) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    main && main.addEventListener("scroll", onScroll)
    return () => {
      main && main.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1)
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document.getElementById(lastHash.current)?.scrollIntoView({ behavior: "smooth", block: "start" })
        lastHash.current = ""
      }, 100)
    }
  }, [location])

  const onClickHandler = () => {
    document.location = "#" + anchor_id
  }

  return scrolled ? (
    <S.ToTop to={"#" + anchor_id} onClick={onClickHandler}>
      <Icon iconId="leftArrow" viewBox="-1 9 14 14" />
    </S.ToTop>
  ) : null
})
