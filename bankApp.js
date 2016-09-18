const App = React.createClass({
  getInitialState() {
    return {
      transactions: [],
      balance: 0.00
    }
  },

  addNewTransaction(newTransaction) {
    let {transactions} = this.state;
     
    this.setState({
      transactions: [...transactions, newTransaction]
    });
   
  },

  removeTransaction(id) {
    console.log("transaction removed: ", id );
    let {transactions} = this.state; //array of current transactions
    this.setState({
      transactions: transactions.filter(transaction => transaction.id !== id //removes only the transaction that matches the unique id

      ) //end of filter
    }); //end of setState
  }, 
  editTransaction() {
  },

  updateBalance() {
    let {transactions} = this.state;
    if (getElementById("debitRadio").checked) {
      console.log("debit");
    } else if (getElementById("creditRadio").checked){
      console.log("credit");
    }
    
  },

  render() {
    const {transactions, balance} = this.state;
    
    return (
       <div>
        <h1 id="title">My Awesome Bank</h1>
        <h4 className="text-right">Money in the Bank: <span id="balance" ref="balance">$ {balance}</span></h4>
        <TransactionForm addNewTransaction = {this.addNewTransaction} />
        <TransactionTable transactions = {transactions} removeTransaction = {this.removeTransaction}/>
      </div>
      )
  }
}); // end of App component

const TransactionTable = props => {
    const {transactions, removeTransaction} = props;
  return (
    <table className="table">
      <thead>
        <tr className="col-xs-12 row">
          <th className="col-xs-6 text-center">Name</th>
          <th className="col-xs-2 text-center">Amount</th>
          <th className="col-xs-2 text-center">Edit</th>
          <th className="col-xs-2 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
      {transactions.map((transaction) => 
        (
        <tr className="col-xs-12 row" key={transaction.id}>
          <td className="col-xs-6 text-center">{transaction.name}</td>
          <td className="col-xs-2 text-center">${transaction.amount}</td>
          <td className="col-xs-2 text-center"><button id="editBtn" className="btn btn-success btn-md">Edit</button></td>
          <td className="col-xs-2 text-center"><button id="del" className="btn btn-danger btn-md" onClick={removeTransaction.bind(null, transaction.id)}>X</button></td>
        </tr>
        ) //end of return
      ) //end of map
    } 
      </tbody>

    </table>
    )
}; //end of TransactionTable component 

const TransactionForm = React.createClass({
  submitForm(e) {
    e.preventDefault();
    let {transactionIn, amountIn} = this.refs;
    let transaction = {
      name: transactionIn.value, 
      amount: parseFloat(amountIn.value),
      id: Date.now(),
      balance:parseFloat(amountIn.value)
    };
  
    this.props.addNewTransaction(transaction);
    console.log("unique ID for this transaction: ", transaction.id);
  },

  render() {
    return (
     <form action="" id="transForm" className="col-xs-12" onSubmit={this.submitForm}>
          <div className="form-group row" id="inputsGroup">
            <label htmlFor="transactionIn">Transaction </label>
            <input type="text" name="" ref="transactionIn" id="transactionIn" />
            <label htmlFor="priceIn">Amount $</label>
            <input type="number"  ref="amountIn" step="0.01" id="amountIn" />
          </div>
          <div className="form-group  row" id="radioGroup">
            <label htmlFor="debitIn">Debit</label>
            <input type="radio" name="debitcredit" id="debitRadio" onChange={this.updateBalance}/>
            <label htmlFor="creditIn">Credit</label>
            <input type="radio" name="debitcredit" id="creditRadio" onChange={this.updateBalance}/>
            <button className="btn btn-primary btn-md">Add</button>
          </div>
     </form>
    ) //end of return
  } // end of render
}) // end of TransactionForm Component

const modol = React.createClass({ //I'll use this to edit transactions
  getInitialState(){

  },

  render() {

  }

}); // end of modol component


ReactDOM.render(
  <App/>, document.getElementById("root")
); 