import React from 'react';


export default class DisplayItem extends React.Component {

    render() {
        let liStyleClass = "display-li-unactive";
        if (this.props.isActive){
            liStyleClass = "display-li-active";
        }

        if (this.props.additionalClasses){
            liStyleClass = [liStyleClass, this.props.additionalClasses].join(" ");
        }

        return (
            <li>
                <div className={["display-li ", liStyleClass].join("")} onClick={this.props.onClick}
                    id={this.props.id} data-toggle={this.props.data_toggle} href={this.props.data_target}>
                    <span className="li-name">{this.props.markerName}</span>
                </div>
                {this.props.children}
            </li>
        );
    }
}
