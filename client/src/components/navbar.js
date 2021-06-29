import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
} from "@chakra-ui/react"


class navbar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="navbar">
            <h2>navbar</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">homes</Link>
                    </li>
                    <li>
                        <Link to="/game">game</Link>
                    </li>
                </ul>
            </nav>
        </div>
        )
    }
}

export default navbar;