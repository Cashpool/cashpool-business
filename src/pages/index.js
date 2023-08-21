import React, { useEffect } from "react"
import { navigate } from "gatsby"

const IndexPage = () => {
  useEffect(() => {
    const userBrowserLang =
      typeof navigator !== "undefined" && navigator.language.substring(0, 2)
    const storageBrowserLang =
      typeof window !== "undefined" && localStorage.getItem("@BROWSER_LANG")
    const lang = storageBrowserLang || userBrowserLang || "en"

    navigate(`/${lang}`)
  }, [])

  return <></>
}

export default IndexPage
