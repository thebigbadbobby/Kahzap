import React from 'react';
import '../../App.css';
import '../../App.sass';
import axios from 'axios'
import {
    Redirect,
  } from "react-router-dom";
import { uuid } from 'uuidv4';
import {
    // Container,
    // Typography,
    // Input,
    // FormHelperText,
    // Select,
    // MenuItem,
    // Card,
    // CardContent,
    Button,
  } from "@material-ui/core";
  import Forward from "@material-ui/icons/ArrowForward";
  import Backward from "@material-ui/icons/ArrowBack";
  import {MdShoppingCart} from 'react-icons/md'
class ItemPage extends React.Component{
    constructor(props){
        // const host = window.location.hostname;
        super(props);
        this.state = {
            store:'',
            itemID:'',
            name:'',
            imageURL:'',
            desc:'',
            price: null,
            count:0,
            quantity:1,
            color:'',
            loading: true,
            size:'',
            slidenum: 3,
            slidelist: [],
            otherInfo:[],
            redirect:false,
        }
        //this allows for the access of this.props
        this.addCart = this.addCart.bind(this)
        this.redirectToCart = this.redirectToCart.bind(this)
        this.handleChangeColor = this.handleChangeColor.bind(this)
        this.handleChangeSize = this.handleChangeSize.bind(this)
    }

    // ErrorFallback({error, resetErrorBoundary}) {
    // return (
    //     <div role="alert">
    //     <p>Something went wrong:</p>
    //     <pre>{error.message}</pre>
    //     <button onClick={resetErrorBoundary}>Try again</button>
    //     </div>
    // )
    // }

    checkCart(){
        const store = this.props.match.params.store
        if(localStorage.hasOwnProperty('cart')){
            let data = JSON.parse(localStorage.cart)
            if(data[0].store !== store){
                localStorage.removeItem('cart')
            }

        }

    }

    async getData(){
        //set store and itemID in app state then fetch data 
        await this.setState({store: this.props.match.params.store, itemID: this.props.match.params.itemID})
        let url = 'https://raw.githubusercontent.com/thebigbadbobby/productpics/main/'+this.props.match.params.store+'/'+this.props.match.params.itemID+'/name'
        axios.get(url).then((res) => {
            console.log(res)
            //do the get request using axios and then check if res.data isn't empty
            if(res.status==200){
                // const infoObj = res.data.Item.info
                // console.log(res.data.Item.info)
                // console.log(this.state.slidenum)
                // for(let key in infoObj){
                //     //each product will have name, image and price for sure and the rest of the information is in the default case which is stored in the otherInfo array
                //     switch(key){
                //         case "name":
                //             this.setState({name: infoObj[key]})
                //             break
                //         case "image":
                //             this.setState({imageURL: infoObj[key]})
                //             break
                //         case "price":
                //             this.setState({price: infoObj[key]})
                //             break
                //         case "desc":
                //             this.setState({desc: infoObj[key]})
                //             break
                //         case "slidelist":
                //             this.setState({slidelist: infoObj[key]})
                //             break
                //         default:
                //             console.log(key)
                //             const name = key
                //             console.log(infoObj[key])
                //             let listOfExtras = this.state.otherInfo
                //             let objItem = {
                //                 [name]: infoObj[key],
                //             }
                //             listOfExtras.push(objItem)
                //             console.log(listOfExtras)
                //             this.setState({otherInfo: listOfExtras})
                //             break
                //     }
                // }
                url = 'https://raw.githubusercontent.com/thebigbadbobby/productpics/main/'+this.props.match.params.store+'/'+this.props.match.params.itemID+'/name'
                axios.get(url).then((res) => {
                    this.setState({name: res.data})
                })
                url = 'https://raw.githubusercontent.com/thebigbadbobby/productpics/main/'+this.props.match.params.store+'/'+this.props.match.params.itemID+'/price'
                axios.get(url).then((res) => {
                    this.setState({price: res.data})
                })
                url = 'https://raw.githubusercontent.com/thebigbadbobby/productpics/main/'+this.props.match.params.store+'/'+this.props.match.params.itemID+'/desc'
                axios.get(url).then((res) => {
                    this.setState({desc: res.data})
                })
                url = 'https://raw.githubusercontent.com/thebigbadbobby/productpics/main/'+this.props.match.params.store+'/'+this.props.match.params.itemID+'/1.png'
                this.setState({imageURL: url})
            }else{
                alert('uh oh this url is bad whoops, redirecting you to the cart!')
                // this.setState({redirect:true})
                this.props.history.push('/404/')
            }
        }).catch(function (error) {
            console.log(error);
            alert("This product doesn't exist! Click ok to go back to cart.")
                // this.setState({redirect:true})
            window.location.replace('http://localhost:8081/cart')
        })

    }

    componentDidMount(){
        console.log(this.props.match.params.store)
        console.log(this.props.match.params.itemID)
        // this.checkCart()
        this.getData()
    }

    handleChangeColor(e){
        const newColor = e.currentTarget.value
        this.setState({color: newColor})

    }

    handleChangeSize(e){
        this.setState({size: e.currentTarget.value})
    }
    redirectToCart(e){
        e.preventDefault()
        console.log(this.props)
        this.props.history.push('/cart/')
    }

    //adds item to local storage and then changes to cart
    addCart(e){
        e.preventDefault()
        //obj is the object stored in localStorage which has information
        let isGood = true
        this.state.otherInfo.map((item) => {
            const key = Object.keys(item)
            if(key[0] === 'Colors'){
                if(this.state.color === ''){
                    alert('Select color please')
                    isGood = false
                }
            }
            else if(key[0] === 'Size'){
                if(this.state.size === ''){
                    alert("Select Size please")
                    isGood = false
                }
            }
            return null
        })

        if(isGood){
            if(localStorage.hasOwnProperty('cart')){
                console.log('cart detected')
                let oldData = JSON.parse(localStorage.cart)
                console.log('oldData ', oldData)
                let data = []
                // data = oldData
                if(!Array.isArray(oldData)){
                    console.log('no array reee')
                    data.push(oldData)
    
                }else{
                    data = oldData
                }
                console.log('data here is ', data)
                const obj = {
                    count: this.state.quantity,
                    url: this.state.imageURL,
                    price: this.state.price,
                    name: this.state.name,
                    store: this.state.store,
                    key: uuid()
                }
                if(this.state.color !== ''){
                    obj.color = this.state.color
                }
                if(this.state.size !== ''){
                    obj.size = this.state.size
                }
                data.push(obj)
                localStorage.setItem("cart", JSON.stringify(data))
    
            } else{
                console.log('cart not detected adding cart')
                const obj = {
                    count:this.state.quantity,
                    url: this.state.imageURL,
                    price: this.state.price,
                    name: this.state.name,
                    store: this.state.store,
                    key: uuid()
        
                }
                if(this.state.color !== ''){
                    obj.color = this.state.color
                }
                if(this.state.size !== ''){
                    obj.size = this.state.size
                }
                let data = []
                data.push(obj)
                localStorage.setItem("cart", JSON.stringify(data))
    
            }
            //redirects to /cart page
            this.props.history.push('/cart/')
            // this.setState({redirect:true})

        }

       
    }
    
    setQuantity = (event)=>{
        this.setState({quantity: event.target.value})
      }

    render(){
        //displays information and button which you can click on
        if(this.state.redirect){
            return(
                <Redirect to= {{
                    pathname:'/cart/',
                }} />
              )
                
        }
        return(
            <div>
                <div className = 'hero is-primary' >
                    <div className ="container">
                        <div className = "hero-body">
                            <h1 className = "title is-left">
                                ShopLink
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="columns" style={{paddingBottom:'100px'}}>
                    <div className = "column is-4 ">
                        <div className="content">
                            
                            <div className = "notification">
                                <br></br>
                                <h1  className='is-size-1'>{this.state.store}</h1>
                                <h2 className='is-size-3'>{this.state.name}</h2>
                                <p className='is-size-4'> {this.state.price}</p>
                                <p className='is-size-5'> {this.state.desc}</p>
                                <br></br>
                                Quantity
                                    <div className = 'field-body'>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. 2" onChange={this.setQuantity}/>
                                        </div>
                                    </div>
                                <Button variant="contained" color="warning" className="button is-primary is-large is-warning mt-6" onClick={this.addCart}>Add To Cart</Button>
                                <span style={{margin: '5px'}}></span >
                                <Button variant="contained" color="warning" className="button is-large is-info mt-6" onClick={this.redirectToCart} style={{marginTop: '10px'}}><MdShoppingCart size={60} /></Button> 
                            </div>
                            {this.state.otherInfo ? this.state.otherInfo.map((item) => {
                                const key = Object.keys(item)
                                if(key[0] === 'Colors'){
                                    return(
                                        <div key={key}>
                                            <p>{key}</p>
                                            <div className='select'>
                                                <select onChange={this.handleChangeColor}
                                                value={this.state.color}
                                                >   
                                                    <option value='' key= ''></option>
                                                    {item[key].map((items) => {
                                                        return(
                                                            <option value={items} key={items}>{items}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        )
                                    
                                    
                                }else if(key[0] === 'Size'){
                                    return(
                                        <div key={key}>
                                            <p>{key}</p>
                                            <div className='select'>
                                                <select onChange={this.handleChangeSize}
                                                value={this.state.size}
                                                >   <option value='' key= ''></option>
                                                    {item[key].map((items) => {
                                                        return(
                                                            <option value={items} key={items}>{items}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        )

                                }

                                return null


                                
                                // <div className='select'>
                                //     <p></p>

                                // </div>
                                //
                            }): null}
                        </div>
                        
                    </div>
                    {this.state.slidenum<10&this.state.slidenum>0&this.state.loading?
                    <div className="column is-two-thirds">    
                        <figure >
                            <img src={`https://raw.githubusercontent.com/thebigbadbobby/productpics/main/${this.props.match.params.store}/${this.props.match.params.itemID}/${this.state.count+1}.png`} alt={this.state.name} onError={()=>{this.setState({loading: false})}}/>   
                        </figure>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {this.setState({count: (this.state.count-1+this.state.slidenum)%this.state.slidenum})}}
                            startIcon={<Backward />}
                        >  
                        </Button>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {this.setState({count: (this.state.count+1)%this.state.slidenum})}}
                        startIcon={<Forward />}
                        >
                        </Button>
                        <div className="is-right">
                        
                        </div>
                    </div>
                    :
                    <div className="column is-3">    
                        <figure >
                            <img src={this.state.imageURL} alt={this.state.name}/>   
                        </figure>
                    </div>   
                    }
                
                </div>

        
              

                
              
            </div>
            
            
                 
            
        )
    }


}

export default ItemPage;