var words = [
    "Mine",
    "Shaft",
    "Clear",
    "Sky",
    "Pocket",
    "Pro",
    "Plus",
    "Block",
    "Frontier",
    "Nether",
    "Game",
    "Games",
    "Spoon"
];

var length = Math.floor(Math.random() * (5 - 2) + 2);
var ret = "";
for(var i = 0; i < length; i++){
    ret += words[Math.floor(Math.random() * (words.length - 1))];
    if(Math.floor(Math.random() * 1) === 1){
        ret += " ";
    }
}
console.log(ret);
