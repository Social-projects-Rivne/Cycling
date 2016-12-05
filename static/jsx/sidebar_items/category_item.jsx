import React from 'react';


export default class CategoryItem extends React.Component {

  render() {
    let liStyleClass = "categories-li-unactive";
    if (this.props.isActive){
       liStyleClass = "categories-li-active";
    }

    return (
       <li className={ ["categories-li ", liStyleClass].join("")} onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.categoryName}</li>
    );
  }

}
