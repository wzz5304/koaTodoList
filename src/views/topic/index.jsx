import React, { Component } from 'react';
import { Button } from 'antd'
// class Topics extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { }
//     }
//     render() { 
//         return ( 
//             <div>This is a Topics Page</div>
//          );
//     }
// }
 
// export default Topics;
const themes = {
    light: {
      foreground: '#ffffff',
      background: '#18B583',
    },
    dark: {
      foreground: '#000000',
      background: '#eeeeee',
    },
}

const ThemeContext = React.createContext(themes.dark);

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  console.log('ThemedButton', props)
  return (
    <ThemeContext.Consumer>
        {theme => {
            console.log('theme', theme)
            return <Button 
                {...props} 
                style={{backgroundColor: theme.background}} 
                onClick={props.changeTheme}
            />
        }}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
    return (
        <div>
        <ThemedButton changeTheme={props.changeTheme} />
        </div>
    );
}

class Topics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: themes.light
        }
    }

    toggleTheme = () => {
        this.setState(state => ({
            themes:
            state.themes === themes.dark
            ? themes.light
            : themes.dark,
        }))
    }

    render() {
        return (
        <ThemeContext.Provider value={this.state.themes}>
            <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        );
    }
}

export default Topics;