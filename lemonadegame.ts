import promptSync from 'prompt-sync';

//Interfaces for the main trackers of the game (Days, weather, money)
interface LemonadeStand {
    price:number;
    cost:number;
    inventory:number;
    value: number;
}

interface Days {
    day:number;
    weather:string;
    rain:number;
}

interface Profits {
    revenue:number;
    costs:number;
    profits:number;
    sold:number;
}

//Setter functions to change specific trackers
function weatherSetter(){
    let chance = Math.random();
    let weather;
    if(chance > 0.66) {
        weather = "cloudy";
    } else if ((chance < 0.66) && (chance > 0.33)){
        weather = "cooler";
    } else {
        weather = "hotter";
    }
    return weather;
}

function rainSetter(dayTracker : Days){
    let rain = 0;
    if(dayTracker.weather == "cloudy")
        rain = Math.trunc(Math.random() * 100);
    else if (dayTracker.weather == "cooler")
        rain = Math.trunc(Math.random() * 25);
    return rain;
}

function getCost(){
    let cost = (Math.trunc(Math.random()*100))
    return cost;
}

function numberSold(made:number){
    return Math.trunc(Math.random()*(made+1));
}

//Create actual values
let dayTracker: Days = {
    day:1,
    weather:weatherSetter(),
    rain:0,
}
dayTracker.rain = rainSetter(dayTracker);

let stand: LemonadeStand = {
    price:0,
    cost:getCost(),
    inventory:0,
    value:Math.trunc(Math.random()*500),
}

let earnings: Profits = {
    revenue: 0,
    costs: 0,
    profits: 0,
    sold:0,
}

let sesprice = "0"
let sesinventory = "0";
const prompt = promptSync();

//Prompt function
function gameStart (dayTracker: Days, stand: LemonadeStand, earnings:Profits) {
    console.log("___________________________________________________________");
    console.log();

    //Tell Player day, weather, chance of rain, and cost of lemonade
    console.log("On Day " + dayTracker.day + ", the cost of lemonade is $" + (stand.cost/100));
    console.log("You have a budget of $" + (stand.value/100) + ",");
    if(dayTracker.rain > 0) console.log("There is a "+ dayTracker.rain +"% chance of rain, and");
    console.log("The weather is "+ dayTracker.weather +" today.");

    console.log();

    //Get price of Lemonade
    sesprice = prompt("What price (in cents) do you wish to charge for lemonade? ");
    stand.price = parseInt(sesprice, 10);

    console.log();

    //Get Number of lemonade
    sesinventory = prompt("How many glasses of lemonade do you wish to make? ");
    stand.inventory = parseInt(sesinventory);

    console.log();

    //update values

    //Days
    dayTracker.day++;
    dayTracker.weather = weatherSetter();
    dayTracker.rain = rainSetter(dayTracker);

    //Profits
    earnings.sold = numberSold(stand.inventory)
    earnings.revenue = earnings.sold * stand.price;
    earnings.costs = stand.cost * stand.inventory;
    earnings.profits = earnings.revenue - earnings.costs;

    //LemonadeStand
    stand.cost = getCost();
    stand.value += earnings.profits;
}

function results(days:Days, stand:LemonadeStand, earnings:Profits){
    console.log("\n");
    console.log("----- $$  TODAY'S EARNINGS. $$ -----");
    console.log("Day " + (dayTracker.day-1));
    console.log();
    console.log(earnings.sold + " Glasses sold");
    console.log("$" + (stand.price/100) + " per glass");
    console.log("Revenue: $" + (earnings.revenue/100))

    console.log();
    console.log(stand.inventory + " Glasses made");
    console.log("Expenses: $" + (earnings.costs/100));
    console.log();

    console.log("Profits: $" + (earnings.profits/100));
    console.log("You Have $" + (stand.value/100));
    console.log();

    console.log("------ $$ REPORT END $$ ------")
}

console.log("\n");
let daycounter = prompt("How many days do you want to simulate? ");
let daycounterval = parseInt(daycounter);
console.log("\n");

for(let i = 0; i < daycounterval; i++){
    gameStart(dayTracker, stand, earnings);
    results(dayTracker, stand, earnings);
}



