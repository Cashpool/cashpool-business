import React, { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Link } from "gatsby"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Dropdown({ dropdownTitle, items }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-light hover:bg-dark px-3 py-2 text-sm font-montserratSemiBold">
          {dropdownTitle}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-56 origin-top-right rounded-md bg-light">
          <div className="py-1">
            {items.map(({ title, url }, index) => (
              <Menu.Item key={`DROPDOWN_ITEM_${index}_${title}`}>
                <Link
                  to={url}
                  className={classNames(
                    "block px-4 py-2 text-sm hover:bg-dark"
                  )}
                >
                  {title}
                </Link>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
