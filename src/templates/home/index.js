import React, { useState, useRef } from "react"
import { LanguageIcon } from "@heroicons/react/20/solid"

import Seo from "../../components/seo"
import CalculatorRange from "../../components/CalculatorRange"
import db from "../../assets/db.json"
import RoomsGroupView from "./roomsGroup"
import Dropdown from "../../components/Dropdown"
import { StringifyNumber } from "../../functions/StringifyNumber"

const maxMonthsPeriod = 120

const IndexPage = ({ pageContext: { lang } }) => {
  const RoomsGroupRef = useRef({})
  const [RoomsGroupIDs, setRoomsGroupIDs] = useState([])
  const [State, updateState] = useState({
    roomsProfit: 0,
    premiumProfit: 0,
    type: null,
    interval: 12,
  })

  const setState = newState => {
    updateState(prev => ({ ...prev, ...newState }))
  }

  // NFT SELECT
  const handleNftChange = _item => {
    setState({
      type: db.nfts[_item.target.value],
    })
  }

  // CALCULATOR
  const handlePeriodChange = _item => {
    setState({ interval: _item.target.value })
  }
  const handleCalculateClick = () => {
    if (
      RoomsGroupIDs.length > 0 &&
      !Object.values(RoomsGroupRef.current).some(
        _obj =>
          Object.values(_obj).length < 3 ||
          Object.values(_obj).some(_item => _item === (0 || null || ""))
      )
    ) {
      const daysCount = State.interval * 4 * 7
      let tempRoomsProfit = 0
      let tempPremiumProfit = 0
      RoomsGroupIDs.forEach(id => {
        const dailyRoomTurnover =
          RoomsGroupRef.current[id].gameValue *
          RoomsGroupRef.current[id].roomGames
        tempRoomsProfit +=
          dailyRoomTurnover *
          daysCount *
          RoomsGroupRef.current[id].rooms *
          db.roomFee
        tempPremiumProfit +=
          RoomsGroupRef.current[id].rooms * State.interval * db.premiumPrice
      })
      setState({
        roomsProfit: tempRoomsProfit,
        premiumProfit: tempPremiumProfit,
      })
    }
  }

  // GROUP
  const addGroup = () => {
    const newRoomsGroupIDs = RoomsGroupIDs.slice()
    const newID = RoomsGroupIDs[RoomsGroupIDs.length - 1] + 1 || 1
    RoomsGroupRef.current[newID] = {}
    newRoomsGroupIDs.push(newID)
    setRoomsGroupIDs(newRoomsGroupIDs)
  }
  const updateGroup = (_type, _data, _id) => {
    RoomsGroupRef.current[_id][_type] = _data
  }
  const deleteGroup = _id => {
    const index = RoomsGroupIDs.indexOf(_id)
    const newRoomsGroupIDs = RoomsGroupIDs.slice()
    const newRefs = RoomsGroupRef.current
    delete newRefs[_id]
    RoomsGroupRef.current = newRefs
    newRoomsGroupIDs.splice(index, 1)
    setRoomsGroupIDs(newRoomsGroupIDs)
  }

  return (
    <main className="view flex flex-col justify-center items-center relative w-full py-12 md:pt-20 md:pb-40 space-y-12 md:space-y-20 text-center">
      <h1>{db.translations[lang].pages.home.pageTitle}</h1>

      {/* NFT SELECT */}
      <section>
        <select
          className="select select-bordered w-full md:min-w-[200px] max-w-s uppercase"
          style={{ color: State.type?.color || "white" }}
          onChange={handleNftChange}
        >
          <option className="text-light">
            {db.translations[lang].pages.home.nftSelector.title}
          </option>
          {db.nfts.map(({ title, color }, _index) => (
            <option
              key={`TYPES_ITEM_${_index}`}
              value={_index}
              style={{ color }}
            >
              {title}
            </option>
          ))}
        </select>
        {State.type && (
          <div className="flex flex-col space-y-1 pt-4">
            <h3>
              <span style={{ color: State.type.color }}>
                {State.type.fee * 100}%
              </span>{" "}
              {db.translations[lang].pages.home.nftSelector.itemProfit}
            </h3>
            <h3>
              {db.translations[lang].pages.home.nftSelector.itemPrice + " "}
              <span style={{ color: State.type.color }}>
                ${StringifyNumber(State.type.price)}
              </span>
            </h3>
          </div>
        )}
      </section>

      {State.type && (
        <>
          <div className="divider w-full max-w-2xl mx-auto"></div>
          {/* CALCULATOR */}
          <section className="w-full space-y-4 md:space-y-6">
            <h2>{db.translations[lang].pages.home.calculatorTitle}</h2>
            <CalculatorRange
              min={1}
              max={maxMonthsPeriod}
              onChange={handlePeriodChange}
              title={`${db.translations[lang].pages.home.calcInputs.interval}: ${State.interval}`}
              value={State.interval}
            />

            {/* ROOMS GROUP */}
            <div
              className={`w-full grid sm:auto-rows-[1fr] gap-8 py-4 ${
                RoomsGroupIDs.length === 0 ? "sm:grid-cols-1" : "sm:grid-cols-2"
              }`}
            >
              {RoomsGroupIDs.map(_item => (
                <RoomsGroupView
                  key={`CALCULATOR_GROUP_ITEM_${_item}`}
                  lang={lang}
                  refChange={(type, data) => {
                    updateGroup(type, data, _item)
                  }}
                  deleteGroup={() => {
                    deleteGroup(_item)
                  }}
                />
              ))}

              <button
                className="btn btn-ghost h-full min-h-[200px] space-y-4 p-8 border rounded-3xl border-light flex justify-center items-center"
                onClick={addGroup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>

            <button
              className="btn btn-primary btn-large"
              onClick={handleCalculateClick}
            >
              {db.translations[lang].pages.home.calcInputs.calculateTitle}
            </button>
          </section>

          {/* RESULTS */}
          <section
            className={`space-y-6 transition-all ${
              State.roomsProfit <= 0 && "opacity-10 select-none"
            }`}
          >
            <div>
              <div className="badge badge-primary font-montserratSemiBold uppercase text-white select-none">
                {db.translations[lang].pages.home.results.profitTitle}
              </div>
              <h2 className="pt-2">
                $
                {StringifyNumber(
                  (State.roomsProfit + State.premiumProfit) * State.type.fee
                )}
              </h2>
            </div>
            <div>
              <div className="badge badge-accent font-montserratSemiBold uppercase text-white select-none">
                {db.translations[lang].pages.home.results.roiTitle}
              </div>
              <h2 className="pt-2">
                {Math.round(
                  (((State.roomsProfit + State.premiumProfit) *
                    State.type.fee) /
                    State.type.price) *
                    100
                )}
                %
              </h2>
            </div>
          </section>
        </>
      )}

      {/* LANGUAGES */}
      <Dropdown
        dropdownTitle={
          <LanguageIcon className="h-5 w-5 m-2" aria-hidden="true" />
        }
        items={[
          {
            title: "Polski",
            url: "/pl",
          },
          {
            title: "English",
            url: "/en",
          },
        ]}
      />
    </main>
  )
}

export const Head = ({ pageContext: { lang } }) => (
  <Seo title={db.translations[lang].pages.home.websiteName} />
)

export default IndexPage
