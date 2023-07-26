import React, { useState } from "react"

import Seo from "../components/seo"
import CalculatorInput from "../components/CalculatorInput"
import CalculatorRange from "../components/CalculatorRange"

const cashpoolFee = 0.019
const maxMonthsPeriod = 120
const types = [
  {
    price: 500,
    fee: 0.0000625,
    title: "Useful",
    color: "#DED9CE",
  },
  {
    price: 4000,
    fee: 0.0005,
    title: "Good",
    color: "#57DF5D",
  },
  {
    price: 32000,
    fee: 0.004,
    title: "Excellent",
    color: "#2400FF",
  },
  {
    price: 160000,
    fee: 0.02,
    title: "Mysterious",
    color: "#FF007F",
  },
  {
    price: 800000,
    fee: 0.1,
    title: "Legendary",
    color: "#EB9B19",
  },
]

const largeNumber = number =>
  Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const IndexPage = () => {
  const [State, updateState] = useState({
    cashpoolProfit: 0,
    type: null,
    calculator: {
      period: 12,
      usersPayOut: 0,
      rooms: null,
      roomGames: null,
      gamePlayers: null,
      playerContribution: null,
    },
  })

  const setState = newState => {
    updateState(prev => ({ ...prev, ...newState }))
  }
  const setCalculator = newState => {
    updateState(prev => ({
      ...prev,
      calculator: { ...prev.calculator, ...newState },
    }))
  }

  // NFT SELECT
  const handleNftChange = _item => {
    setState({
      type: types[_item.target.value],
    })
  }

  // CALCULATOR INPUTS
  // TODO sprawdzic czy inputy niee sa <0
  const handlePeriodChange = _item => {
    setCalculator({ period: _item.target.value })
  }
  const handleUsersPayOutChange = _item => {
    setCalculator({ usersPayOut: _item.target.value / 100 })
  }
  const handleRoomsChange = _item => {
    setCalculator({ rooms: _item.target.value })
  }
  const handleRoomGamesChange = _item => {
    setCalculator({ roomGames: _item.target.value })
  }
  const handleGamePlayersChange = _item => {
    setCalculator({ gamePlayers: _item.target.value })
  }
  const handlePlayerContributionChange = _item => {
    setCalculator({ playerContribution: _item.target.value })
  }

  // CALCULATIONS
  const handleCalculateClick = () => {
    let tempCashpoolProfit = 0
    let tempWin = 0
    for (let _a = 0; _a < State.calculator.period * 4 * 7; _a++) {
      for (
        let _b = 0;
        _b < State.calculator.roomGames * State.calculator.rooms;
        _b++
      ) {
        const pool =
          State.calculator.playerContribution * State.calculator.gamePlayers +
          tempWin * (1 - State.calculator.usersPayOut)
        tempCashpoolProfit += pool * cashpoolFee
        tempWin = pool * (1 - cashpoolFee)
      }
    }
    setState({
      cashpoolProfit: tempCashpoolProfit,
    })
  }

  return (
    <main className="view flex flex-col justify-center items-center relative w-full py-12 md:pt-20 md:pb-40 space-y-12 md:space-y-20 text-center">
      <h1>Welcome to the Cashpool app profit calculator</h1>

      {/* NFT SELECT */}
      <section>
        <select
          className="select select-bordered w-fit md:min-w-[300px] max-w-s"
          style={{ color: State.type?.color || "white" }}
          onChange={handleNftChange}
        >
          <option className="text-light">CHOOSE TYPE OF INVEST NFT</option>
          {types.map(({ title, color }, _index) => (
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
              profit sharing
            </h3>
            <h3>
              Price{" "}
              <span style={{ color: State.type.color }}>
                ${largeNumber(State.type.price)}
              </span>
            </h3>
          </div>
        )}
      </section>

      {State.type && (
        <>
          <div className="divider w-full max-w-lg mx-auto"></div>
          {/* CALCULATOR */}
          <section className="w-full space-y-4 md:space-y-6">
            <h2>Calculator</h2>
            <CalculatorRange
              min={1}
              max={maxMonthsPeriod}
              onChange={handlePeriodChange}
              title={`Calculation period: ${State.calculator.period} month${
                State.calculator.period > 1 ? "s" : ""
              }`}
              value={State.calculator.period}
            />
            <CalculatorInput
              title={`Daily number of rooms`}
              value={State.calculator.rooms}
              onChange={handleRoomsChange}
            />
            <CalculatorInput
              title={`Number of games in the room`}
              value={State.calculator.roomGames}
              onChange={handleRoomGamesChange}
              show={State.calculator.rooms > 0}
            />
            <CalculatorInput
              title={`Number of players in the room`}
              value={State.calculator.gamePlayers}
              onChange={handleGamePlayersChange}
              show={
                State.calculator.rooms > 0 && State.calculator.roomGames > 0
              }
            />
            <CalculatorInput
              title={`Contribution of a single player ($)`}
              value={State.calculator.playerContribution}
              onChange={handlePlayerContributionChange}
              show={
                State.calculator.rooms > 0 &&
                State.calculator.roomGames > 0 &&
                State.calculator.gamePlayers > 0
              }
            />
            <CalculatorRange
              min={0}
              max={100}
              onChange={handleUsersPayOutChange}
              title={`${Math.round(
                State.calculator.usersPayOut * 100
              )}% users on average will pay out`}
              value={State.calculator.usersPayOut * 100}
              show={
                State.calculator.rooms > 0 &&
                State.calculator.roomGames > 0 &&
                State.calculator.gamePlayers > 0 &&
                State.calculator.playerContribution > 0
              }
            />
            <button
              className="btn btn-primary btn-large"
              onClick={handleCalculateClick}
              disabled={
                !(
                  State.calculator.rooms > 0 &&
                  State.calculator.roomGames > 0 &&
                  State.calculator.gamePlayers > 0 &&
                  State.calculator.playerContribution > 0
                )
              }
            >
              Calculate
            </button>
          </section>

          {/* RESULTS */}
          <section
            className={`space-y-6 transition-all ${
              State.cashpoolProfit <= 0 && "opacity-10 select-none"
            }`}
          >
            <div>
              <div className="badge badge-primary font-montserratSemiBold uppercase text-white select-none">
                Profit by NFT
              </div>
              <h2 className="pt-2">
                ${largeNumber(State.cashpoolProfit * State.type.fee)}
              </h2>
            </div>
            <div>
              <div className="badge badge-accent font-montserratSemiBold uppercase text-white select-none">
                Return on investment
              </div>
              <h2 className="pt-2">
                {Math.round(
                  ((State.cashpoolProfit * State.type.fee) / State.type.price) *
                    100
                )}
                %
              </h2>
            </div>
            {/* <div
              className="md:tooltip"
              data-tip={"primarily marketing, which will further raise profits"}
            >
              Collected for development
              <br />
              <h3>${largeNumber(State.cashpoolProfit)}</h3>
            </div> */}
          </section>
        </>
      )}
    </main>
  )
}

export const Head = () => <Seo title={"Invest NFT Calculator"} />

export default IndexPage
