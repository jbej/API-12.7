$(function(){
    
      function initSortable() {
        $('.card-list').sortable({
          connectWith: '.card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
      }
    
      function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
        var str = '', i;
        for (i = 0; i < 10; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
      }
    
      var board = {
        name: 'Tablica Kanban',
        createColumn: function(column) {
          this.element.append(column.element);
          initSortable();
        },
        element: $('#board .column-container')
      };
    
      $('.create-column')
      .on("click", function(){
        board.createColumn(new Column(prompt('Enter column name ')));
      });
    
      function Column(name) {
        var self = this;
    
        this.id = randomString();
        this.name = name;
        this.element = createColumn();
    
        function createColumn() {
       
          var column = $('<div class="column"></div>');
          var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
          var columnCardList = $('<ul class="card-list"></ul>');
          var columnDelete = $('<button class="btn-delete">x</button>');
          var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
    
          columnDelete.on("click", function() {
            self.deleteColumn();
          });
          columnAddCard.on("click", function(event) {
            event.preventDefault();
            self.createCard(new Card(prompt("Enter the name of the card")));
          });
    
          column.append(columnTitle)
          .append(columnDelete)
          .append(columnAddCard)
          .append(columnCardList);
          return column;
        }
      }
      Column.prototype = {
        createCard: function(card) {
          this.element.children('ul').append(card.element);
        },
        deleteColumn: function() {
          this.element.remove();
        }
      };
    
      function Card(description) {
        var self = this;
    
        this.id = randomString();
        this.description = description;
        this.element = createCard();
    
        function createCard() {
          var card = $('<li class="card"></li>');
          var cardDeleteBtn = $('<button class="btn-delete">x</button>');
          var cardDescription = $('<p class="card-description"></p>');
          cardDeleteBtn.on("click", function(){
            self.removeCard();
          });
          card.append(cardDeleteBtn);
          cardDescription.text(self.description);
          card.append(cardDescription)
          return card;
        }
      }
      Card.prototype = {
        removeCard: function() {
          this.element.remove();
        }
      }
    
      var todoColumn = new Column('To do');
      var doingColumn = new Column('During');
      var doneColumn = new Column('Finished');
    
      board.createColumn(todoColumn);
      board.createColumn(doingColumn);
      board.createColumn(doneColumn);
    
      var card1 = new Card('New task');
      var card2 = new Card('create kanban boards');
      todoColumn.createCard(card1);
      doingColumn.createCard(card2);
    })
    