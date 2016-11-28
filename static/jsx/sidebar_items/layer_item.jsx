import React from "react";


export default class LayerItem extends React.Component {

    render() {
        let liStyleClass = "layers-li-unactive";
        if (this.props.isActive){
            liStyleClass = "layers-li-active";
        }

        return (
            <li className={["layers-li ", liStyleClass].join("")} onClick={this.props.onClick}>
                {this.props.layerName}
            </li>
        );
    }
}
