export class Utils {
  public static isNullOrWhiteSpaces(inputString: string): boolean {
    if (inputString === undefined || inputString === null || inputString.length === 0) {
      return true;
    } else {
      if (inputString.startsWith(' ') && inputString.endsWith(' ') && inputString.trim() === '') {
        return true;
      }

      return false;
    }
  }
}
