import {html} from "../base.js";

const createItem = (item) => {
    return `
    <li class="incomes-and-expenses__item" data-id="${item.id}" data-type="${item.type}">
        <span class="incomes-and-expenses__description">${item.description}</span>
        <span class="incomes-and-expenses__sum">${item.type === "income" ? "+" : "-"} ${item.value}</span>
        <i class="incomes-and-expenses__icon far fa-trash-alt" role="button"></i>
     </li>`
}

export const renderItem = (item) => {
    const action = {
        income() {
            html.incomeExpensesLists()[0].innerHTML += createItem(item);
        },
        expense() {
            html.incomeExpensesLists()[1].innerHTML += createItem(item);
        }
    }

    action[item.type]();
}