import React, { Component } from "react";
 

const dictionary = {
  deselect: 'Котэ не одобряет?'
}

let touchScreen = false;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	selected: false,
    	hover: false
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.hoverInEvent = this.hoverInEvent.bind(this);
    this.hoverOutEvent = this.hoverOutEvent.bind(this);
  }

  clickHandler(e) {
	e.preventDefault();
	if (!this.props.disabled)
    	this.setState({ selected : !this.state.selected} );
    this.setState({ hover : false} );
  }

  hoverInEvent(e) {
    this.setState({ hover : true} );
  }

  hoverOutEvent(e) {
    this.setState({ hover : false} );
  }

  render() {

  	let itemClassName = "item"
  	let subtitleBlock = ""
  	let bottomText = ""
  	
  	if (this.props.disabled)
  		itemClassName += " disabled"
  	else if (this.state.selected) 
  		itemClassName += " selected"

  	

  	if (this.state.hover && this.state.selected && !touchScreen)
  		subtitleBlock = <p className="subtitle">{dictionary.deselect}</p>
  	else if (this.props.disabled)
  		subtitleBlock = <p className="subtitle">{this.props.subtitle}</p>
  	else
  		subtitleBlock = <p className="subtitle" style={{color: "#666666"}}>{this.props.subtitle}</p>

  	

  	if (this.state.selected)
  		bottomText = <p className="bottom-text">{this.props.bottomTextSelected}</p>
  	else if (this.props.disabled)
  		bottomText = <p className="bottom-text">Печалька, {this.props.taste} закончился.</p>
  	else 
  		bottomText = <p className="bottom-text">Чего сидишь? Порадуй котэ, <a className="bottom-link" href="#" onClick={this.clickHandler}>купи.</a></p>

    
    return (
        <div className={itemClassName}><a href="/" className="item-border" onClick={this.clickHandler} onMouseEnter={this.hoverInEvent} onMouseLeave={this.hoverOutEvent}></a>
                    <div className="item-contents">
                    {subtitleBlock}
                    <p className="title">{this.props.title}</p>
                    <p className="taste">{this.props.taste}</p>
                    <p className="description">{this.props.descr}</p>
                    <div className="image-container"><img className="photo" src={this.props.image}></img></div>
                    <div className="oval">
                        <p className="weight value">{this.props.weight}</p>
                        <p className="weight unit">кг</p>
                    </div>
                    {bottomText}  
                    </div>
        </div>
    );
  }
}

class App extends Component {

    render() {

    if ("ontouchstart" in document.documentElement && !touchScreen) 
  		touchScreen = true;

        return (
        <div>
        <h1 className="text-center header">Ты сегодня покормил кота?</h1>
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-item">

                <Item 
                subtitle="Сказочное заморское яство" 
                title="Нямушка" 
                taste="с фуа-гра" 
                bottomTextSelected="Печень утки разварная с артишоками."
                weight="0,5"
                image="assets/img/photo2x.png"
                descr={<div><strong>10</strong> порций<br/>мышь в подарок</div>} 
                />
            
            </div>
            
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-item">

            	<Item 
                subtitle="Сказочное заморское яство" 
                title="Нямушка" 
                taste="с рыбой" 
                bottomTextSelected="Головы щучьи с чесноком да свежайшая сёмгушка." 
                weight="2"
                image="assets/img/photo2x.png"
                descr={<div><strong>40</strong> порций<br/><strong>2</strong> мыши в подарок</div>} 
                />

            </div>
            
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-item">
                
                <Item 
                disabled="true"
                subtitle="Сказочное заморское яство" 
                title="Нямушка" 
                taste="с курой" 
                bottomTextSelected="Филе из цыплят с трюфелями в бульоне." 
                weight="5"
                image="assets/img/photo2x.png"
                descr={<div><strong>100</strong> порций<br/><strong>5</strong> мышей в подарок<br/>заказчик доволен</div>} 
                />
            
            </div>
        </div>
        </div> 
        );
    }
}

export default App;