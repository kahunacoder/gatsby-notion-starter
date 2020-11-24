import React from 'react';

import { ThemeContext } from './ThemeContext';

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <div class="flex float-right text-align-right">

      <label
        for="toogleA"
        class="flex items-center cursor-pointer"
      >
        <div class="relative">
          <input id="toogleA" type="checkbox" class="hidden"
            checked={colorMode === 'dark'}
            onChange={ev => {
              setColorMode(ev.target.checked ? 'dark' : 'light');
            }}
          />
          <div
            class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
          ></div>
          <div
            class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
          ></div>
        </div>
        <div
          class="ml-3 text-gray-700 font-medium"
        >
          Dark!
          </div>
      </label>

    </div>

  );
};

export default DarkToggle;


    // <label className="float-right text-align-right">
    //   <input
    //     type="checkbox"
    //     checked={colorMode === 'dark'}
    //     onChange={ev => {
    //       setColorMode(ev.target.checked ? 'dark' : 'light');
    //     }}
    //   />{' '}
    //   Dark
    // </label>



// <div class="flex items-center justify-center w-full mb-24">

//   <!-- Toggle Button -->
//   <label
//     for="toogleA"
//     class="flex items-center cursor-pointer"
//   >
//     <!-- toggle -->
//     <div class="relative">
//       <!-- input -->
//       <input id="toogleA" type="checkbox" class="hidden" />
//       <!-- line -->
//       <div
//         class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
//       ></div>
//       <!-- dot -->
//       <div
//         class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
//       ></div>
//     </div>
//     <!-- label -->
//     <div
//       class="ml-3 text-gray-700 font-medium"
//     >
//       Toggle Me!
//     </div>
//   </label>

// </div>

// <div class="bg-gray-400 text-gray-600 px-4 py-3 rounded relative text-sm text-center">
//     Admittedly, there is a litte bit of additional CSS, but not much 😅
// </div>
