import React, { useState } from "react"

import CalculatorInput from "../../components/CalculatorInput"
import db from "../../assets/db.json"

const GroupRoomsView = ({ lang, refChange, deleteGroup }) => {
  const [State, updateState] = useState({
    name: db.translations[lang].pages.home.roomsGroup.defaultGroupTitle,
    rooms: "",
    roomGames: "",
    gameValue: "",
  })

  const setState = (type, data) => {
    updateState(prev => ({ ...prev, [type]: data }))
    if (type !== "name") refChange(type, data)
  }

  // CALCULATOR INPUTS
  const handleNameChange = _item => {
    setState("name", _item.target.value)
  }
  const handleRoomsChange = _item => {
    setState("rooms", _item.target.value)
  }
  const handleRoomGamesChange = _item => {
    setState("roomGames", _item.target.value)
  }
  const handleGameValueChange = _item => {
    setState("gameValue", _item.target.value)
  }

  return (
    <div className="space-y-8 md:space-y-8 p-8 border rounded-3xl border-light">
      <CalculatorInput
        value={State.name}
        type="text"
        onChange={handleNameChange}
        titleMode
        placeholder={db.translations[lang].pages.home.calcInputs.roomName}
      />
      <CalculatorInput
        title={db.translations[lang].pages.home.calcInputs.gameValue}
        value={State.gameValue}
        onChange={handleGameValueChange}
      />
      <CalculatorInput
        title={db.translations[lang].pages.home.calcInputs.roomGames}
        value={State.roomGames}
        onChange={handleRoomGamesChange}
        show={State.gameValue > 0}
      />
      <CalculatorInput
        title={db.translations[lang].pages.home.calcInputs.rooms}
        value={State.rooms}
        onChange={handleRoomsChange}
        show={State.gameValue > 0 && State.roomGames > 0}
      />
      <button className="btn btn-error" onClick={deleteGroup}>
        {db.translations[lang].pages.home.roomsGroup.deleteTitle}
      </button>
    </div>
  )
}

export default GroupRoomsView
