const App = React.createClass({
  getInitialState() {
    return {
      transactions: [],
      balance: 0.00,
      editTransaction: '',
      currentEdit: ''

    }
  },

  addNewTransaction(newTransaction) { // argument is the new transaction that was passed from prop in component
    let {transactions} = this.state;
    this.setState({
      transactions: [...transactions, newTransaction],
      balance: this.updateBalance
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

  editTransaction(curr) {
    let {transactions} = this.state;
    console.log(curr.getId);
    this.setState({
      editTransaction: '',
      currentEdit: curr.id
    });
  },

  updateBalance() {
    let total = 0;
    let {transactions} = this.state;
    if (getElementById("debitRadio").checked) {
      console.log("debit");
    } else if (getElementById("creditRadio").checked){
      console.log("credit");
    }
    
  },

  render() {

    const {transactions, balance, editTransaction} = this.state;
  console.log("this is current Edit: ", this.state.currentEdit);

    return (
       <div>
        <h1 id="title">My Awesome Bank</h1>
        <h4 className="text-right">Money in the Bank: <span id="balance" ref="balance">$ {balance}</span></h4>
        <TransactionForm addNewTransaction = {this.addNewTransaction}  />
        <TransactionTable transactions = {transactions}  editedTransaction = {this.editTransaction} removeTransaction = {this.removeTransaction} />
      </div>
      )
  }
}); // end of App component




//Table renders creates new rows and has the Modal functionality
const TransactionTable = React.createClass( {
   getInitialState() {
    return {
    editName: '',
    editAmount: '',
    getId: ''
    }
  },

  getName(e) {
    let name = e.target.value; //editForms name value
    console.log("name", name);
    this.setState({
      editName: name
    });
   
  },

  getAmount(e) {
    let amount = e.target.value; //editForms amount value
     this.setState({
      editAmount: amount
     });

    },

    setNewEdit() {
      
    },

    getId(id) {
      let {getId} = this.state;
       let currId = id;
      this.setState({
        getId: currId
      });
    console.log(currId);
      
    },

    makeEdit() {
      let {transactions} = this.state;
      let newEdit  = {
        editName: this.state.editName,
        editAmount: this.state.editAmount,
        editId: this.state.editId
        
    } //end of newEdit object
console.log("THis is newEdit: ", newEdit);
    
   this.props.editedTransaction(newEdit);
      
  },
  
    render() {
      
    const {transactions, removeTransaction, editTransaction, childState} = this.props;
  return (

  <div>
    <div id="editModal" className="modal fade" role="dialog" >
      <div className="modal-dialog">
      <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Edit Transaction</h4>
      </div>
      <div className="modal-body">
        <div className="form-group row" id="inputsGroup">
            <label htmlFor="transactionIn">Transaction </label>
            <input type="text" name="" ref="nameInEdit" id="nameInEdit" onChange={this.getName} />
            <label htmlFor="priceIn">Amount $</label>
            <input type="number"  ref="amountInEdit" step="0.01" id="amountInEdit" onChange={this.getAmount}/>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" >Save</button>
      </div>
    </div>

  </div>
</div>
    <table className="table">
      <thead>
        <tr className="col-xs-12 row">
          <th className="col-xs-4 text-center">Name</th>
          <th className="col-xs-2 text-center">Amount</th>
          <th className="col-xs-2 text-center">Date</th>
          <th className="col-xs-2 text-center">Edit</th>
          <th className="col-xs-2 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
      {transactions.map((transaction) => // maps through transactions
        (
        <tr className="col-xs-12 row" key={transaction.id} id= {transaction.id}>
          <td className="col-xs-6 text-center">{transaction.name}</td> 
          <td className="col-xs-2 text-center">${transaction.amount}</td>
          <td className="col-xs-2 text-center">{moment().format("MMM Do YY")}</td>
          <td className="col-xs-2 text-center"><button id="editBtn" className="btn btn-success btn-md" data-toggle="modal" data-target="#editModal" value={transaction.id} onClick={() => this.getId(transaction.id)} ref="editBtn">Edit</button></td> 
          <td className="col-xs-2 text-center"><button id="del" className="btn btn-danger btn-md" onClick={removeTransaction.bind(null, transaction.id)}>X</button></td>
        </tr>
        ) //end of return
      ) //end of map
    } 
      </tbody>

    </table>
  </div>
    ) //end of return 
}
}); //end of TransactionTable component 










 //Transaction form
const TransactionForm = React.createClass({
  

  submitForm(e) {
    e.preventDefault();
    let {transactionIn, amountIn} = this.refs;
    let transaction = {   // On Submit a NEW transaction is created 
      name: transactionIn.value, 
      amount: parseFloat(amountIn.value),
      id: Date.now(),
      balance:parseFloat(amountIn.value),
      debit: amountIn.value * -1,
      credit: amountIn.value
    };


  
    this.props.addNewTransaction(transaction); //Sends the new transaction created to App.addNewTransaction with 'transaction' as the argument
    // console.log("unique ID for this transaction: ", transaction.id);
    // console.log("current Debit: ", transaction.debit);
    // console.log("current credit: ", transaction.credit);
  },




  // debit (){

  //   let {transactionIn, amountIn} = this.refs;
  //     let debit = {
  //       debit: amountIn.val * -1,
  //     }
  //     this.props.addNewTransaction{}
  //   },

  //   credit() {
  //     transaction.credit = true;
  //   },

  render() {
    return (
     <form action="" id="transForm" className="col-xs-12" onSubmit={this.submitForm}>
          <div className="form-group row" id="inputsGroup">
            <label htmlFor="transactionIn">Transaction </label>
            <input type="text" name="hi" ref="transactionIn" id="transactionIn" />
            <label htmlFor="priceIn">Amount $</label>
            <input type="number"  ref="amountIn" step="0.01" id="amountIn" />
          </div>
          <div className="form-group  row" id="radioGroup">
            <label htmlFor="debitIn">Debit</label>
            <input type="radio" name="debitcredit" id="debitRadio" onChange={this.debit}/>
            <label htmlFor="creditIn">Credit</label>
            <input type="radio" name="debitcredit" id="creditRadio" onChange={this.credit}/>
            <button className="btn btn-primary btn-md">Add</button>
          </div>
     </form>
    ) //end of return
  } // end of render
}) // end of TransactionForm Component



ReactDOM.render(
  <App />, document.getElementById("root")
); 