var app = new Vue({
    el : '#app',
    data : {
        myHealBar : 100,
        monsterHealBar : 100,
        gameIsStarting : false,
        logs : [],
    },
    methods : {
        gameStart : function(){
            this.gameIsStarting = true,
            this.myHealBar = 100,
            this.monsterHealBar = 100,
            this.logs = [];
        },
        attack(){
            var damage = this.checkDamage(10,3)
            this.monsterHealBar -= damage;
            this.logs.unshift({
                isPlayer : true,
                text : 'Player hit Monster hard for ' + damage
            });
            this.monsterAttack()
            this.checkWin()
        },
        specialAttack(){
            var damage = this.checkDamage(20,10)
            this.monsterHealBar -= damage;
            this.logs.unshift({
                isPlayer : true,
                text : 'Player hit Monster hard for ' + damage,
            });            
            this.monsterAttack()
            this.checkWin()
        },
        heal(){
            if(this.myHealBar <= 90){
                this.myHealBar += 10;
            }else{
                this.myHealBar = 100
            }
            this.logs.unshift({
                isPlayer : true,
                text : 'Player Heal for 10'
            })
            this.monsterAttack()
        },
        giveUp(){
            this.gameIsStarting = false;
            this.logs = []
            this.myHealBar = 100;
            this.monsterHealBar=100;
        },
        checkDamage(max,min){
            return Math.max(Math.floor(Math.random()* max)+1,min);
        },
        checkWin(){
            if(this.monsterHealBar <= 0){
                if(confirm('You Won! Do You Want to Start A New Game?')){
                    this.gameStart()
                }else{
                    this.gameIsStarting = false
                    this.logs = []
                    this.myHealBar = 100;
                    this.monsterHealBar=100;
                }
                return true
            }else if(this.myHealBar <= 0){
                if(confirm('You Lost! Do You Want to Start A New Game')){
                    this.gameStart()
                }else{
                    this.gameIsStarting = false
                    this.logs = []
                    this.myHealBar = 100;
                    this.monsterHealBar=100;
                }
                return true
            }
            return false
        },
        monsterAttack(){
            var damage = this.checkDamage(12,5)
            this.myHealBar -= damage;
            this.logs.unshift({
                isPlayer : false,
                text : 'Monster hit player hard for ' + damage,
            });
            
        }
    }
})