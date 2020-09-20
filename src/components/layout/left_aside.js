import React, {Component} from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import { Dashboard as DashboardIcon, Note as NoteIcon, ExitToApp as LogoutIcon } from '@material-ui/icons';

import {actions as leftMenuActions} from "../../actions/leftMenu";
import {actions as pageLoadingActions} from "../../actions/pageLoading";

export class LeftAsideContainer extends Component {

    _closeMenu = () => {
        this.props.closeLeftMenu();
    };

    _changeRoute = () => {
        this.props.closeLeftMenu();
        // this.props.startPageLoading();
    }

    render() {
        return (
            <Drawer open={this.props.leftMenu.visible} onClose={this._closeMenu} anchor="left">
                <div id="left-aside">
                    <ul>
                        <li>
                            <Link to="/" onClick={this._changeRoute}>
                                <DashboardIcon color="action" fontSize="small" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/articles" onClick={this._changeRoute}>
                                <NoteIcon color="action" fontSize="small" />
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" onClick={this._changeRoute}>
                                <LogoutIcon color="action" fontSize="small" />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
        );
    }
}

const mapStateToProps = state => ({
    leftMenu: state.leftMenu
});

const actions = {
    closeLeftMenu: leftMenuActions.closeLeftMenu,
    startPageLoading: pageLoadingActions.startPageLoading
};

export default connect(mapStateToProps, actions)(LeftAsideContainer);
