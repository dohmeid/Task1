//This function converts firebase snapshot to array
export const snapshotToArray = (snapshot) => {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
}

//This function compares one date with the current date and returns 1 if it's a future date, 0 the current date, -1 a past date
export const compareDates = (divDate2) => {
    let currDate = new Date(); //current date format : 8/19/2023
    let divDate = new Date(divDate2); //convert div date format from 2023-08-31T14:40   -  type="datetime-local" to date object format

    let currDay = currDate.getDate();
    let currMonth = currDate.getMonth() + 1;
    let currYear = currDate.getFullYear();

    let divDay = divDate.getDate();
    let divMonth = divDate.getMonth() + 1;
    let divYear = divDate.getFullYear();

    if (divYear > currYear || (divYear === currYear && divMonth > currMonth) || (divYear === currYear && divMonth === currMonth && divDay > currDay)) {
        return 1;
    }
    else if (divYear === currYear && divMonth === currMonth && divDay === currDay) {
        return 0;
    }
    else {
        return -1;
    }
}