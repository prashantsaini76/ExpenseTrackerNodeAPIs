const Expense = require('../model/Expense');

const getAllExpenses = async (req, res) => {
    const expenses = await Expense.find({ userId: req.user });
    if (!expenses) return res.status(204).json({ 'message': 'No Expenses found' });
    res.json(expenses);
}


const createNewExpense = async (req, res) => { 

    console.log("LOG REQUEST", req.body)
    try {
        const newExpense = new Expense({
          userId: req.user,
          date: req.body.date,
          transferMode: req.body.transferMode,
          bankName: req.body.bankName,
          item: req.body.item,
          amount: req.body.amount
        });

       
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
      } catch (error) {
        res.status(500).send({ message: 'Error adding expense', error: error.message });
      }

      
}

const deleteExpense = async (req, res) => {
    try {
      const result = await Expense.findOneAndDelete({ _id: req.body.id, userId: req.user });

      console.log("Delete Request", req.body)
      if (result) {
        res.json({ message: 'Expense deleted successfully' });
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error deleting expense', error: error.message });
    }
  }


const updateExpense = async (req, res) => {
    try {
      const updatedExpense = await Expense.findOneAndUpdate(
        { _id: req.body.id, userId: req.user },
        {
            
          date: req.body.date,
          transferMode: req.body.transferMode,
          bankName: req.body.bankName,
          item: req.body.item,
          amount: req.body.amount
        },
        { new: true }
      );
      if (updatedExpense) {
        res.json(updatedExpense);
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error updating expense', error: error.message });
    }
  }

  module.exports = {
    getAllExpenses,
    createNewExpense,
    deleteExpense,
    updateExpense

}



