export class Utils {

      public static isNullOrWhiteSpaces(inputString: string): boolean { //helper para verificar espaçoes em branco ou string nula
        if (inputString === undefined || inputString === null || inputString.length === 0) {
          return true;
        } else {
          if (inputString.startsWith(' ') && inputString.endsWith(' ') && inputString.trim() === "")
            return true;
    
          return false;
        }
      }
    
      public static jsonClone(obj) {//função para clonar variaveis sem referenciá-las
        return JSON.parse(JSON.stringify(obj));
      }

      public static top(array: Array<any>, count: number) {//função helper para top da lista
        count = count > array.length ? array.length : count;
        let result: Array<any> = new Array<any>();
        
        for (let i = 0; i < count; i++) {
          result.push(array[i]);
        }
        return result;
      }
    
}