var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var players = new Array();
var currentPlayer = 0;

function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}






function dealHands(){
    // alternate handing cards to each player
    // 2 cards each
    for(var i = 0; i < 2; i++)
    {
        for (var x = 0; x < players.length; x++)
        {
            var card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }

    updateDeck();
}

function renderCard(card, player)
{
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card)
{
    var el = document.createElement('div');
    var icon = '';
    if (card.Suit == 'Hearts')
    icon='&hearts;';
    else if (card.Suit == 'Spades')
    icon = '&spades;';
    else if (card.Suit == 'Diamonds')
    icon = '&diams;';
    else
    icon = '&clubs;';

    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}

// returns the number of points that a player has in hand
function getPoints(player)
{
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++)
    {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function updatePoints()
{
    for (var i = 0 ; i < players.length; i++)
    {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function hitMe()
{
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

function stay()
{
    // move on to next player, if any
    if (currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }

    else {
        end();
    }
}

function end()
{
    var winner = -1;
    var score = 0;

    for(var i = 0; i < players.length; i++)
    {
        if (players[i].Points > score && players[i].Points < 22)
        {
            winner = i;
        }

        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
    document.getElementById("status").style.display = "inline-block";
}

function check()
{
    if (players[currentPlayer].Points > 21)
    {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}

function updateDeck()
{
    document.getElementById('deckcount').innerHTML = deck.length;
}

window.addEventListener('load', function(){
    createDeck();
    shuffle();
    createPlayers(1);
});
