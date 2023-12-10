export class Trades {
    id:any;
    portfolio_id: any;

    symbol: any;
    direction: any;
    strategy: any;
    amount: any;
    entry_price: any;
    sell_price: any;
    target_price: any;
    stop_price: any;
    status: any;
    rating: any;
    closed:any;
    created_date:any;
    closed_date: any;
    comments: any;

    init(sourceObject: Trades) {
        Object.assign(this, sourceObject);
    }

    public static getTotalCost(entry:any, amount:any) {
        return Trades.calculateBuyCost(entry, amount);
      }

    public static getProfit(entry:any, target:any, amount:any):any {
        
        let buy = this.calculateBuyCost(entry, amount);
        let sell = this.calculateSellCost(target, amount); 
    
        if (!entry || !target || !amount) {
          return 0;
        }
    
        return  (sell - buy).toFixed(2);
      }
    
      public static getLoss(entry:any, stop:any, amount:any):any {
    
        let buy = this.calculateBuyCost(entry, amount);
        let sell = this.calculateSellCost(stop, amount);
        
        if (!entry || !stop || !amount) {
          return 0;
        }
        
    
        return  (sell - buy).toFixed(2);
      }
    
      public static getRRR() {
        return 1;
      }
    
      public static calculateBuyCost(entry:any, amount:any):any {
        let subtotal = (parseFloat(entry) * parseFloat(amount));
        let commision = subtotal * 0.0025;
        let vat = commision * 0.12; /* 12%* of commision */
        let pseFee = subtotal * 0.00005; /* 0.005% of the gross trade value */
        let sccp = subtotal * 0.0001; /* 0.01% of the gross trade value. */
    
        let total = subtotal + commision + vat +  pseFee + sccp;
        
        return isNaN(total) ? 0 : total.toFixed(2);
      }
    
      public static calculateSellCost(entry:any, amount:any):any {
        let subtotal = (parseFloat(entry) * parseFloat(amount));
        let commision = subtotal * 0.0025;
        let vat = commision * 0.12; /* 12%* of commision */
        let pseFee = subtotal * 0.00005; /* 0.005% of the gross trade value */
        let sccp = subtotal * 0.0001; /* 0.01% of the gross trade value. */
        let salesTax = subtotal * 0.006; /* 0.6% of the gross trade value */
    
    
        let total = subtotal - (commision + vat + pseFee + sccp + salesTax);
        
        return isNaN(total) ? 0 : total.toFixed(2);
      }
}