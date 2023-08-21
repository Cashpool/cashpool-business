import React, { useEffect, useState } from "react"

import Seo from "../components/seo"
import db from "../assets/db.json"

const NotFoundPage = () => {
  const [Lang, setLang] = useState("en")

  useEffect(() => {
    const userBrowserLang =
      typeof navigator !== "undefined" && navigator.language.substring(0, 2)
    const storageBrowserLang =
      typeof window !== "undefined" && localStorage.getItem("@BROWSER_LANG")
    const lang = storageBrowserLang || userBrowserLang || "en"
    setLang(lang)
  }, [])

  return (
    <section>
      <h1>{db.translations[Lang].pages.notFound.title}</h1>
      <p>{db.translations[Lang].pages.notFound.desc}</p>
    </section>
  )
}

export const Head = () => {
  const [Lang, setLang] = useState("en")

  useEffect(() => {
    const userBrowserLang =
      typeof navigator !== "undefined" && navigator.language.substring(0, 2)
    const storageBrowserLang =
      typeof window !== "undefined" && localStorage.getItem("@BROWSER_LANG")
    const lang = storageBrowserLang || userBrowserLang || "en"
    setLang(lang)
  }, [])

  return <Seo title={db.translations[Lang].pages.notFound.title} />
}

export default NotFoundPage
