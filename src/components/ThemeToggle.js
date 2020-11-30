import React from 'react';

class themeToggle extends React.Component {
  render () {
    const { theme, setTheme } = this.props.toggle

    const handleThemeToggle = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    return (
      <div className="dark-button text-white">
        <input
          type="checkbox"
          id="theme-toggle"
          onChange={handleThemeToggle}
          checked={theme === 'dark' ? true : false}
        />
            Dark Mode &nbsp;
        <label htmlFor="theme-toggle"></label>
      </div>
    )
  }
}

export default themeToggle
