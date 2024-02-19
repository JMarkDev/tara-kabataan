import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function DropdownCategory({ options, handleFilter, setFilterSelected, setFilterCategoryMobile }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [label, setLable] = useState(options[0])

  const handleSelectFilter = async (selectedFilter) => {
    setSelectedOption(selectedFilter);
    await handleFilter(selectedFilter)
    // if(selectedOption.label === 'Status') {
    //   setFilterSelected(selectedFilter)
    // } else if (selectedOption.label === 'Category') {
    //   console.log('category')
    //   setFilterCategoryMobile(selectedFilter)
    // }
    // await handleFilter(selectedFilter, selectedOption.label === 'Category' ? selectedFilter : '');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {label.label}{/* {label} */}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div>
                    {option.links.map((link, idx) => (
                      <button
                        key={idx}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-sm whitespace-nowrap hover:bg-gray-300 text-left'
                        )}
                        onClick={() => {
                          handleSelectFilter(link)
                          // setLabel(link)
                        }}
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
