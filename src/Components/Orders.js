import React from "react";
import axios from "axios";
import '../Styles/orders.css';

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            subTotal: 0
        }
    }
    componentDidMount() {

        axios({
            method: 'GET',
            url: "http://localhost:4578/product",
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {
                this.setState({ products: response.data.products })
            })
            .catch(err => console.log(err));
    }
    addItems = (item,operationType) => {
        let total = 0;
        

        if (operationType == 'add') {
            item.qty++;
        }
        else {
            item.qty--;
        }
            total += item.qty * item.price;
      
        this.setState({ products: item, subTotal: total });
    }
    render() {
        const { products,subTotal } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h2 className="tct"> Orders Details </h2>

                        {products.find((pname,item) => {
                            return <div className="card mb-3 cardo" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={`./${item.image}`} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body" style={{ margin: "16px 0 0 62px;" }}>
                                            <h5 className="card-title">Product Name :{item.name}</h5>
                                            <p className="card-text">SubTotal : {item.price}</p>
                                            {item.qty == 0 ? <div>
                                                <button className="btn btn-danger me-2" onClick={() => this.addItems(pname,'add')}>Add Products</button>
                                            </div> :
                                                <div className="add-number">
                                                    <button onClick={() => this.addItems(pname,'subtract')} className="aditems">-</button>
                                                    <span class="qty">{item.qty}</span>
                                                    <button onClick={() => this.addItems( pname,'add')} className="aditems">+</button>
                                                </div>}
                                            <button className="btn btn-success"> Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
<h4></h4>

                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;