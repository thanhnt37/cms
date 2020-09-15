import React, {Component} from 'react';
import {connect} from "react-redux";
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';

import {actions as leftMenuActions} from "../../actions/leftMenu";

export class HeaderContainer extends Component {

    showLefMenu = () => {
        this.props.openLeftMenu();
    };

    render() {
        return (
            <HeaderComponent
                showLefMenu={this.showLefMenu}
            />
        );
    };
}

const HeaderComponent = (props) => {
    return (
        <div id="App-Header">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={props.showLefMenu}  edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Content Management System
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => ({
});

const actions = {
    openLeftMenu: leftMenuActions.openLeftMenu
};

export default connect(mapStateToProps, actions)(HeaderContainer);
