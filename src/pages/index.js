import React, { useState } from "react"

import Seo from "../components/seo"
import CalculatorInput from "../components/CalculatorInput"
import CalculatorRange from "../components/CalculatorRange"

const cashpoolFee = 0.018
const maxMonthsPeriod = 120
const types = [
  {
    price: 500,
    fee: 0.0000625,
    title: "Rice",
    color: "#DED9CE",
  },
  {
    price: 4000,
    fee: 0.0005,
    title: "Mayonnaise",
    color: "#57DF5D",
  },
  {
    price: 32000,
    fee: 0.004,
    title: "Olive",
    color: "#3022C2",
  },
  {
    price: 160000,
    fee: 0.02,
    title: "BBQ",
    color: "#FF007F",
  },
  {
    price: 800000,
    fee: 0.1,
    title: "Crispy Chicken",
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
      usersPayOut: 100,
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
  const handlePeriodChange = _item => {
    setCalculator({ period: _item.target.value })
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
  const handleUsersPayOutChange = _item => {
    setCalculator({ usersPayOut: _item.target.value })
  }

  // CALCULATIONS
  const handleCalculateClick = () => {
    const daysCount = State.calculator.period * 4 * 7
    const averangePool =
      State.calculator.playerContribution * State.calculator.gamePlayers
    let tempCashpoolProfit = 0
    for (let _a = 0; _a < State.calculator.rooms; _a++) {
      let tempWin = 0
      for (let _b = 0; _b < State.calculator.roomGames * daysCount; _b++) {
        const tempPula = averangePool + tempWin
        const profitCP = tempPula * cashpoolFee
        tempCashpoolProfit += profitCP
        tempWin =
          _b % State.calculator.usersPayOut === 0 ? 0 : tempPula - profitCP
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
              title={`Number of players in a draw`}
              value={State.calculator.gamePlayers}
              onChange={handleGamePlayersChange}
            />
            <CalculatorInput
              title={`Player contribution to each draw ($)`}
              value={State.calculator.playerContribution}
              onChange={handlePlayerContributionChange}
              show={State.calculator.gamePlayers > 0}
            />
            <CalculatorInput
              title={`Daily number of draws in the room`}
              value={State.calculator.roomGames}
              onChange={handleRoomGamesChange}
              show={
                State.calculator.playerContribution > 0 &&
                State.calculator.gamePlayers > 0
              }
            />
            <CalculatorInput
              title={`Daily number of rooms`}
              value={State.calculator.rooms}
              onChange={handleRoomsChange}
              show={
                State.calculator.playerContribution > 0 &&
                State.calculator.gamePlayers > 0 &&
                State.calculator.roomGames > 0
              }
            />
            <CalculatorInput
              title={`Every how many players, the winner pays out`}
              value={State.calculator.usersPayOut}
              onChange={handleUsersPayOutChange}
              show={
                State.calculator.playerContribution > 0 &&
                State.calculator.gamePlayers > 0 &&
                State.calculator.roomGames > 0 &&
                State.calculator.rooms > 0
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
            <div className="text-dark">
              Profit from monthly subscriptions is <b>NOT</b> counted.
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export const Head = () => <Seo title={"NFT Calculator"} />

export default IndexPage
