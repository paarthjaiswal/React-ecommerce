'use client'

import { useState , useEffect} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {fetchProductbyfilter,fetchallbrands,fetchallcatagories ,selectbrands,selectcatagories} from "../ProductList/productListSlice";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const title = "New Arrival"
const sortOptions = [
  // Minus sign means descending (Highest to Lowest)
  { name: 'Best Rating', sort: '-rating', current: false }, 
  { name: 'Price: Low to High', sort: 'price', current: false },
  { name: 'Price: High to Low', sort: '-price', current: false },
];


// const filters = [
//   {
//     id: 'category',
//     name: 'Category',
//     options: [
//       { value: 'smartphones', label: 'smartphones', checked: false },
//       { value: 'laptops', label: 'laptops', checked: false },
//       { value: 'fragrances', label: 'fragrances', checked: false },
//       { value: 'skincare', label: 'skincare', checked: false },
//       { value: 'groceries', label: 'groceries', checked: false },
//       { value: 'home-decoration', label: 'home decoration', checked: false },
//       { value: 'furniture', label: 'furniture', checked: false },
//       { value: 'tops', label: 'tops', checked: false },
//       { value: 'womens-dresses', label: 'womens dresses', checked: false },
//       { value: 'womens-shoes', label: 'womens shoes', checked: false },
//       { value: 'mens-shirts', label: 'mens shirts', checked: false },
//       { value: 'mens-shoes', label: 'mens shoes', checked: false },
//       { value: 'mens-watches', label: 'mens watches', checked: false },
//       { value: 'womens-watches', label: 'womens watches', checked: false },
//       { value: 'womens-bags', label: 'womens bags', checked: false },
//       { value: 'womens-jewellery', label: 'womens jewellery', checked: false },
//       { value: 'sunglasses', label: 'sunglasses', checked: false },
//       { value: 'automotive', label: 'automotive', checked: false },
//       { value: 'motorcycle', label: 'motorcycle', checked: false },
//       { value: 'lighting', label: 'lighting', checked: false },
//     ],
//   },
//   {
//     id: 'brand',
//     name: 'Brands',
//     options: [
//       { value: 'Apple', label: 'Apple', checked: false },
//       { value: 'Samsung', label: 'Samsung', checked: false },
//       { value: 'OPPO', label: 'OPPO', checked: false },
//       { value: 'Huawei', label: 'Huawei', checked: false },
//       {
//         value: 'Microsoft Surface',
//         label: 'Microsoft Surface',
//         checked: false,
//       },
//       { value: 'Infinix', label: 'Infinix', checked: false },
//       { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
//       {
//         value: 'Impression of Acqua Di Gio',
//         label: 'Impression of Acqua Di Gio',
//         checked: false,
//       },
//       { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
//       {
//         value: 'Fog Scent Xpressio',
//         label: 'Fog Scent Xpressio',
//         checked: false,
//       },
//       { value: 'Al Munakh', label: 'Al Munakh', checked: false },
//       { value: 'Lord - Al-Rehab', label: 'Lord   Al Rehab', checked: false },
//       { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
//       { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
//       { value: 'Dermive', label: 'Dermive', checked: false },
//       { value: 'ROREC White Rice', label: 'ROREC White Rice', checked: false },
//       { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
//       { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
//       { value: 'Bake Parlor Big', label: 'Bake Parlor Big', checked: false },
//       {
//         value: 'Baking Food Items',
//         label: 'Baking Food Items',
//         checked: false,
//       },
//       { value: 'fauji', label: 'fauji', checked: false },
//       { value: 'Dry Rose', label: 'Dry Rose', checked: false },
//       { value: 'Boho Decor', label: 'Boho Decor', checked: false },
//       { value: 'Flying Wooden', label: 'Flying Wooden', checked: false },
//       { value: 'LED Lights', label: 'LED Lights', checked: false },
//       { value: 'luxury palace', label: 'luxury palace', checked: false },
//       { value: 'Golden', label: 'Golden', checked: false },
//       {
//         value: 'Furniture Bed Set',
//         label: 'Furniture Bed Set',
//         checked: false,
//       },
//       { value: 'Ratttan Outdoor', label: 'Ratttan Outdoor', checked: false },
//       { value: 'Kitchen Shelf', label: 'Kitchen Shelf', checked: false },
//       { value: 'Multi Purpose', label: 'Multi Purpose', checked: false },
//       { value: 'AmnaMart', label: 'AmnaMart', checked: false },
//       {
//         value: 'Professional Wear',
//         label: 'Professional Wear',
//         checked: false,
//       },
//       { value: 'Soft Cotton', label: 'Soft Cotton', checked: false },
//       { value: 'Top Sweater', label: 'Top Sweater', checked: false },
//       {
//         value: 'RED MICKY MOUSE..',
//         label: 'RED MICKY MOUSE..',
//         checked: false,
//       },
//       { value: 'Digital Printed', label: 'Digital Printed', checked: false },
//       { value: 'Ghazi Fabric', label: 'Ghazi Fabric', checked: false },
//       { value: 'IELGY', label: 'IELGY', checked: false },
//       { value: 'IELGY fashion', label: 'IELGY fashion', checked: false },
//       {
//         value: 'Synthetic Leather',
//         label: 'Synthetic Leather',
//         checked: false,
//       },
//       {
//         value: 'Sandals Flip Flops',
//         label: 'Sandals Flip Flops',
//         checked: false,
//       },
//       { value: 'Maasai Sandals', label: 'Maasai Sandals', checked: false },
//       { value: 'Arrivals Genuine', label: 'Arrivals Genuine', checked: false },
//       { value: 'Vintage Apparel', label: 'Vintage Apparel', checked: false },
//       { value: 'FREE FIRE', label: 'FREE FIRE', checked: false },
//       { value: 'The Warehouse', label: 'The Warehouse', checked: false },
//       { value: 'Sneakers', label: 'Sneakers', checked: false },
//       { value: 'Rubber', label: 'Rubber', checked: false },
//       { value: 'Naviforce', label: 'Naviforce', checked: false },
//       { value: 'SKMEI 9117', label: 'SKMEI 9117', checked: false },
//       { value: 'Strap Skeleton', label: 'Strap Skeleton', checked: false },
//       { value: 'Stainless', label: 'Stainless', checked: false },
//       { value: 'Eastern Watches', label: 'Eastern Watches', checked: false },
//       { value: 'Luxury Digital', label: 'Luxury Digital', checked: false },
//       { value: 'Watch Pearls', label: 'Watch Pearls', checked: false },
//       { value: 'Bracelet', label: 'Bracelet', checked: false },
//       { value: 'LouisWill', label: 'LouisWill', checked: false },
//       { value: 'Copenhagen Luxe', label: 'Copenhagen Luxe', checked: false },
//       { value: 'Steal Frame', label: 'Steal Frame', checked: false },
//       { value: 'Darojay', label: 'Darojay', checked: false },
//       {
//         value: 'Fashion Jewellery',
//         label: 'Fashion Jewellery',
//         checked: false,
//       },
//       { value: 'Cuff Butterfly', label: 'Cuff Butterfly', checked: false },
//       {
//         value: 'Designer Sun Glasses',
//         label: 'Designer Sun Glasses',
//         checked: false,
//       },
//       { value: 'mastar watch', label: 'mastar watch', checked: false },
//       { value: 'Car Aux', label: 'Car Aux', checked: false },
//       { value: 'W1209 DC12V', label: 'W1209 DC12V', checked: false },
//       { value: 'TC Reusable', label: 'TC Reusable', checked: false },
//       { value: 'Neon LED Light', label: 'Neon LED Light', checked: false },
//       {
//         value: 'METRO 70cc Motorcycle - MR70',
//         label: 'METRO 70cc Motorcycle   MR70',
//         checked: false,
//       },
//       { value: 'BRAVE BULL', label: 'BRAVE BULL', checked: false },
//       { value: 'shock absorber', label: 'shock absorber', checked: false },
//       { value: 'JIEPOLLY', label: 'JIEPOLLY', checked: false },
//       { value: 'Xiangle', label: 'Xiangle', checked: false },
//       {
//         value: 'lightingbrilliance',
//         label: 'lightingbrilliance',
//         checked: false,
//       },
//       { value: 'Ifei Home', label: 'Ifei Home', checked: false },
//       { value: 'DADAWU', label: 'DADAWU', checked: false },
//       { value: 'YIOSI', label: 'YIOSI', checked: false },
//     ],
//   },
// ];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoryFilter({ children }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter ,setFilter] = useState({});
  const dispatch = useDispatch();
  const brands = useSelector(selectbrands);
  const category = useSelector(selectcatagories);
  const status = useSelector((state) => state.productlist.status);
useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchallbrands());
      dispatch(fetchallcatagories());
      console.log("effects running");
    }
  }, [ status , dispatch]);

    const filters = [
    {
      id: 'category',
      name: 'Category',
      options: category, 
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands, 
    }
  ];
  const handleFilter = (e, section, option) => {
   const newFilter = { ...filter }; 

  // 2. Ensure the key exists and holds an array. 
  // If it doesn't exist yet, initialize it as an empty array.
  if (!newFilter[section.id]) {
    newFilter[section.id] = [];
  }

  if (e.target.checked) {
    // 3a. ADD to the array
    newFilter[section.id].push(option.value); 
  } else {
    // 3b. REMOVE from the array using .filter()
    newFilter[section.id] = newFilter[section.id].filter(
      (item) => item !== option.value
    );

    // 4. Memory Cleanup: If the array is empty, delete the key entirely 
    // so we don't send empty parameters to the server.
    if (newFilter[section.id].length === 0) {
      delete newFilter[section.id];
    }
  }
  setFilter(newFilter);
    console.log(newFilter);
  console.log(filter);
  console.log("filter is running");
  dispatch(fetchProductbyfilter(newFilter));
  };                

const handleSort = (e, option) => {
  // 1. Copy existing filters
  const newFilter = { ...filter };

  // 2. Overwrite the _sort key with the new value (e.g., "-price")
  newFilter._sort = option.sort;

  // 3. Remove _order entirely just in case it was stuck in your state
  delete newFilter._order;

  // 4. Update state and dispatch
  setFilter(newFilter);
  console.log(newFilter);
  console.log(filter);
  console.log("sort running");
  dispatch(fetchProductbyfilter(newFilter));
};



  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
      <MobileFilter
      filters={filters}
       handleFilter={handleFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />


        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-4 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          onClick={(e) => handleSort(e, option)}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter filters={filters} handleFilter={handleFilter} />
                    
              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="overflow-y-auto h-[calc(100vh-200px)] px-1 scrollbar-thin scrollbar-thumb-gray-300">
                  {children}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function MobileFilter({
  filters,
   handleFilter,
   mobileFiltersOpen,
  setMobileFiltersOpen }) {

  return (
    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>
            {filters.map((section) => (
              <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                      <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              defaultValue={option.value}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={(e) => handleFilter(e, section, option)}
                              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                              />
                              <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-indeterminate:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

function  DesktopFilter({filters, handleFilter}) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      {filters.map((section) => (
        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  )
}