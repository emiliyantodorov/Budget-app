export class User {
    constructor() {
        this.budget = 0;
        this.expenses = 0;
        this.balance = 0;
    }

    updateBudget(money, type) {
        if (!type) {
            return this.budget += money;
        }
        return this.budget -= money;
    }

    updateExpenses(money, type) {
        if (!type) {
            return this.expenses += money;
        }
        return this.expenses -= money;
    }

    updateBalance(money, type, action) {
        const balanceActionMap = {
            add() {
                const actionMap = {
                    income: () => this.balance += money,
                    expense: () => this.balance -= money
                }

                actionMap[type]();
            },
            delete() {
                const actionMap = {
                    income: () => this.balance -= money,
                    expense: () => this.balance += money
                }

                actionMap[type]();
            }
        }

        balanceActionMap[action].call(this);

        return this;
    }

    updateIncome(money, type, action) {
        this.updateBudget(money, type);
        this.updateBalance(money, "income", action);
        return this;
    }

    updateExpense(money, type, action) {
        this.updateExpenses(money, type);
        this.updateBalance(money, "expense", action);
        return this;
    }
}