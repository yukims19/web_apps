import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import Lightbox from 'react-images';
import sortBy from 'array-sort-by';


let photo_id = 5;
 // displayed photos in Array	
let photos = [
        {
          alt: "cat",
          src: require("./cat.jpg"),
          caption: 'Cat Jumping!',
          id: 1
        },
        {
          alt: "ball",
          src: require("./ball.jpg"),
          caption: 'Ball shining!',
          id: 2
        },
        {
          alt: "ball",
          src: require("./ball.jpg"),
          caption: 'Ball shining!',
          id: 3
        },
        {
          alt: "earth",
          src: require("./earth.jpeg"),
          caption: 'Earth!',
          id: 4
        },
        {
          alt: "light",
          src: require("./light.jpeg"),
          caption: 'Light!',
          id: 5
          
        }
  ];
  	/*<img style= {small_style} src={require("./cat.jpg")} />
     <img style= {small_style} src={require("./ball.jpg")}/>
     <img style= {small_style} src={require("./ball.jpg")}/>
     <img style= {small_style} src={require("./earth.jpg")}/>
     <img style= {small_style} src={require("./light.jpeg")}/>*/
 

//store uploaded urls
//const urls =["./cat.jpg"];


//Big and Small display styles
const small_style = {
			width: "auto",
			minWidth: "10%",
			height: "50%",
			padding:"1%"};
const big_style={
	width: "auto",
	minWidth: "10%",
	height: "100%",
	padding:"1%"};



 
 class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

     _handleImageChange(e) {

    let reader = new FileReader();
    let file = e.target.files[0];

         reader.onloadend = () => {
             photo_id=photo_id+1;
        photos.push(
				    {src: reader.result,
				     alt: "uploaded",
				     caption: file.name+"--File size:"+file.size/1000+"KB "+ new Date(),
             		 id: photo_id
            }
				)

        this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

  }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div style={{height:"100%"}} className="uploadComponent">
        <form style={{height:"100%"}}>
          <label> Welcome! Click here to upload
          <input className="fileInput" 
        type="file" style={{ width:"100%", height:"100%", opacity:"0", cursor:"pointer"}}
            onChange={(e)=>this._handleImageChange(e)} />
            </label>
        </form>
        <div className="Photo_button" style={{marginTop: "45px"}}>
            <SBbutton />
        </div>
      </div>
    )
  }
}
     

// Button to change display size
class SBbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isImgBig: true, isAcs: true, isNewest: true};

    // This binding is necessary to make `this` work in the callback
    //this.handleClick = this.handleClick.bind(this);
    //this.sortImg=this.sortImg.bind(this);
    //this.sortNewest=this.sortNewest.bind(this);
  }

  handleClick=()=> {
    this.setState(prevState => ({
      isImgBig: !prevState.isImgBig
    }));
  }
  sortImg=()=>{
  	this.setState(prevState => ({
      isAcs: !prevState.isAcs
    }));
  	}
  sortNewest=()=>{
    this.setState(prevState => ({
      isNewest: !prevState.isNewest
    }));
  }
  		
	
  render() {
  	let pictures=null;
  	if (this.state.isImgBig){
      	pictures = <Photosmall />
      	}else{
      	pictures = <Photosbig />}
    if (this.state.isAcs){
       sortBy( photos, item=> item.src);
       }else{
       	sortBy( photos, item=> "DESC:" + item.src);
       }
       
    if (this.state.isNewest){
    	sortBy( photos, item=>item.id);
    	}else{
    	sortBy(photos, item=>  "DESC:" + item.id);
    		}
    		
    return (
     <div>
    	<div className = "buttons">
      <button className="button" onClick={this.handleClick}>
        {this.state.isImgBig ? 'Big' : "Small" }
      </button>
      <button className="button" onClick={this.sortImg}>
      	{this.state.isAcs ? 'Des' : "Acs" }
	  </button>
		<button className="button" onClick={this.sortNewest}>
		{this.state.isNewest ? 'Newest' : 'Oldest'}
		</button>
		</div>
            <div style={{overflowY:"scroll"}}>
        {pictures}
        </div>
      	</div>
      
    );
  }
}


//Small display  with light box function
class Photosmall extends Component{
	
   constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }
	
	closeLightbox = () =>{
		this.setState({isOpen: false});
		}
	
	gotoPrevious=()=>{
		this.setState({
			photoIndex: this.state.photoIndex -1})}
	
	gotoNext=()=>{
		this.setState({
			photoIndex: this.state.photoIndex+1})}
	
	openBox=()=>{
		this.setState({
			isOpen: true})}		
			
	
    render() {
        const {
            photoIndex,
            isOpen,
        } = this.state;

        
  	const photo_display = photos.map((item) => <img key= {item.id} onClick = {this.openBox} id="images" style = {small_style} src= {item.src} alt= {item.alt} />);
    
    return (
    <div className ="Photo">
    	{photo_display}
    	
    	{isOpen &&
                    <Lightbox
        images={photos}
        currentImage={this.state.photoIndex}
        isOpen={this.state.isOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
                }
    	</div>);
      
}
}
//Big display with light box function
class Photosbig extends Component{

	constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }
	
	closeLightbox = () =>{
		this.setState({isOpen: false});
		}
	
	gotoPrevious=()=>{
		this.setState({
			photoIndex: this.state.photoIndex -1})}
	
	gotoNext=()=>{
		this.setState({
			photoIndex: this.state.photoIndex+1})}
	
	openBox=()=>{
		this.setState({
			isOpen: true})}		
			
	
    render() {
        const {
            photoIndex,
            isOpen,
        } = this.state;
        
        
  	const photo_display = photos.map((item) => <img key= {item.id} onClick = {this.openBox.bind(this)} id="images" style = {big_style} src= {item.src} alt= {item.alt} />);
    
    return (
    <div className ="Photo">
    	{photo_display}
    	
    	{isOpen &&
                    <Lightbox
        images={photos}
        currentImage={this.state.photoIndex}
        isOpen={this.state.isOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
                }
        </div> );
}
}



class App extends Component {
  render() {
      return (
      <div className="App">
        <div className="App-uploader">
          <ImageUpload/>
		</div>
      </div>
    );
  }
}

//<SBbutton />
export default App;
//export default Photos;
//ReactDOM.render(<Photos />, document.getElementById('app'));
