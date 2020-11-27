import {html} from "./base.js";
import {User} from "./modules/User.js";
import {
    getUserInputInfo,
    checkForEmptyInput,
    renderUser,
    renderError,
    removeErrorBoxStyle
} from "./views/userView.js";
import {renderItem} from "./views/itemView.js";
import {Item} from "./modules/Item.js";

// Create new User instance
const user = new User();

// Demo uid
const uid = () => {
    return Math.floor(Math.random() * 10000);
}

// Set default data storage
localStorage.setItem("items", JSON.stringify({income: [], expense: []}))

const renderAll = (item) => {
    // Render result to UI
    renderItem(item);

    // Render user
    renderUser(user, item.type);
}

function mainFormSubmitHandler(evt) {
    evt.preventDefault();
    const $target = evt.target;

    // Get all inputs info
    const inputInfo = getUserInputInfo($target);

    // Check for empty input
    const emptyInput = checkForEmptyInput(inputInfo);

    if (!emptyInput && isNaN(+inputInfo.value) === false) {
        // Create new Item instance
        const item = new Item(uid(), inputInfo.description, inputInfo.value, inputInfo.type);

        // Add item to dataStorage
        item.addToDataStorage()

        removeErrorBoxStyle();

        const actionTypeMap = {
            income: () => {
                // Update income data
                user.updateIncome(item.value, null, "add");
            },
            expense: () => {
                // Update expenses data
                user.updateExpense(+inputInfo.value, null, "add");
            }
        }

        actionTypeMap[inputInfo.type]();

        // Render all info to UI
        renderAll(item);
    } else if (emptyInput) {
        renderError("There is empty input!");
    } else if (isNaN(+inputInfo.value)) {
        renderError("Value must be a number!");
    }
}

html.mainForm().addEventListener("submit", mainFormSubmitHandler);

// Handle delete item buttons
function sectionIncomesExpensesClickHandler(evt) {
    const $target = evt.target;

    if ($target.tagName === "path" || $target.tagName === "svg") {
        const selectedLi = $target.closest("li");

        // Remove item from the data and return this item from the data
        const removedItem = Item.removeFromDataStorage(selectedLi.dataset.id, selectedLi.dataset.type);

        if (removedItem.type === "income") {
            // Update income data
            user.updateIncome(+removedItem.value, "income", "delete")

            // Render user
            renderUser(user, removedItem.type);
        } else {
            // Update income data
            user.updateExpense(+removedItem.value, "expense", "delete")

            // Render user
            renderUser(user, removedItem.type);
        }

        // Remove selected li
        $target.closest("li").remove();
    }
}

html.sectionIncomesExpenses().addEventListener("click", sectionIncomesExpensesClickHandler)