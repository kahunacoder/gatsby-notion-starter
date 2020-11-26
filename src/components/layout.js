import React, { useContext } from 'react';
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import capitalize from "lodash/capitalize"
// import DarkToggle from './DarkToggle';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import { ThemeContext } from '../context/themeContext';

// import { rhythm, scale } from "../utils/typography"


const Layout = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  // const { location, title, section } = this.props
  // const rootPath = `${__PATH_PREFIX__}/`
  // let header
  // let breadcrumbs

  // if (location.pathname === rootPath) {
  //   header = (
  //     <div>
  //       <h1 className="text-6xl font-black font-sans mb-10 mt-0">
  //         <Link className="shadow-none" to={`/`}>
  //           {title}
  //         </Link>
  //       </h1>
  //     </div>
  //   )
  // } else {
  //   header = (
  //     <div>
  //       <h3 className="text-2xl font-sans font-black mt-0">
  //         <Link className="shadow-none" to={`/`}>
  //           {title}
  //         </Link>
  //       </h3>
  //     </div>
  //   )
  // }
  // if (location.pathname !== rootPath) {
  //   breadcrumbs = (
  //     <p className="text-sm leading-loose mb-8">
  //       <Link
  //         className="text-notion-blue-txt"
  //         to={`/${kebabCase(section)}/`}
  //       >
  //         {capitalize(section)}
  //       </Link>
  //     </p>)
  // }

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div
      className={`${theme === 'light' ? 'theme-light' : 'theme-dark'
        } bg-notion-DEFAULT-bkg text-notion-DEFAULT-txt transition-all duration-300 m-0 px-0 py-5 min-h-screen`}>

      <div className="float-right text-alignright px-5 py-5">
        <label htmlFor="theme-toggle" className="text-accent">
          Dark Mode
        </label>
        <Toggle
          id="theme-toggle"
          checked={theme === 'light' ? true : false}
          onChange={handleThemeToggle}
        />
      </div>

      <main className="max-w-2xl mx-auto px-5 py-10 ">{children}</main>
      <footer className="text-DEFAULT-txt">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};





// class Layout extends React.Component {
//   render () {
//     const { location, title, children, section } = this.props
//     const rootPath = `${__PATH_PREFIX__}/`
//     let header
//     let breadcrumbs

//     if (location.pathname === rootPath) {
//       header = (
//         <div>
//           <h1 className="text-6xl font-black font-sans mb-10 mt-0">
//             <Link className="shadow-none" to={`/`}>
//               {title}
//             </Link>
//           </h1>
//         </div>
//       )
//     } else {
//       header = (
//         <div>
//           <h3 className="text-2xl font-sans font-black mt-0">
//             <Link className="shadow-none" to={`/`}>
//               {title}
//             </Link>
//           </h3>
//         </div>
//       )
//     }
//     if (location.pathname !== rootPath) {
//       breadcrumbs = (
//         <p className="text-sm leading-loose mb-8">
//           <Link
//             className="text-notion-blue-txt"
//             to={`/${kebabCase(section)}/`}
//           >
//             {capitalize(section)}
//           </Link>
//         </p>)
//     }
//     return (
//       <div className="max-w-2xl mx-auto px-5 py-10 theme-dark bg-DEFAULT-bkg text-DEFAULT-txt">
//         <header>{header}</header>
//         <main>{breadcrumbs}{children}</main>
//         <footer>
//           © {new Date().getFullYear()}, Built with
//           {` `}
//           <a className="text-notion-blue-txt" href="https://www.gatsbyjs.org">
//             Gatsby
//           </a>
//         </footer>
//       </div>
//     )
//   }
// }

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
