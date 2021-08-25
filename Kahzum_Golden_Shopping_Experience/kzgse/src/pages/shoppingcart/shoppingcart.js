import React from 'react';
import '../../App.css';
import '../../App.sass';
import {
  Redirect,
} from "react-router-dom";
import axios from 'axios'

var FormData = require('form-data')




class ShoppingCartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          name:'',
          phoneNumber:'',
          email:'',
          shoppingCart:[]

        }
    }


    componentDidMount(){
      var cart = localStorage.hasOwnProperty('cart') ? JSON.parse(localStorage.cart) : []
      console.log(cart)
      this.setState({shoppingCart: cart})
      
    }

    aggregate(arr){
      let agg = {}
      arr.forEach((item)=>{
        var store = item.store
        agg[store] ? agg[store].push(item) : agg[store] = [item]
        
      })
      
      return agg;
    
    }

    removeAfterPurchase = (buyItems) => {
      buyItems.forEach(item => {
        this.deleteItem(item.key)
      })

    }
    
    //this needs modularization
    purchaseItem = async (buyItems) => {
      if(this.state.email === ""){ //add this.state.email when its used
        alert("Please enter address")
        return}
      console.log('buyItems: ', buyItems[0])
      var formatitems={}
      buyItems.forEach(async item => {
        console.log(item.price)
        formatitems[item.name.replace("\n", "")]=[item.price.replace("\n", "").replace("$", ""), item.count]
      })
      console.log(formatitems)
      var invoiceID=''
      // var format=JSON.stringify(formatitems)
      var urlbus = 'http://13.57.233.151/invoice/add-invoice'
      await axios.post(urlbus, {email:"ramissir@ucsc.edu"}).then(async (res) => {
        console.log(res)
        if(res.data.hasOwnProperty('_id')){
          var urlbus = 'http://13.57.233.151/invoice/add-items'
          invoiceID=res.data._id
          await axios.post(urlbus, {"invoiceID":res.data._id,"items":formatitems}).then((res) => {
            console.log("second time", res)
          })
          console.log("interim")
          var urlbus = 'http://13.57.233.151/invoice/attach-address'
          await axios.post(urlbus, {"invoice":invoiceID,"address":this.state.email}).then((res) => {
            console.log("third time", res)
          })
        } else{
          alert('something wrong')
        }

      }).catch(function(err){
        console.log(err)
      })
      // const itemPayload = JSON.stringify(buyItems)
      // const store = buyItems[0].store
      // console.log(itemPayload)
      // this.props.history.replace('http://13.57.233.151/'+invoiceID)
      window.location.replace('pay.kahzap.com/'+invoiceID)
      
      // if(this.state.name === "" || this.state.phoneNumber === ""){ //add this.state.email when its used
      //   alert("Please enter name")
      // }else{
      //   let data = new FormData();
      //   data.append('items', itemPayload)
      //   data.append('store', store)
      //   data.append('name', this.state.name)
      //   //debug
      // //   for (var pair of data.entries()) {
      // //     console.log(pair[0]+ ', ' + pair[1]); 
      // //    }
        
      //   let msg = "Hey " + this.state.name + "! Your order of"
      //   let items = ""
      //   buyItems.forEach((item) => {
      //     console.log(item.name)
      //     if(item.hasOwnProperty('color')){
      //       items = items + item.color + ' '
      //     }
      //     if(item.hasOwnProperty('size')){
      //       items = items + item.size + ' '
      //     }
      //     items = items + item.name + ' '
      //   })
      //   msg = msg + ' ' + items + 'is on the way!'
      //   console.log('customer msg: ', msg)
      //   const url = 'https://cn3qjkxqxj.execute-api.us-west-2.amazonaws.com/production/send_msg?message=' + msg + '&number=' + this.state.phoneNumber + '&subject=' + this.state.name.replace(/\s/g, '') + 'Order'
      //   await axios.get(url).then((res) => {
      //     console.log(res)
      //     if(!res.data.hasOwnProperty('MessageID')){
      //       alert('something wrong')
      //     }
  
      //   }).catch(function(err){
      //     console.log(err)
      //   })
  
      //   msg = "New order for " + this.state.name + "!"
      //   msg = msg + ' ' + items + 'needs to be ready! Contact info for customer is: ' + this.state.phoneNumber
      //   //send to business
      //   console.log('business msg: ', msg)
      //   const urlbus = 'https://cn3qjkxqxj.execute-api.us-west-2.amazonaws.com/production/notify_store?message=' + msg + '&store=' + store + '&subject=' + this.state.name.replace(/\s/g, '') + 'Order'
      //   await axios.get(urlbus).then((res) => {
      //     console.log(res)
      //     if(res.data.hasOwnProperty('MessageID')){
      //       this.removeAfterPurchase(buyItems)
      //       this.setState({itemsToBuy:buyItems,buy:true})
      //     } else{
      //       alert('something wrong')
      //     }
  
      //   }).catch(function(err){
      //     console.log(err)
      //   })

      // }


    }

    setName = (event)=>{
      this.setState({name:event.target.value})
    }

    setPhoneNumber = (event)=>{
      this.setState({phoneNumber:event.target.value})
    }

    setEmail = (event) => {
      this.setState({email:event.target.value})
    }

    //don't think we need this anymore
    onBuy = (itemsToBuy) =>{
     
      

    }

    deleteItem = (remove)=>{
      let cart = this.state.shoppingCart
      let newCart = cart.filter((item) => 
      item.key !== remove
      )
      this.setState((state) =>
      {
        return({shoppingCart: newCart})
      })
      
      localStorage.setItem('cart', JSON.stringify(newCart))
    }

    //no longer needed?
    deleteStore = (remove)=>{
      
      this.setState((state) =>
      {
        let cart = state.shoppingCart
        let filt = cart.filter((item) => 
        item.store !== remove
        )
        return({shoppingCart: filt})
      })
      

    }

    deleteStore//??wat iz dis

    render(){
      if(this.state.buy){
        return(
          <Redirect to= {{
        
            pathname:'/confirmation',
            state: {id: this.state.itemsToBuy }
          }} />
        )
      }
        return(
          
    <div>
      
       
      <div className = 'hero is-primary' >
        <div className ="container">
          <div className = "hero-body">
                <h1 className = "title">Shopping Cart
               </h1>
                <h2 className ='subtitle'>Enter information and click "purchase"</h2>
          </div>
        </div>
        
      </div>
      
      
      {/* <div className = 'section'> */}
        {/* <div className = "notification is-dark">
          Please add a 1 to your phone number.
          After you click 'Purchase', your name, and phone number will be sent to store owner, along with the items you want to buy.
        </div> */}
        {/* <div className = 'container'> 
        <div className = 'field is-horizontal'>
            <div className = 'field-label'>
              <label className="label">Name</label>
            </div>
            <div className = 'field-body'>
              <div className="control">
                  <input className="input" type="text" placeholder="Text input" onChange={this.setName}/>
              </div>
            </div>
          </div> */}
          {/* <div className = 'field is-horizontal'>
            <div className = 'field-label'>
              <label className="label">Phone number</label>
            </div>
            <div className = 'field-body'>
              <div className="control">
                  <input className="input" type="text" placeholder="Text input" onChange={this.setPhoneNumber}/>
              </div>
              </div>
            </div> */}
            {/* <div className = 'field is-horizontal'>
              <div className = 'field-label'>
                <label className="label">Email</label>
              </div>
              <div className = 'field-body'>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" onChange={this.setEmail}/>
                </div>
              </div>
            </div> */}
        {/* </div> */}
        {/* </div> */}
          
        <div className = 'section'>

        


        <div className = 'container'>
        <div className = "notification is-offwhite">Address
                  <div className = 'field is-horizontal'>
              <div className = 'field-body'>
                <div className="control">
                    <input className="input" type="text" placeholder="Delivery Address Here" onChange={this.setEmail}/>
                </div>
              </div>
            </div>
            </div>
          <div className = "columns">
              <div className = 'column'>

              {
                
              Object.keys(this.aggregate(this.state.shoppingCart)).map((store) =>{
                var agg = this.aggregate(this.state.shoppingCart);
                var storeIts = agg[store];
                return (
                  <div className='box' key={store}>
                    
                  <h2 className ="is-size-2">{store}</h2> {/*<button className="delete is-large" onClick={()=>this.deleteStore(store)}></button>  don't think we need to delete a store?*/}
                  {storeIts.map((item) =>{
                  return (
                    <div className = "content" key={item.key}>
                      
                        <h3 > <button className="delete is-medium" onClick={()=> this.deleteItem(item.key)}></button> {item.name} </h3>
                        <h4>{item.price} x{item.count}</h4>
                        <img src={item.url} alt={item.name} style={{height: '200px'}}/>   
                    </div>                  
                  )})}
                  
                  <button className = 'button is-link is-fullwidth is-medium' onClick={()=> this.purchaseItem(storeIts)}>Purchase</button>

                  </div>
                  
                )
              })}
             
                
              </div>
          </div>  
        </div>
        </div>  
            </div>
        )
    }
}



export default ShoppingCartPage;